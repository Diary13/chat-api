'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liaison_user_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.User.belongsToMany(models.Group, {
      //   through: models.Liaison_user_group,
      //   foreignKey: "userId",
      //   otherKey: "groupId"
      // });
      // models.Group.belongsToMany(models.User, {
      //   through: models.Liaison_user_group,
      //   foreignKey: "groupId",
      //   otherKey: "userId"
      // });
      // models.Liaison_user_group.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   as: "user"
      // });
      // models.Liaison_user_group.belongsTo(models.Conversation, {
      //   foreignKey: "groupId",
      //   as: "group"
      // });
    }
  };
  Liaison_user_group.init({
    userId: {
      type:DataTypes.INTEGER,
      // references: {
      //   model: "User",
      //   key: "id"
      // }
    },
    groupId: {
      type:DataTypes.INTEGER,
      // references: {
      //   model: "Group",
      //   key: "id"
      // }
    },
  }, {
    sequelize,
    modelName: 'Liaison_user_group',
  });
  return Liaison_user_group;
};