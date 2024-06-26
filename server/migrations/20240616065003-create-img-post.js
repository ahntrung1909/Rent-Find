"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("imgPost", {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            imgUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            public_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            post_id: {
                type: Sequelize.STRING,
                allowNull: false,

                // references: {
                //     model: "posts", // Tên bảng mà khóa ngoại tham chiếu đến
                //     key: "id", // Khóa chính của bảng tham chiếu
                // },
                // onUpdate: "CASCADE",
                // onDelete: "SET NULL",
            },
            // Các trường timestamp đã được disable trong model
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("imgPost");
    },
};
