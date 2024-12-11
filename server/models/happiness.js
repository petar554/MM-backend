'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Happiness extends Model {
    static associate(models) {
      // Happiness belongs to an intention
      Happiness.belongsTo(models.Intention, {
        foreignKey: 'intention_id',
        onDelete: 'CASCADE',
      });
    }
  }

  Happiness.init({
    happiness_id: {
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
    happiness: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    rating: {
      type: DataTypes.NUMERIC,
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
    modelName: 'Happiness',
    tableName: 'Happiness',
    timestamps: true,
  });

  return Happiness;
};
