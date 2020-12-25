'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pharmacies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pharmacy_name: {
        type: Sequelize.STRING
      },
      branch: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      phone_number: {
        type: Sequelize.STRING
      },
      whatsapp_number: {
        type: Sequelize.STRING,
        allowNull:true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pharmacies');
  }
};