"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("report", {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            accuser: {
                type: Sequelize.STRING,
            },
            accused: {
                type: Sequelize.STRING,
            },
            reason: {
                type: Sequelize.STRING,
            },
            send_at: {
                type: Sequelize.DATE,
            },
            status: {
                type: Sequelize.BOOLEAN,
            },
            result: {
                type: Sequelize.BOOLEAN,
            },
            post_id: {
                type: Sequelize.STRING,

                // references: {
                //     model: "posts", // Tên bảng mà khóa ngoại tham chiếu đến
                //     key: "id", // Khóa chính của bảng tham chiếu
                // },
                // onUpdate: "CASCADE",
                // onDelete: "SET NULL",
            },
            verifier: {
                type: Sequelize.STRING,
            },
            verify_at: {
                type: Sequelize.DATE,
            },
            action: {
                type: Sequelize.STRING,
            },
            // Các trường timestamp đã được disable trong model
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("report");
    },
};
