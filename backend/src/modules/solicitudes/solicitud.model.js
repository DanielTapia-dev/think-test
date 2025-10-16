const { Model } = require('objection');

class Solicitud extends Model {
    static get tableName() { return 'solicitud'; }
    static get idColumn() { return 'id'; }

    static get relationMappings() {
        const Empleado = require('../empleados/empleado.model');
        return {
            empleado: {
                relation: Model.BelongsToOneRelation,
                modelClass: Empleado,
                join: { from: 'solicitud.id_empleado', to: 'empleado.id' }
            }
        };
    }
}
module.exports = Solicitud;
