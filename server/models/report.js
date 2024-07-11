"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Report.belongsTo(models.User, {
            //     foreignKey: "accuser",
            //     as: "user",
            // });
            // Report.belongsTo(models.User, {
            //     foreignKey: "accused",
            //     as: "user",
            // });
        }
    }
    Report.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            accuser: DataTypes.STRING,
            accused: DataTypes.STRING,
            reason: DataTypes.STRING,
            send_at: DataTypes.DATE,
            status: DataTypes.BOOLEAN,
            result: DataTypes.BOOLEAN,
            post_id: DataTypes.STRING,
            verifier: DataTypes.STRING,
            verify_at: DataTypes.DATE,
            action: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Report",
            // timestamps: false,
            tableName: "report",
            underscored: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        }
    );
    return Report;
};
