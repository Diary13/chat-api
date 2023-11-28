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
      models.User.belongsToMany(models.Conversation, {
        through: models.Liaison,
        foreignKey: "userId",
        otherKey: "conversationId"
      });
      models.User.belongsToMany(models.Conversation, {
        through: models.Message,
        foreignKey: "senderId",
        otherKey: "conversationId"
      });
    }
  };
  User.init({
    username: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    lastLog: DataTypes.DATE,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};