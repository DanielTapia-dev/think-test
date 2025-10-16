const svc = require('./auth.service');

async function postRegister(req, res, next) {
    try {
        const { email, username, password, empleadoId } = req.body;
        const result = await svc.register({ email, username, password, empleadoId });
        res.status(201).json({ data: result });
    } catch (e) { next(e); }
}

async function postLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        const ua = req.headers['user-agent'] || null;
        const ip = req.ip || null;
        const result = await svc.login({ email, password, userAgent: ua, ip });
        res.json({ data: result });
    } catch (e) { next(e); }
}

async function postRefresh(req, res, next) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: { message: 'refreshToken required' } });
        }
        const ua = req.headers['user-agent'] || null;
        const ip = req.ip || null;
        const tokens = await svc.refresh({ refreshTokenPlain: refreshToken, userAgent: ua, ip });
        res.json({ data: tokens });
    } catch (e) { next(e); }
}

async function postLogoutAll(req, res, next) {
    try {
        await svc.logoutAll(req.user.id);
        res.status(204).send();
    } catch (e) { next(e); }
}

module.exports = { postRegister, postLogin, postRefresh, postLogoutAll };
