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
            Messages.belongsTo(models.User, {
                foreignKey: "sender_id",
                as: "SenderUser",
            });
            Messages.belongsTo(models.User, {
                foreignKey: "receiver_id",
                as: "ReceiverUser",
            });
        }
    }
    Messages.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            sender_id: DataTypes.STRING,
            receiver_id: DataTypes.STRING,
            content: DataTypes.STRING,
            send_at: DataTypes.DATE,
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
