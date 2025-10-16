const Solicitud = require('./solicitud.model');

async function list({ page = 1, limit = 10, empleadoId, q, sort = 'id', order = 'desc' }) {
    const query = Solicitud.query().withGraphFetched('empleado');

    if (empleadoId) query.where('id_empleado', empleadoId);

    if (q) {
        query.where(builder => {
            builder
                .where('codigo', 'ilike', `%${q}%`)
                .orWhere('descripcion', 'ilike', `%${q}%`)
                .orWhere('resumen', 'ilike', `%${q}%`);
        });
    }

    const sortable = new Set(['id', 'codigo', 'id_empleado', 'created_at']);
    const direction = (order && order.toLowerCase() === 'asc') ? 'asc' : 'desc';

    if (sortable.has(sort)) {
        query.orderBy(sort, direction);
    } else {
        query.orderBy('id', 'desc');
    }

    const result = await query.page(Number(page) - 1, Number(limit));
    return { items: result.results, total: result.total, page: Number(page), limit: Number(limit) };
}

async function create({ codigo, descripcion, resumen, id_empleado }) {
    const row = await Solicitud.query()
        .insert({ codigo, descripcion, resumen, id_empleado })
        .returning('*');
    return row;
}

async function getById(id) {
    const row = await Solicitud.query()
        .findById(id)
        .withGraphFetched('empleado');

    if (!row) {
        const err = new Error('Solicitud not found');
        err.status = 404;
        throw err;
    }
    return row;
}

async function update(id, payload = {}) {
    const allowed = ['codigo', 'descripcion', 'resumen', 'id_empleado'];
    const data = Object.fromEntries(
        Object.entries(payload).filter(([k]) => allowed.includes(k))
    );

    if (Object.keys(data).length === 0) {
        const err = new Error('No fields to update');
        err.status = 400;
        throw err;
    }

    const row = await Solicitud.query()
        .patchAndFetchById(id, data)
        .withGraphFetched('empleado');

    if (!row) {
        const err = new Error('Solicitud not found');
        err.status = 404;
        throw err;
    }
    return row;
}

async function replace(id, { codigo, descripcion, resumen, id_empleado }) {
    const row = await Solicitud.query()
        .updateAndFetchById(id, { codigo, descripcion, resumen, id_empleado })
        .withGraphFetched('empleado');

    if (!row) {
        const err = new Error('Solicitud not found');
        err.status = 404;
        throw err;
    }
    return row;
}

async function remove(id) {
    const deleted = await Solicitud.query().deleteById(id);
    if (!deleted) {
        const err = new Error('Solicitud not found');
        err.status = 404;
        throw err;
    }
}

async function findByCodigo(codigo) {
    return Solicitud.query().findOne({ codigo });
}

module.exports = {
    list,
    create,
    getById,
    update,
    replace,
    remove,
    findByCodigo
};
