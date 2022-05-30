const crypto = require('crypto');

module.exports = {
    up : async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Currencies', [
            {
                id: crypto.randomUUID(),
                currency : 'EUR',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: crypto.randomUUID(),
                currency : 'USD',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: crypto.randomUUID(),
                currency : 'UAH',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);

        await queryInterface.bulkInsert('Sources', [
            {
                id: crypto.randomUUID(),
                source : 'OLX',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: crypto.randomUUID(),
                source : 'AutoRia',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Currencies', null, {});
        await queryInterface.bulkDelete('Sources', null, {});
    }
};
