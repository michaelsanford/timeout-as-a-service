"use strict";

var restify = require('restify');

const MAX_WAIT_TIME = process.env.MAX_WAIT_TIME || 90000;
const PORT = process.env.PORT || 8080;

const CORS_ORIGINS = process.env.CORS_ORIGINS || "*";
const CORS_METHODS = process.env.CORS_METHODS || "GET, PUT, POST, DELETE, HEAD";

const MAX_INFLIGHT_REQUESTS = process.env.MAX_INFLIGHT_REQUESTS || 500;

const wait = (req, res, next) => {
    let waitTime = parseInt(req.params.time, 10);
    let status = parseInt(req.params.status, 10);

    // Sanity check so Heroku doesn't complain.
    if (waitTime > MAX_WAIT_TIME) {
        waitTime = MAX_WAIT_TIME;
    }

    res.header('Content-Type', 'application/json');
    res.charSet('utf-8');

    if (typeof waitTime === "number" && typeof status === "number" && waitTime !== null && status !== null) {
        setTimeout(() => {
            res.send(status, {waitTime, status});
            next();
        }, waitTime);
    } else {
        error(req, res, next);
    }
};

const error = (req, res, next) => {
    res.send(500, {error: 'Invalid Request Format: /timeout_in_miliseconds/status_code'});
    next();
};

var server = restify.createServer();

server.use(
    restify.CORS({
        origins: CORS_ORIGINS,
        headers: CORS_METHODS
      })
);

server.pre(restify.pre.sanitizePath());

server.pre(restify.plugins.inflightRequestThrottle({limit: MAX_INFLIGHT_REQUESTS, server}));

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", CORS_ORIGINS);
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    return next();
});

server.get('/:time/:status', wait);
server.put('/:time/:status', wait);
server.post('/:time/:status', wait);
server.del('/:time/:status', wait);
server.head('/:time/:status', wait);

server.get('/', error);

server.listen(PORT, () => {
    console.log(`Waiting (lol) for connections at ${server.url}; max wait of ${MAX_WAIT_TIME/1000} seconds.`);
});
