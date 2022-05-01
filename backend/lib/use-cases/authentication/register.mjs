import User         from '../../domain-model/User.mjs';
import Base from '../../use-cases/Base.mjs';

import jwt from "jsonwebtoken";
import mail from "../utils/email.mjs";
import argon2  from "argon2";
import { v4 as uuidv4 } from 'uuid';

import config from "#global-config" assert {type: 'json'};

export default class register extends Base {
	async validate(data = {}) {
	    console.log(data);
	    const rules = {
			password	: [	"required", "string", { min_length: 8, max_length: 20}],
			email	: [	"required", "email"],
	    };

	    return this.doValidation(data, rules);
	}

	async execute({password, email}){
		const passwordHash = await argon2.hash(password);
		const usrDb = await User.createUser({
			id: uuidv4(),
			password: passwordHash,
			email: email,
		});
		const token = await jwt.sign({id: usrDb.id}, config.tokenEmailKey, {expiresIn: "1h"});

		// TODO set correct adminUrl
		const url = `${config.adminUrl}/verify-email/${token}`;

		// TODO create gmail account and put it to the config. It will be work ↓
		// await mail(data.email, url, "Click to verify account", "");

		return {token};
	}
}