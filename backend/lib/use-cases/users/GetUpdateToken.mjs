import User         from '../../domain-model/User.mjs';
import Base from '../../use-cases/Base.mjs';
import config from '#global-config' assert {type: 'json'};
import mail from "../utils/email.mjs";
import jwt from "jsonwebtoken";

export default class GetUpdateToken extends Base {
    async validate(data = {}) {
        console.log(data);
        const rules = {
            email : [ 'required', 'string' ]
        };

        return this.doValidation(data, rules);
    }

    async execute({ email }) {
        const user = await User.findOne({ where: { email: email } });
        console.log(user)
        const token = await jwt.sign({ id: user.id }, config.tokenEmailKey, { expiresIn: '1h' });
        const url = `${config.adminUrl}/reset-password/${token}`;
        console.log(url)
        await mail(email, url, "Click to verify account", "hello");
    }
}
