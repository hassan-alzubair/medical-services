'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class otps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  otps.init({
    code: DataTypes.INTEGER,
    expires_at: DataTypes.DATE,
    mobile_number: DataTypes.STRING,
    used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'otps',
  });
  otps.prototype.toJSON = function () {
    let values = this.get();
    return values;
  };
  return otps;
};
