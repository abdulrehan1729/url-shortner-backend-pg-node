'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class urls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      urls.belongsTo(models.User, {
        as: "user",
        foreignkey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  urls.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    longUrl: { type: DataTypes.STRING, allowNull: false },
    shortUrl: { type: DataTypes.STRING, allowNull: false, unique: true },
    urlCode: { type: DataTypes.STRING, allowNull: false, unique: true },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'urls',
  });
  return urls;
};