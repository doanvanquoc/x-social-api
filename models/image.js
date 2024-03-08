'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Post, {
        foreignKey: 'post_id',
        as: 'post'
      });
    }
  }
  Image.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    path: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Image',
    tableName: 'images'
  });
  return Image;
};