'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Media', {
      media_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      intention_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Intentions',
          key: 'intention_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      media_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      media_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // drop the Media table
    await queryInterface.dropTable('Media');
  },
};
