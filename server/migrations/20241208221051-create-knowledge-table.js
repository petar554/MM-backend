module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Knowledge', {
      knowledge_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      intention_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Intention',
          key: 'intention_id',
        },
        allowNull: false,
      },
      knowledge: {
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
    await queryInterface.dropTable('Knowledge');
  }
};
