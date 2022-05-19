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
        console.log(data);
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

        // const result = {
        //     access_token: '933fa41089b27a3e4719b8a610d910119a10fa57',
        //     expires_in: 70055,
        //     token_type: 'bearer',
        //     scope: 'v2 read write',
        //     refresh_token: '698f41b9f7ba5746c3797268869dc10eb7ecf03f'
        // }

        console.log(result);

        return {
            data : { ...result }
        };
    }
}
