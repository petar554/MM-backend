'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'city', {
      type: Sequelize.STRING,
      allowNull: true, 
    });

    await queryInterface.addColumn('Users', 'country', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'city');

    await queryInterface.removeColumn('Users', 'country');
  }
};
