'use strict';

const restify = require('restify');

const error = require('./src/error');
const wait = require('./src/wait');

const {
    MAX_WAIT_TIME = 90000,
    PORT = 8080
} = process.env;

let server = restify.createServer();

server.use(
    restify.CORS({
        origins: ['*'],
    })
);

server.pre(restify.pre.sanitizePath());

server.get('/:time/:status', wait);
server.put('/:time/:status', wait);
server.post('/:time/:status', wait);
server.del('/:time/:status', wait);
server.head('/:time/:status', wait);

server.get('/', error);

server.listen(PORT, () => {
    console.log(
        `Waiting (lol) for connections at ${server.url}; max wait of ${MAX_WAIT_TIME /
        1000} seconds.`
    );
});
