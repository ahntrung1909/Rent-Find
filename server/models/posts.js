"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Posts.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            description: DataTypes.TEXT,
            price: DataTypes.FLOAT, //FLOAT
            title: DataTypes.STRING,
            status: DataTypes.STRING,
            postAddressId: DataTypes.STRING,
            userId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Posts",
            // timestamps: false,
            tableName: "posts",
            underscored: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        }
    );
    return Posts;
};
