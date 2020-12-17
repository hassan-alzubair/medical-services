'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class messages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            messages.belongsTo(models.users, {as: 'sender', foreignKey: 'sender_id'})
            messages.belongsTo(models.users, {as: 'receiver', foreignKey: 'receiver_id'})
        }
    };
    messages.init({
        sender_id: DataTypes.BIGINT,
        receiver_id: DataTypes.BIGINT,
        message: DataTypes.TEXT,
        read: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'messages',
    });
    messages.prototype.toJSON = function () {
        let values = this.get();
        return values;
    };
    return messages;
};
