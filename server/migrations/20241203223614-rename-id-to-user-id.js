'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('User', 'id', 'user_id');
  },

  async down(queryInterface, Sequelize) {
    // revert the column name change in case of rollback
    await queryInterface.renameColumn('User', 'user_id', 'id');
  },
};
