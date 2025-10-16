const config = require('./env');

function log(level, ...args) {
    const levels = ['error', 'warn', 'info', 'debug'];
    if (levels.indexOf(level) <= levels.indexOf(config.logLevel)) {
        console.log(`[${level.toUpperCase()}]`, ...args);
    }
}
module.exports = {
    error: (...a) => log('error', ...a),
    warn: (...a) => log('warn', ...a),
    info: (...a) => log('info', ...a),
    debug: (...a) => log('debug', ...a),
};
