import User         from '../../domain-model/User.mjs';
import Base from '../../use-cases/Base.mjs';

export default class UsersGetOne extends Base {
    async validate(data = {}) {
        console.log(data);
        const rules = {
            id : [ 'required', 'string' ]
        };

        return this.doValidation(data, rules);
    }

    async execute({ id }) {
        const user = await User.findOne({where: {id: id}});

        return {
            user
        };
    }
}
