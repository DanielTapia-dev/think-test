const { Model } = require('objection');

class Empleado extends Model {
    static get tableName() { return 'empleado'; }
    static get idColumn() { return 'id'; }
}
module.exports = Empleado;
