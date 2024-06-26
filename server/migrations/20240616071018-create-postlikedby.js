"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("postLikedBy", {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
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
            user_id: {
                type: Sequelize.STRING,
                // references: {
                //     model: "users", // Tên bảng mà khóa ngoại tham chiếu đến (nếu bạn có bảng users)
                //     key: "id", // Khóa chính của bảng tham chiếu
                // },
                // onUpdate: "CASCADE",
                // onDelete: "SET NULL",
            },
            // Các trường timestamp đã được disable trong model
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("postLikedBy");
    },
};
