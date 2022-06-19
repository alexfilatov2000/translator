import Base from '../../../use-cases/Base.mjs';

export default class AutoriaSession extends Base {
    async validate(data = {}) {
        const rules = {
            ria_access_token : [ 'required', 'string' ],
            user_id          : [ 'required', 'string' ]
        };

        return this.doValidation(data, rules);
    }

    async execute({ ria_access_token, user_id }) {
        let response;
        try {
            response = await fetch(`https://developers.ria.com/auto/used/autos/ids?api_key=${ria_access_token}&user_id=${user_id}`, {
                method  : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
        } catch (e) {
            throw e;
        }

        let result = await response.json();

        if (result?.active) {
            result = {
                ria_access_token,
                ria_user_id : user_id
            };
        } else {
            result = { error: result?.error?.code || 'AUTORIA_SESSION_FAILED' };
        }

        return {
            data : { ...result }
        };
    }
}
