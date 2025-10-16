require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwt: {
        secret: process.env.JWT_SECRET || 'change_me',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    },
    refresh: {
        ttlDays: Number(process.env.REFRESH_TOKEN_TTL_DAYS || 30)
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 9999),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        database: process.env.DB_NAME || 'testdb'
    },
    logLevel: process.env.LOG_LEVEL || 'info'
};

module.exports = config;
