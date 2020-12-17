'use strict';
const UserRoles = require('../../src/common/constants').UserRoles;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            full_name: {
                type: Sequelize.STRING
            },
            mobile_number: {
                type: Sequelize.STRING,
                unique: true
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: UserRoles.USER
            },
            activated: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            gender: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },


            // doctors data
            profile_image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            specialization: {
                type: Sequelize.STRING,
                allowNull: true
            },
            clinic: {
                type: Sequelize.STRING,
                allowNull: true
            },
            state: {
                type: Sequelize.STRING,
                allowNull: true
            },
            years_of_experience: {
                type: Sequelize.STRING,
                allowNull: true
            },
            working_in_hospitals: {
                type: Sequelize.STRING,
                allowNull: true
            },


            // nurse data
            services: {
                type: Sequelize.STRING,
                allowNull: true
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
