"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("user", {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            dob: {
                type: Sequelize.DATE,
            },
            email: {
                type: Sequelize.STRING,
            },
            full_name: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            phone_number: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.BOOLEAN,
            },
            user_address_id: {
                type: Sequelize.STRING,
                // references: {
                //     model: "addresses", // Tên bảng mà khóa ngoại tham chiếu đến
                //     key: "id", // Khóa chính của bảng tham chiếu
                // },
                // onUpdate: "CASCADE",
                // onDelete: "SET NULL",
            },
            // Các trường timestamp đã được disable trong model
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("user");
    },
};
