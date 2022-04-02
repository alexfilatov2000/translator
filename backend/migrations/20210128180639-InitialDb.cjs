/* eslint-disable max-lines-per-function */
// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : async (queryInterface, Sequelize) => {

        await queryInterface.createTable('Users', {
            id             : { type: Sequelize.BIGINT,  primaryKey: true, autoIncrement: true },
            email          : { type: Sequelize.STRING,  allowNull: false, unique: true },

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
