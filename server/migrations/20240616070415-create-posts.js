"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("posts", {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            description: {
                type: Sequelize.TEXT,
            },
            price: {
                type: Sequelize.FLOAT,
            },
            title: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            post_address_id: {
                type: Sequelize.STRING,
                // references: {
                //     model: "addresses", // Tên bảng mà khóa ngoại tham chiếu đến
                //     key: "id", // Khóa chính của bảng tham chiếu
                // },
                // onUpdate: "CASCADE",
                // onDelete: "SET NULL",
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            // Các trường timestamp đã được disable trong model
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("posts");
    },
};
