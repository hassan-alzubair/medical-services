'use strict';
const UserRoles = require('../src/common/constants').UserRoles;
const config = require('../config/config');

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
        fcm_token: DataTypes.STRING,
        activated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        // doctors data
        profile_image: DataTypes.STRING,
        specialization: DataTypes.STRING,
        clinic: DataTypes.STRING,
        state: DataTypes.STRING,
        years_of_experience: DataTypes.STRING,
        working_in_hospitals: DataTypes.STRING,

        // nurse data
        services: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'users',
    });
    users.prototype.toJSON = function () {
        let values = this.get();
        delete values.fcm_token;
        if (values.profile_image !== null){
            values.profile_image = `${config.APP_URL}/${values.profile_image}`;
        }
        if (values.role_id === UserRoles.USER || values.role_id === UserRoles.ADMIN) {
            delete values.specialization;
            delete values.clinic;
            delete values.state;
            delete values.years_of_experience;
            delete values.working_in_hospitals;
            delete values.services;
        } else if (values.role_id === UserRoles.DOCTOR) {
            delete values.services;
        } else if (values.role_id === UserRoles.NURSE) {
            delete values.profile_image;
            delete values.clinic;
            delete values.state;
            delete values.working_in_hospitals;
        }
        return values;
    };
    return users;
};
