/* eslint-disable max-lines-per-function */
// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Currencies', {
            id : {
                type         : Sequelize.UUID,
                defaultValue : Sequelize.UUIDV4,
                primaryKey   : true
            },
            currency : { type: Sequelize.ENUM('EUR', 'USD', 'UAH'), allowNull: false },

            createdAt : { type: Sequelize.DATE,    allowNull: false },
            updatedAt : { type: Sequelize.DATE,    allowNull: false }
        }, {
            charset : 'utf8mb4'
        });

        await queryInterface.createTable('Sources', {
            id : {
                type         : Sequelize.UUID,
                defaultValue : Sequelize.UUIDV4,
                primaryKey   : true
            },
            source : { type: Sequelize.ENUM('OLX', 'AutoRia'), allowNull: false },

            createdAt : { type: Sequelize.DATE,    allowNull: false },
            updatedAt : { type: Sequelize.DATE,    allowNull: false }
        }, {
            charset : 'utf8mb4',
        });



        await queryInterface.createTable('Products', {
            id : {
                type         : Sequelize.UUID,
                defaultValue : Sequelize.UUIDV4,
                primaryKey   : true
            },
            title : {
                type      : Sequelize.STRING,
                allowNull : false
            },
            description : {
                type      : Sequelize.TEXT,
                allowNull : false
            },
            image : {
                type      : Sequelize.TEXT,
                allowNull : false
            },
            price : {
                type      : Sequelize.INTEGER,
                allowNull : false
            },

            currencyId  : { type: Sequelize.UUID, references: { model: 'Currencies', key: 'id' }, allowNull: false },
            sourceId    : { type: Sequelize.UUID, references: { model: 'Sources', key: 'id' }, allowNull: false },
            userId      : { type: Sequelize.UUID, references: { model: 'Users', key: 'id' }, allowNull: false },

            status : {
                type      : Sequelize.STRING,
                allowNull : false
            },

            count: { type: Sequelize.INTEGER,    allowNull: false, defaultValue : 1, },

            createdAt : { type: Sequelize.DATE,    allowNull: false },
            updatedAt : { type: Sequelize.DATE,    allowNull: false }
        }, {
            charset : 'utf8mb4'
        });


        await queryInterface.createTable('Statistics', {
            id : {
                type         : Sequelize.UUID,
                defaultValue : Sequelize.UUIDV4,
                primaryKey   : true
            },
            productId       : { type: Sequelize.UUID, references: { model: 'Products', key: 'id' }, allowNull: false },
            advert_views    : { type: Sequelize.INTEGER,    allowNull: false },
            phone_views     : { type: Sequelize.INTEGER,    allowNull: false },
            users_observing : { type: Sequelize.INTEGER,    allowNull: false },

            createdAt : { type: Sequelize.DATE,    allowNull: false },
            updatedAt : { type: Sequelize.DATE,    allowNull: false }
        }, {
            charset : 'utf8mb4'
        });

        await queryInterface.createTable('Details', {
            id : {
                type         : Sequelize.UUID,
                defaultValue : Sequelize.UUIDV4,
                primaryKey   : true
            },
            productId       : { type: Sequelize.UUID, references: { model: 'Products', key: 'id' }, allowNull: false },
            count    : { type: Sequelize.INTEGER,    allowNull: false },

            createdAt : { type: Sequelize.DATE,    allowNull: false },
            updatedAt : { type: Sequelize.DATE,    allowNull: false }
        }, {
            charset : 'utf8mb4'
        });
    },

    down : async (queryInterface) => {
        await queryInterface.dropTable('Details');
        await queryInterface.dropTable('Statistics');
        await queryInterface.dropTable('Products');
        await queryInterface.dropTable('Currencies');
        await queryInterface.dropTable('Sources');
    }
};
