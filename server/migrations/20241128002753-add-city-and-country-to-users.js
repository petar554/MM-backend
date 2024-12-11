'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'city', {
      type: Sequelize.STRING,
      allowNull: true, 
    });

    await queryInterface.addColumn('User', 'country', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'city');

    await queryInterface.removeColumn('User', 'country');
  }
};
