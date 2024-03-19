'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Follow.belongsTo(models.User, {
        foreignKey: 'follower_id',
        as: 'follower'
      });
      Follow.belongsTo(models.User, {
        foreignKey: 'following_id',
        as: 'followed'
      });
    }
  }
  Follow.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    follower_id: DataTypes.INTEGER,
    following_id: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Follow',
    tableName: 'follows'
  });
  return Follow;
};