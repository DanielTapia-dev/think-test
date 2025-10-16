const { Model } = require('objection');

class RefreshToken extends Model {
    static get tableName() { return 'refresh_token'; }
    static get idColumn() { return 'id'; }
}
module.exports = RefreshToken;
