'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pharmacies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pharmacies.init({
    pharmacy_name: DataTypes.STRING,
    branch: DataTypes.STRING,
    logo: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    whatsapp_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pharmacies',
  });
  pharmacies.prototype.toJSON = function() {
    let values = this.get();
    return values;
  };
  return pharmacies;
};