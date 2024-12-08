module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Happiness', {
      happiness_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      intention_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Intentions',
          key: 'intention_id',
        },
        allowNull: false,
      },
      happiness: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Happiness');
  }
};
