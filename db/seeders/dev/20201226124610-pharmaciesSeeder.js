'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let pharmacies = [];
    for (let i = 0; i < 10; i++) {
      pharmacies.push({
        pharmacy_name: `Pharmacy #${i}`,
        branch: `Branch ${i}`,
        logo: null,
        phone_number: `+24999999999${i}`,
        whatsapp_number: `+24999999999${i}`,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    await queryInterface.bulkInsert('pharmacies', pharmacies, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
