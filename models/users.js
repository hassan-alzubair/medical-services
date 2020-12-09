'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    full_name: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  users.prototype.toJSON = function(){
    let values = this.get();
    return values;
  };
  return users;
};
