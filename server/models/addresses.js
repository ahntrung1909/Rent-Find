"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Addresses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Addresses.hasOne(models.User, {
            //     foreignKey: "user_address_id",
            //     as: "fk_user_address",
            // });
        }
    }
    Addresses.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            description: DataTypes.TEXT,
            ward: DataTypes.STRING,
            district: DataTypes.STRING,
            city: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Addresses",
            // timestamps: false,
            tableName: "addresses",
            underscored: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        }
    );
    return Addresses;
};
