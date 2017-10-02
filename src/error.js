module.exports = function error(req, res, next) {
    res.status(500).json({
        error: 'Invalid Request Format: /timeout_in_miliseconds/status_code',
    });
    next();
};
