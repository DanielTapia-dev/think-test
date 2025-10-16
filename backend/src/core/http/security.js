const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const express = require('express');

module.exports = function security(app) {
    app.use(helmet());
    app.use(cors({ origin: true, credentials: true }));
    app.use(hpp());
    app.use(express.json({ limit: '1mb' }));
};
