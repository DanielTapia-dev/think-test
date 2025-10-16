const { raw } = require('objection');
const User = require('../users/user.model');
const Role = require('../users/role.model');
const { sign } = require('../../core/auth/jwt');
const { issueRefreshToken, rotateRefreshToken, revokeAllForUser } = require('./refresh-token.service');

async function register({ email, username, password, empleadoId = null }) {
    const user = await User.query()
        .insert({
            email,
            username,
            is_active: true,
            empleado_id: empleadoId,
            password_hash: raw("crypt(?, gen_salt('bf', 12))", [password])
        })
        .returning(['id', 'email', 'username']);

    const role = await Role.query().findOne({ code: 'USER' });
    if (role) await User.relatedQuery('roles').for(user.id).relate(role.id);

    const roles = (await User.relatedQuery('roles').for(user.id)).map(r => r.code);
    const accessToken = sign({ id: user.id, email: user.email, roles });

    const { plain: refreshToken, expiresAt } = await issueRefreshToken({
        userId: user.id,
        userAgent: 'register',
        ip: null
    });

    return {
        user: { id: user.id, email: user.email, username: user.username, roles },
        tokens: { accessToken, refreshToken, refreshExpiresAt: expiresAt }
    };
}

async function login({ email, password, userAgent, ip }) {
    const user = await User.query()
        .select('id', 'email', 'username', 'is_active')
        .where('email', email)
        .where(raw('password_hash = crypt(?, password_hash)', [password]))
        .first();

    if (!user || !user.is_active) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
    }

    const roles = (await User.relatedQuery('roles').for(user.id)).map(r => r.code);
    const accessToken = sign({ id: user.id, email: user.email, roles });

    const { plain: refreshToken, expiresAt } = await issueRefreshToken({
        userId: user.id,
        userAgent,
        ip
    });

    return {
        user: { id: user.id, email: user.email, username: user.username, roles },
        tokens: { accessToken, refreshToken, refreshExpiresAt: expiresAt }
    };
}

async function refresh({ refreshTokenPlain, userAgent, ip }) {
    const { userId, plain: newRefresh, expiresAt } = await rotateRefreshToken({
        oldPlainToken: refreshTokenPlain,
        userAgent,
        ip
    });

    const user = await User.query().findById(userId);
    const roles = (await User.relatedQuery('roles').for(userId)).map(r => r.code);
    const accessToken = sign({ id: user.id, email: user.email, roles });

    return { accessToken, refreshToken: newRefresh, refreshExpiresAt: expiresAt };
}

async function logoutAll(userId) {
    await revokeAllForUser(userId);
}

module.exports = { register, login, refresh, logoutAll };
