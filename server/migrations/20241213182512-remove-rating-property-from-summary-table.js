'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Summary', 'rating');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Summary', 'rating', {
      type: Sequelize.NUMERIC,
      allowNull: false,
    });
  },
};
