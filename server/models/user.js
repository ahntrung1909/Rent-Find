"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Addresses, {
                foreignKey: "user_address_id",
            });
            User.hasMany(models.Messages, {
                foreignKey: "receiver_id",
                as: "ReceiverMessages",
            });
            User.hasMany(models.Messages, {
                foreignKey: "sender_id",
                as: "SenderMessages",
            });
            User.hasMany(models.Report, {
                foreignKey: "accuser",
                as: "AccuserReports",
            });
            User.hasMany(models.Report, {
                foreignKey: "accused",
                as: "AccusedReports",
            });
        }
    }
    User.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            dob: DataTypes.DATE, //DATEONLY
            email: DataTypes.STRING,
            full_name: DataTypes.STRING,
            password: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            role: DataTypes.STRING,
            status: DataTypes.STRING,
            user_address_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
            // timestamps: false,
            tableName: "user",
            underscored: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        }
    );
    return User;
};
