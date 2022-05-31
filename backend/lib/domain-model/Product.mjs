import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';
import Statistic from './Statistic.mjs';
import Source from './Source.mjs';
import Currency from './Currency.mjs';
import Detail from "./Detail.mjs";

class Product extends Base {
    static tableName = 'Products';

    static generateSchema() {
        this.modelSchema = {
            id          : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
            title       : DT.STRING,
            description : DT.TEXT,
            image       : DT.TEXT,
            price       : DT.INTEGER,
            currencyId  : { type: DT.UUID, allowNull: false },
            sourceId    : { type: DT.UUID, allowNull: false },
            status      : DT.STRING,
            count       : DT.INTEGER,

            createdAt : { type: DT.DATE, allowNull: false },
            updatedAt : { type: DT.DATE, allowNull: false }
        };

        return this.modelSchema;
    }

    static initRelations() {
        this.hasOne(Statistic);
        this.hasMany(Detail);
        this.belongsTo(Source, { foreignKey: 'sourceId' });
        this.belongsTo(Currency, { foreignKey: 'currencyId' });
    }
}

export default Product;
