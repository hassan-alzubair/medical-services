'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("users", [
        {
        "full_name": "محمد علي احمد",
        "mobile_number": "+2499999999",
        "gender": 1,
        "role_id": 2,
        "activated": true,
        "profile_image": null,
        "specialization": "أمراض الصدر",
        "clinic": "اي عيادة",
        "state": "الخرطوم",
        "years_of_experience": "5",
        "working_in_hospitals": "مستشفى الخرطوم, الشعب, الزيتونة",
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "full_name": "محمد خالد",
        "mobile_number": "+2499999998",
        "gender": 1,
        "role_id": 2,
        "activated": true,
        "profile_image": null,
        "specialization": "وظائف الكلى",
        "clinic": "عيادة دكتورة سلمى",
        "state": "الخرطوم",
        "years_of_experience": "5",
        "working_in_hospitals": "مستشفى سوبا الجامعي",
        "created_at": new Date(),
        "updated_at": new Date()
      }
      ],{});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
