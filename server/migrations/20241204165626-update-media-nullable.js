'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Media', 'media_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Media', 'media_type', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Media', 'media_url', {
      type: Sequelize.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn('Media', 'media_type', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
