module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Media', 'is_highlighted', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Media', 'is_highlighted');
  },
};
