const { MAX_WAIT_TIME = 90000 } = process.env;

const error = require('./error');

module.exports = function wait(req, res, next) {
    let waitTime = parseInt(req.params.time, 10);
    let status = parseInt(req.params.status, 10);

    // Sanity check so Heroku doesn't complain.
    if (waitTime > MAX_WAIT_TIME) waitTime = MAX_WAIT_TIME;

    if (
        typeof waitTime === 'number' &&
        typeof status === 'number' &&
        !Number.isNaN(waitTime) &&
        !Number.isNaN(status)
    ) {
        setTimeout(() => {
            res.json(status, { waitTime, status });
            next();
        }, waitTime);
    } else {
        error(req, res, next);
    }
};
