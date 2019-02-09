"use strict";

const { MAX_WAIT_TIME = 90000 } = process.env;

const error = require('./error');

const allowedStatusCodes = [
    100, 101, 102,
    200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
    300, 301, 302, 303, 304, 305, 307, 308,
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
    421, 422, 423, 424, 426, 428, 429, 431, 444, 451, 499,
    500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511, 599
];

module.exports = function wait(req, res, next) {
    let waitTime = parseInt(req.params.time, 10);
    let status = parseInt(req.params.status, 10);

    // Sanity check so Heroku doesn't complain.
    if (waitTime > MAX_WAIT_TIME) {
        waitTime = MAX_WAIT_TIME;
    }

    if (
        typeof waitTime === 'number' &&
        typeof status === 'number' &&
        !Number.isNaN(waitTime) &&
        !Number.isNaN(status) &&
        allowedStatusCodes.includes(status)
    ) {
        setTimeout(() => {
            res.json(status, { waitTime, status });
            next();
        }, waitTime);
    } else {
        error(req, res, next);
    }
};
