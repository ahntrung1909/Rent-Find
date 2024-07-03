"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ImgPost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ImgPost.belongsTo(models.Posts, {
                foreignKey: "post_id",
                as: "posts",
            });
        }
    }
    ImgPost.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            img_url: DataTypes.STRING,
            public_id: DataTypes.STRING,
            post_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ImgPost",
            tableName: "imgPost",
            // timestamps: false,
            underscored: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        }
    );
    return ImgPost;
};
