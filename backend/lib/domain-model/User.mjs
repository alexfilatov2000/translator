import Base                from './Base.mjs';
import { DataTypes as DT }     from 'sequelize';

class User extends Base {

    static generateSchema() {
        this.schema = {
            id             : { type: DT.BIGINT,              primaryKey: true, autoIncrement: true },
            email          : { type: DT.STRING,              allowNull: false, unique: true },

            passwordHash   : { type: DT.STRING,              allowNull: false, defaultValue: '' },
            createdAt : { type: DT.DATE, allowNull: false },
            updatedAt : { type: DT.DATE, allowNull: false }
        };

        return this.schema;
    }

    static initRelations() {

    }
}

export default User;
