"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Messages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Messages.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            senderId: DataTypes.STRING,
            receiverId: DataTypes.STRING,
            content: DataTypes.STRING,
            sendAt: DataTypes.DATE,
            seen: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Messages",
            // timestamps: false,
            tableName: "messages",
            underscored: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        }
    );
    return Messages;
};
