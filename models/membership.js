'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Membership.belongsTo(models.Group, {
        foreignKey: 'group_id',
        as: 'group'
      });
    }
  }
  Membership.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Membership',
    tableName: 'memberships'
  });
  return Membership;
};