import User         from '../../domain-model/User.mjs';
import Base from '../../use-cases/Base.mjs';
import jwt from "jsonwebtoken";
import argon2  from "argon2";
import config from "#global-config" assert {type: 'json'};

export default class login extends Base {
    async validate(data = {}) {
        console.log(data);
        const rules = {
            email	: [	"required", "email"],
            password	: [	"required", "string", { min_length: 8, max_length: 20}],
        };

        return this.doValidation(data, rules);
    }
    async execute(data){
        const user = await User.findOne({where: {email: data.email}});
        let errors = {};

        if (user === null) throw ({email: "email is not exist"});
        const ok = await argon2.verify(user.password, data.password);
        if (!ok) errors.password = "wrong account password";
        if (user.status === "unverified") errors.error = "u must verify account";
        if (Object.keys(errors).length){
            throw errors;
        }

        const token = await jwt.sign({id: user.id},
            config.tokenLoginKey, {expiresIn: "7d"});

        console.log(token);

        return {user, token};
    }
}