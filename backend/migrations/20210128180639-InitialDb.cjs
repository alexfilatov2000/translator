/* eslint-disable max-lines-per-function */
// eslint-disable-next-line import/no-commonjs
const {DataTypes: DT} = require("sequelize");
module.exports = {
    up : async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: "unverified",
            },

            createdAt      : { type: Sequelize.DATE,    allowNull: false },
            updatedAt      : { type: Sequelize.DATE,    allowNull: false }
        }, {
            charset : 'utf8mb4'
        });
    },

    down : async (queryInterface) => {
        await queryInterface.dropTable('Users');
    }
};
