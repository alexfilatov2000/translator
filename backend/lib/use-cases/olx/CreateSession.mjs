import Base from '../../use-cases/Base.mjs';

export default class CreateSession extends Base {
    async validate(data = {}) {
        const rules = {
            grant_type    : [ 'required', 'string' ],
            client_id     : [ 'required', 'string' ],
            client_secret : [ 'required', 'string' ],
            scope         : [ 'string', { default: 'v2 read write' } ],
            code          : [ 'required', 'string' ],
            redirect_uri  : [ 'required', 'string' ]
        };

        return this.doValidation(data, rules);
    }

    async execute(data) {
        let response;

        try {
            response = await fetch('https://www.olx.ua/api/open/oauth/token', {
                method  : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            });
        } catch (e) {
            throw e;
        }


        const result = await response.json();

        return {
            data : { ...result }
        };
    }
}
