'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.User.hasMany(models.Group);
      // models.Group.belongsTo(models.User, {
      //   foreignKey: {
      //     allowNull:false
      //   }
      // });
      // models.Group.belongsTo(models.User,{
      //   foreignKey: "userId",
      //   as: "user"
      // })
    }
  };
  Group.init({
    name: DataTypes.STRING,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};