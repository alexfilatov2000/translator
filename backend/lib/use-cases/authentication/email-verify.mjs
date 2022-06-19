import jwt from 'jsonwebtoken';
import Base from '../../use-cases/Base.mjs';
import User from '../../domain-model/User.mjs';
import config from '#global-config' assert {type: 'json'};

export default class emailVerify extends Base {
    async validate(data = {}) {
        console.log(data);
        const rules = {
            token   	: [	'token', 'email' ],
        };

        return this.doValidation(data, rules);
    }
    async execute(data) {
        const id = (await jwt.decode(data.token, config.tokenEmailKey)).id;
        const user = await User.findByPk(id);

        await user.update({ status: 'VERIFIED' });

        return { user };
    }
}

