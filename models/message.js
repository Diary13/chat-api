'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.User.belongsToMany(models.Group, {
      //   through: models.Message,
      //   foreignKey: "senderId",
      //   otherKey: "groupId"
      // });
      // models.Group.belongsToMany(models.User, {
      //   through: models.Message,
      //   foreignKey: "groupId",
      //   otherKey: "senderId"
      // });

      models.Message.belongsTo(models.User, {
        foreignKey: "senderId",
        as: "sender" //=> models.User = sender
      });
      models.Message.belongsTo(models.Conversation, {
        foreignKey: "conversationId",
        as: "conversation"
      });
      // models.Message.belongsTo(models.Group, {
      //   foreignKey: "groupId",
      //   as: "group"
      // });
    }
  };
  Message.init({
    text: DataTypes.STRING,
    receiverId:DataTypes.INTEGER,
    vu: DataTypes.BOOLEAN,
    senderId: {
      type:DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    conversationId: {
      type:DataTypes.INTEGER,
      references: {
        model: "Conversation",
        key: "id"
      }
    },
    groupId: {
      type:DataTypes.INTEGER,
      // references: {
      //   model: "Group",
      //   key: "id"
      // }
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};