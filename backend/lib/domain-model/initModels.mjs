import cls                     from 'cls-hooked';
import Sequelize               from 'sequelize';
import User                    from './User.mjs';
import Product from './Product.mjs';
import Source from './Source.mjs';
import Currency from './Currency.mjs';
import Statistic from './Statistic.mjs';
import Detail from './Detail.mjs';

const namespace = cls.createNamespace('sequelize');

Sequelize.useCLS(namespace);

export function initModels(dbConfig) {
    const { database, username, password, dialect, host, port } = dbConfig.development;

    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect,
        logging : false
    });

    const models = {
        User,
        Product,
        Source,
        Currency,
        Statistic,
        Detail
    };

    Object.values(models).forEach(model => model.init(sequelize));
    Object.values(models).forEach(model => model.initRelationsAndHooks(sequelize));

    return {
        ...models,
        sequelize
    };
}
