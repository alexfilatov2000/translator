import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';

class Currency extends Base {
    static tableName = 'Currencies';

    static generateSchema() {
        this.modelSchema = {
            id       : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
            currency : DT.ENUM('EUR', 'USD', 'UAH'),

            createdAt : { type: DT.DATE, allowNull: false },
            updatedAt : { type: DT.DATE, allowNull: false }
        };

        return this.modelSchema;
    }

    static initRelations() {

    }
}

export default Currency;
