import Base from '../../use-cases/Base.mjs';
// import Users from "../../models/users.mjs";

export default class emailVerify extends Base {
	async execute(data){
		await this.context.update({status: "verified"});
	}
}

