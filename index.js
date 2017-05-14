var restify = require('restify');

wait = (req, res, next) => {
    let waitTime = parseInt(req.params.time, 10);
    let status = parseInt(req.params.status, 10);

    res.header('Content-Type', 'application/json');
    res.charSet('utf-8');

    if (typeof waitTime === "number" && typeof status === "number" && waitTime !== null && status !== null) {
        setTimeout(() => {
            res.send(status, {waitTime, status});
            next();
        }, waitTime)
    } else {
        error(req, res, next);
    }
}

error = (req, res, next) => {
    res.send(500, {error: 'Invalid Request Format: /timeout_in_miliseconds/status_code'});
    next();
}

var server = restify.createServer();

server.pre(restify.pre.sanitizePath());

server.get('/:time/:status', wait);
server.put('/:time/:status', wait);
server.post('/:time/:status', wait);
server.del('/:time/:status', wait);
server.head('/:time/:status', wait);

server.get('/', error);

server.listen(process.env.PORT || 8080, () => {
    console.log(`Waiting (lol) for connections online at ${server.url}`);
});