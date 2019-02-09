"use strict";

module.exports = function error(req, res, next) {
    res.send(500, {
        error: 'Invalid Request Format: /<timeout_in_miliseconds>/<status_code>',
    });
    next();
};
