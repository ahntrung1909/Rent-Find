"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class postLikedBy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            postLikedBy.belongsTo(models.Posts, {
                foreignKey: "post_id",
            });
            postLikedBy.belongsTo(models.User, {
                foreignKey: "user_id",
            });
        }
    }
    postLikedBy.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            post_id: DataTypes.STRING,
            user_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "PostLikedBy",
            // timestamps: false,
            tableName: "postLikedBy",
            underscored: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        }
    );
    return postLikedBy;
};
