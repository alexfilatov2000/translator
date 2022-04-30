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

	async execute(data){
		data.password = await argon2.hash(data.password);
		const usr = {
			id: uuidv4(),
			password: data.password,
			email: data.email,
		};
		const usrDb = await User.createUser({...usr});
		const token = await jwt.sign({id: usrDb.id}, config.tokenEmailKey, {expiresIn: "1h"});
		const url = `http://localhost:3000/verify-email/${token}`;

		// await mail(data.email, url, "Click to verify account", "");

		return {token};
	}
}
