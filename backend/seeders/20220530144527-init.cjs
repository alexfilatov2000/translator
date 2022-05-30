const crypto = require('crypto');

module.exports = {
    up : async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Currencies', [
            {
                id: crypto.randomUUID(),
                currency : 'EUR'
            },
            {
                id: crypto.randomUUID(),
                currency : 'USD'
            },
            {
                id: crypto.randomUUID(),
                currency : 'UAH'
            }
        ]);

        await queryInterface.bulkInsert('Sources', [
            {
                id: crypto.randomUUID(),
                source : 'OLX'
            },
            {
                id: crypto.randomUUID(),
                source : 'AutoRia'
            }
        ]);
    },
    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Currencies', null, {});
        await queryInterface.bulkDelete('Sources', null, {});
    }
};
