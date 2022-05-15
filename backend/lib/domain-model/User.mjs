import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';

class User extends Base {
    static tableName = 'Users';

    static generateSchema() {
        this.modelSchema = {
            id       : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
            password : DT.STRING,
            email    : DT.STRING,
            status   : DT.ENUM('UNVERIFIED', 'VERIFIED'),

            createdAt : { type: DT.DATE, allowNull: false },
            updatedAt : { type: DT.DATE, allowNull: false }
        };

        return this.modelSchema;
    }

    static initRelations() {

    }

    static async createUser(params) {
        const errors = {};
        const email = await this.findOne({ where: { email: params.email } });

        if (email) {
            errors.email = 'EMAIL_BUSY';
        }

        if (Object.keys(errors).length) {
            throw errors;
        }


        return this.create({ ...params });
    }
}

export default User;
