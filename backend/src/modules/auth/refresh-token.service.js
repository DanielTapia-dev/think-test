const { raw } = require('objection');
const RefreshToken = require('../users/refresh-token.mode');
const { generateRefreshTokenValue, hashRefreshToken, calcExpiresAt } = require('../../core/auth/refresh');

async function issueRefreshToken({ userId, userAgent, ip }) {
    const plain = generateRefreshTokenValue();
    const tokenHash = hashRefreshToken(plain);
    const expiresAt = calcExpiresAt();

    await RefreshToken.query().insert({
        user_id: userId,
        token_hash: tokenHash,
        user_agent: userAgent || null,
        ip_address: ip || null,
        expires_at: expiresAt
    });

    return { plain, expiresAt };
}

async function rotateRefreshToken({ oldPlainToken, userAgent, ip }) {
    const oldHash = hashRefreshToken(oldPlainToken);
    const existing = await RefreshToken.query()
        .where('token_hash', oldHash)
        .whereNull('revoked_at')
        .where('expires_at', '>', raw('NOW()'))
        .first();

    if (!existing) {
        const err = new Error('Invalid or expired refresh token');
        err.status = 401;
        throw err;
    }

    await RefreshToken.query().patch({ revoked_at: raw('NOW()') }).where('id', existing.id);

    const { plain, expiresAt } = await issueRefreshToken({
        userId: existing.user_id,
        userAgent,
        ip
    });

    return { userId: existing.user_id, plain, expiresAt };
}

async function revokeAllForUser(userId) {
    await RefreshToken.query()
        .patch({ revoked_at: raw('NOW()') })
        .where('user_id', userId)
        .whereNull('revoked_at');
}

module.exports = { issueRefreshToken, rotateRefreshToken, revokeAllForUser };
