const svc = require('./empleados.service');

async function getEmpleados(req, res, next) {
    try {
        const { page, limit, search } = req.query;
        const data = await svc.list({ page, limit, search });
        res.json({ data });
    } catch (e) { next(e); }
}
async function postEmpleado(req, res, next) {
    try {
        const { fecha_ingreso, nombre, salario } = req.body;
        const row = await svc.create({ fecha_ingreso, nombre, salario });
        res.status(201).json({ data: row });
    } catch (e) { next(e); }
}
module.exports = { getEmpleados, postEmpleado };
