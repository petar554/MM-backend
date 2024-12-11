'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    static associate(models) {
      // Goal belongs to an intention
      Goal.belongsTo(models.Intention, {
        foreignKey: 'intention_id',
        onDelete: 'CASCADE',
      });
    }
  }

  Goal.init({
    goal_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intention_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Intention',
        key: 'intention_id',
      },
      allowNull: false,
    },
    goal: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Goal',
    tableName: 'Goal',
    timestamps: true,
  });

  return Goal;
};
