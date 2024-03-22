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
      Post.hasMany(models.Comment, {
        foreignKey: 'post_id',
        as: 'comments'
      });
      Post.hasMany(models.Like, {
        foreignKey: 'post_id',
        as: 'likes'
      });
      Post.belongsTo(models.Group, {
        foreignKey: 'group_id',
        as: 'group'
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
    timeline: {
      type: DataTypes.DATE,
      defaultValue: false,
    },
    visibility: {
      type: DataTypes.ENUM('public', 'group'),
      defaultValue: 'public'
    },
    group_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  });
  return Post;
};