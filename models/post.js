'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Post.hasMany(models.Image, {
        foreignKey: 'post_id',
        as: 'images'
      });
    }
  }
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    timeline: DataTypes.DATE,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  });
  return Post;
};