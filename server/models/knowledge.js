'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Knowledge extends Model {
    static associate(models) {
      // Knowledge belongs to an intention
      Knowledge.belongsTo(models.Intention, {
        foreignKey: 'intention_id',
        onDelete: 'CASCADE',
      });
    }
  }

  Knowledge.init({
    knowledge_id: {
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
    knowledge: {
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
    modelName: 'Knowledge',
    tableName: 'Knowledge',
    timestamps: true,
  });

  return Knowledge;
};
