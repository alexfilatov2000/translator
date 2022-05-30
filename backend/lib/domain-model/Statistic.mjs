import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';

class Statistic extends Base {
    static tableName = 'Statistics';

    static generateSchema() {
        this.modelSchema = {
            id              : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
            advert_views    : DT.INTEGER,
            phone_views     : DT.INTEGER,
            users_observing : DT.INTEGER,

            createdAt : { type: DT.DATE, allowNull: false },
            updatedAt : { type: DT.DATE, allowNull: false }
        };

        return this.modelSchema;
    }

    static initRelations() {

    }
}

export default Statistic;
