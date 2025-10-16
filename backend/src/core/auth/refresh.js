const crypto = require('crypto');
const config = require('../../config/env');

function generateRefreshTokenValue() {
    return crypto.randomBytes(32).toString('hex');
}

function hashRefreshToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

function calcExpiresAt() {
    const d = new Date();
    d.setDate(d.getDate() + config.refresh.ttlDays);
    return d.toISOString();
}

module.exports = { generateRefreshTokenValue, hashRefreshToken, calcExpiresAt };
