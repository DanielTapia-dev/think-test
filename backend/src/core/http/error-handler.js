const logger = require('../../config/logger');

module.exports = function errorHandler(err, req, res, next) {
    logger.error(err?.stack || err?.message || err);
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            code: err.code || 'INTERNAL_ERROR'
        }
    });
};
