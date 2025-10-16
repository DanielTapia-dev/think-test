const Empleado = require('./empleado.model');

async function list({ page = 1, limit = 10, search }) {
    const query = Empleado.query();
    if (search) query.where('nombre', 'ilike', `%${search}%`);
    const result = await query.page(page - 1, limit);
    return { items: result.results, total: result.total, page: Number(page), limit: Number(limit) };
}

async function create({ fecha_ingreso, nombre, salario }) {
    const row = await Empleado.query().insert({
        fecha_ingreso: fecha_ingreso,
        nombre: nombre,
        salario: salario
    }).returning('*');
    return row;
}

module.exports = { list, create };
