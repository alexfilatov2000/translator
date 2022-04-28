import Base from '../../use-cases/Base.mjs';

export default class GetSession extends Base {
    async validate(data = {}) {
        const rules = {
            grant_type    : [ 'string' ],
            client_id     : [ 'required', 'string' ],
            client_secret : [ 'required', 'string' ],
            scope         : [ 'required', 'string', { default: 'v2 read write' } ]
        };

        return this.doValidation(data, rules);
    }

    async execute() {
        console.log(111);

        return {
            data : 111
        };
    }
}
