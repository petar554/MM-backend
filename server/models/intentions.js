'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Intention extends Model {
    static associate(models) {
      // An intention belongs to a user
      Intention.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });

      // An intention can have many media entries
      Intention.hasMany(models.Media, {
        foreignKey: 'intention_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Intention.init({
    intention_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'user_id',
      },
      allowNull: false,
    },
    total_rating: {
      type: DataTypes.NUMERIC,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Intention',
    tableName: 'Intentions',
    timestamps: true,
  });
  return Intention;
};
