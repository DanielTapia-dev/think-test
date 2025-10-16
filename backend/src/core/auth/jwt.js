const jwt = require('jsonwebtoken');
const config = require('../../config/env');

function sign(payload) {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
}
function verify(token) {
    return jwt.verify(token, config.jwt.secret);
}
function requireAuth(req, res, next) {
    try {
        const header = req.headers.authorization || '';
        const token = header.startsWith('Bearer ') ? header.slice(7) : null;
        if (!token) return res.status(401).json({ error: { message: 'Unauthorized' } });
        req.user = verify(token);
        next();
    } catch {
        return res.status(401).json({ error: { message: 'Unauthorized' } });
    }
}
module.exports = { sign, verify, requireAuth };
