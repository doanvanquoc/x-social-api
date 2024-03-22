'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Groups.belongsTo(models.User, {
        foreignKey: 'creator_id',
        as: 'creator'
      });
      Groups.hasMany(models.Membership, {
        foreignKey: 'group_id',
        as: 'members'
      });
    }
  }
  Groups.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    creator_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    poster: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Group',
    tableName: 'groups'
  });
  return Groups;
};