import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';
import Product from './Product.mjs';

class Statistic extends Base {
    static tableName = 'Statistics';

    static generateSchema() {
        this.modelSchema = {
            id              : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
            advert_views    : DT.INTEGER,
            phone_views     : DT.INTEGER,
            users_observing : DT.INTEGER,
            productId       : { type: DT.UUID, allowNull: false },

            createdAt : { type: DT.DATE, allowNull: false },
            updatedAt : { type: DT.DATE, allowNull: false }
        };

        return this.modelSchema;
    }

    static initRelations() {
        this.belongsTo(Product, { foreignKey: 'productId' });
    }
}

export default Statistic;
