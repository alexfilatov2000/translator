import jwt from 'jsonwebtoken';
import argon2  from 'argon2';
import User         from '../../domain-model/User.mjs';
import Base from '../../use-cases/Base.mjs';
import config from '#global-config' assert {type: 'json'};

export default class login extends Base {
    async validate(data = {}) {
        console.log(data);
        const rules = {
            email   	: [	'required', 'email' ],
            password	: [	'required', 'string', { min_length: 8, max_length: 20 } ]
        };

        return this.doValidation(data, rules);
    }

    async execute({ email, password }) {
        console.log(222);
        const user = await User.findOne({ where: { email } });

        const errors = {};

        if (!user) throw ({ email: 'EMAIL_NOT_EXIST' });
        const isVerified = await argon2.verify(user.password, password);

        if (!isVerified) errors.password = 'INCORRECT_PASSWORD';
        if (user.status === 'UNVERIFIED') errors.error = 'UNVERIFIED_USER';
        if (Object.keys(errors).length) {
            throw errors;
        }

        const token = await jwt.sign(
            { id: user.id },
            config.tokenLoginKey, { expiresIn: '7d' }
        );

        return { user, token };
    }
}
