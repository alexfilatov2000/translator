import Base from '../../use-cases/Base.mjs';

export default class CreateSession extends Base {
    async validate(data = {}) {
        const rules = {
            grant_type    : [ 'string' ],
            client_id     : [ 'required', 'string' ],
            client_secret : [ 'required', 'string' ],
            scope         : [ 'required', 'string', { default: 'v2 read write' } ]
        };

        return this.doValidation(data, rules);
    }

    async execute({
        grant_type,
        client_id,
        client_secret,
        scope
    }) {
        console.log(111);

        const response = await fetch('https://httpbin.org/post', {
            method : 'post',
            body   : JSON.stringify({
                grant_type,
                client_id,
                client_secret,
                scope
            }),
            headers : { 'Content-Type': 'application/json' }
        });

        return {
            data : 111
        };
    }
}
