'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Media belongs to an intention
      Media.belongsTo(models.Intention, {
        foreignKey: 'intention_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Media.init({
    media_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intention_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Intentions',
        key: 'intention_id',
      },
      allowNull: false,
    },
    media_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    media_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Media',
    tableName: 'Media',
    timestamps: true
  });
  return Media;
};
