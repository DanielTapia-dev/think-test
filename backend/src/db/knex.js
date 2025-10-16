const Knex = require('knex');
const { Model } = require('objection');
const config = require('../config/env');

const knex = Knex({
    client: 'pg',
    connection: {
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    },
    pool: { min: 2, max: 10 }
});

Model.knex(knex);
module.exports = knex;
