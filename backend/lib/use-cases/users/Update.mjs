import User         from '../../domain-model/User.mjs';
import Base from '../../use-cases/Base.mjs';
import config from '#global-config' assert {type: 'json'};
import mail from "../utils/email.mjs";
import jwt from "jsonwebtoken";

export default class Update extends Base {
	async validate(data = {}) {
		console.log(data);
		const rules = {
			token	: [	'required', 'string'],
			password	: [	'string', { min_length: 8, max_length: 20 } ]
		};
		return this.doValidation(data, rules);
	}
	async execute({ token, password }) {
		console.log(token)
		const id = (await jwt.decode(token, config.tokenEmailKey)).id;
		console.log(id)
		return User.updateUser({
			id: id,
			params: {password}
		});
	}
}

