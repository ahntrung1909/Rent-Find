"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ImgReport extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ImgReport.belongsTo(models.Report, {
                foreignKey: "report_id",
                as: "report",
            });
        }
    }
    ImgReport.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            img_url: DataTypes.STRING,
            public_id: DataTypes.STRING,
            report_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ImgReport",
            // timestamps: false,
            tableName: "imgReport",
            underscored: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        }
    );
    return ImgReport;
};
