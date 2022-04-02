import cls                     from 'cls-hooked';
import Sequelize               from 'sequelize';
import User                    from './User.mjs';

const namespace = cls.createNamespace('sequelize');

Sequelize.useCLS(namespace);

export function initModels(dbConfig, params) {

    const { database, username, password, dialect, host, port } = dbConfig.db;

    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect,
        logging        : false,
    });

    const models = {
        User,
    };

    Object.values(models).forEach(model => model.init(sequelize));
    Object.values(models).forEach(model => model.initRelationsAndHooks(sequelize));

    return {
        ...models,
        sequelize
    };
}
