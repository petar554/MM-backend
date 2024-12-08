'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'id', 'user_id');
  },

  async down(queryInterface, Sequelize) {
    // revert the column name change in case of rollback
    await queryInterface.renameColumn('Users', 'user_id', 'id');
  },
};
