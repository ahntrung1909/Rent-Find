"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("messages", {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            sender_id: {
                type: Sequelize.STRING,

                // references: {
                //     model: "user", // Tên bảng mà khóa ngoại tham chiếu đến
                //     key: "id", // Khóa chính của bảng tham chiếu
                // },
                // onUpdate: "CASCADE",
                // onDelete: "SET NULL",
            },
            receiver_id: {
                type: Sequelize.STRING,

                // references: {
                //     model: "user", // Tên bảng mà khóa ngoại tham chiếu đến
                //     key: "id", // Khóa chính của bảng tham chiếu
                // },
                // onUpdate: "CASCADE",
                // onDelete: "SET NULL",
            },
            content: {
                type: Sequelize.STRING,
            },
            send_at: {
                type: Sequelize.DATE,
            },
            seen: {
                type: Sequelize.BOOLEAN,
            },
            // Các trường timestamp đã được disable trong model
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("messages");
    },
};
