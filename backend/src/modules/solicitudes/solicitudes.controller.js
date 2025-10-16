const svc = require('./solicitudes.service');

async function getSolicitudes(req, res, next) {
    try {
        const { page, limit, empleadoId, q, sort, order } = req.query;
        const data = await svc.list({ page, limit, empleadoId, q, sort, order });
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

async function getSolicitudById(req, res, next) {
    try {
        const { id } = req.params;
        const data = await svc.getById(Number(id));
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

async function postSolicitud(req, res, next) {
    try {
        const { codigo, descripcion, resumen, id_empleado } = req.body;
        const row = await svc.create({ codigo, descripcion, resumen, id_empleado });
        res.status(201).json({ data: row });
    } catch (e) {
        next(e);
    }
}

async function patchSolicitud(req, res, next) {
    try {
        const { id } = req.params;
        const payload = req.body;
        const row = await svc.update(Number(id), payload);
        res.json({ data: row });
    } catch (e) {
        next(e);
    }
}

async function putSolicitud(req, res, next) {
    try {
        const { id } = req.params;
        const { codigo, descripcion, resumen, id_empleado } = req.body;
        const row = await svc.replace(Number(id), { codigo, descripcion, resumen, id_empleado });
        res.json({ data: row });
    } catch (e) {
        next(e);
    }
}

async function deleteSolicitud(req, res, next) {
    try {
        const { id } = req.params;
        await svc.remove(Number(id));
        res.status(204).send();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getSolicitudes,
    getSolicitudById,
    postSolicitud,
    patchSolicitud,
    putSolicitud,
    deleteSolicitud
};
