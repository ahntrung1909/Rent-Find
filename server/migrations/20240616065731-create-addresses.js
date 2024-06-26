"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("addresses", {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            ward: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            district: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            // Các trường timestamp đã được disable trong model
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("addresses");
    },
};
