'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liaison extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Liaison.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });
      models.Liaison.belongsTo(models.Conversation, {
        foreignKey: "conversationId",
        as: "conversation"
      });
    }
  };
  Liaison.init({
    vu: DataTypes.BOOLEAN,
    userId: {
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
    }
  }, {
    sequelize,
    modelName: 'Liaison',
  });
  return Liaison;
};