require('./db/knex'); // inicializa Objection/Knex
const express = require('express');
const security = require('./core/http/security');
const rateLimit = require('./core/http/rate-limit');
const routes = require('./routes');
const notFound = require('./core/http/not-found');
const errorHandler = require('./core/http/error-handler');

const app = express();
security(app);
rateLimit(app);

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
