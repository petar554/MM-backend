'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Intention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
        key: 'id',
      },
      allowNull: false,
    },
    intentions_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    goal: DataTypes.TEXT,
    happiness: DataTypes.TEXT,
    knowledge: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    is_monthly_summary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
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
