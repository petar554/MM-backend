'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Summary extends Model {
    static associate(models) {
      // Summary belongs to an intention
      Summary.belongsTo(models.Intention, {
        foreignKey: 'intention_id',
        onDelete: 'CASCADE',
      });
    }
  }

  Summary.init({
    summary_id: {
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
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    highlight: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_monthly_summary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: 'Summary',
    tableName: 'Summary',
    timestamps: true,
  });

  return Summary;
};
