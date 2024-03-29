'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Account, {
        foreignKey: 'user_id',
        as: 'account'
      });
      User.hasMany(models.Post, {
        foreignKey: 'user_id',
        as: 'posts'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments'
      });
      User.hasMany(models.Follow, {
        foreignKey: 'follower_id',
        as: 'follower'
      });
      User.hasMany(models.Follow, {
        foreignKey: 'following_id',
        as: 'following'
      });
      User.hasMany(models.Chat, {
        foreignKey: 'sender_id',
        as: 'sender'
      });
      User.hasMany(models.Chat, {
        foreignKey: 'receiver_id',
        as: 'receiver'
      });
      User.hasMany(models.Like, {
        foreignKey: 'user_id',
        as: 'likes'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    display_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
    socketid: DataTypes.STRING,
    fcmToken: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};