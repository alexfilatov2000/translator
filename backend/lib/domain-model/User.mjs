import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';

class User extends Base {
    static generateSchema() {
        this.schema = {
            id: { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
            password: DT.STRING,
            email: DT.STRING,
            status: DT.STRING,

            createdAt    : { type: DT.DATE, allowNull: false },
            updatedAt    : { type: DT.DATE, allowNull: false }
        };

        return this.schema;
    }

    static initRelations() {

    }

    static async createUser(params){
        let errors = {};
        const email = await this.findOne({ where: { email: params.email } });
        if (email) {
            errors.email = "email is busy";
        }
        if (Object.keys(errors).length){
            throw errors;
        }
        return this.create({...params});
    }
}

export default User;
