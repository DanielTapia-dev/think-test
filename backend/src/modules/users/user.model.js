const { Model } = require('objection');

class User extends Model {
    static get tableName() { return 'user'; }
    static get idColumn() { return 'id'; }

    static get relationMappings() {
        const Role = require('./role.model');
        return {
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Role,
                join: {
                    from: 'user.id',
                    through: { from: 'user_role.user_id', to: 'user_role.role_id' },
                    to: 'role.id'
                }
            }
        };
    }
}
module.exports = User;
