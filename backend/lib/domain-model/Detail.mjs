import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';
import Product from './Product.mjs';

class Detail extends Base {
    static tableName = 'Details';

    static generateSchema() {
        this.modelSchema = {
            id              : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
            count    : DT.INTEGER,
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

export default Detail;
