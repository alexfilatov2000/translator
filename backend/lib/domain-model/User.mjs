import { DataTypes as DT }     from 'sequelize';
import Base                from './Base.mjs';
import argon2 from "argon2";

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

    static async updateUser({id, params}){
        let {password, full_name} = params;
        const user = await this.findOne({ where: { id: id } });
        let errors = {};

        let obj = {};

        if (password){
            obj.password = await argon2.hash(password);
        }

        if (Object.keys(errors).length){
            throw errors
        }

        const userUpdate = await user.update({...obj});

        return {user: userUpdate, updateData: {password, full_name}};
    }
}

export default User;
