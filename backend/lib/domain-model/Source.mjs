import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';

class Source extends Base {
    static tableName = 'Sources';

    static generateSchema() {
        this.modelSchema = {
            id     : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
            source : DT.ENUM('OLX', 'AutoRia'),

            createdAt : { type: DT.DATE, allowNull: false },
            updatedAt : { type: DT.DATE, allowNull: false }
        };

        return this.modelSchema;
    }

    static initRelations() {

    }
}

export default Source;
