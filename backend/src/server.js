const app = require('./app');
const config = require('./config/env');
const logger = require('./config/logger');

app.listen(config.port, () => {
    logger.info(`API listening on port ${config.port}`);
});
