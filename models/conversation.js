'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Conversation.belongsToMany(models.User, {
        through: models.Liaison,
        foreignKey: "conversationId",
        otherKey: "userId"
      });
      models.Conversation.belongsToMany(models.User, {
        through: models.Message,
        foreignKey: "conversationId",
        otherKey: "senderId"
      });
    }
  };
  Conversation.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};