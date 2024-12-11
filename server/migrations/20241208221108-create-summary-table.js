module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Summary', {
      summary_id: {
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
      summary: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      highlight: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_monthly_summary: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('Summary');
  }
};
