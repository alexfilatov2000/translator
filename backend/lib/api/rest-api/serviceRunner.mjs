import jwt from 'jsonwebtoken';
import User from '../../domain-model/User.mjs';
import config from '#global-config' assert {type: 'json'};

export async function runUseCase(useCaseClass, { context = {}, params = {} }) {
    const result = await new useCaseClass({ context }).run(params);

    return result;
}

export function makeUseCaseRunner(
    useCaseClass,
    paramsBuilder,
    params,
    render = renderPromiseAsJson
) {
    return async function useCaseRunner(req, res, next) {
        let context = null;

        if (params?.withToken) {
            context = await validateJwt(req, res);
            if (!context) return;
        }

        const resultPromise = runUseCase(useCaseClass, {
            params : paramsBuilder(req, res),
            context
        });

        return render(req, res, resultPromise, next);
    };
}

async function validateJwt(req, res) {
    try {
        const token = getToken(req);

        const userData = await jwt.verify(token, config.tokenLoginKey);

        const user = await User.findByPk(userData.id);

        if (!user) {
            throw new Error('NOT_VALID_USER');
        }

        return  {
            userId       : user.id,
            userInstance : user
        };
    } catch (e) {
        res.status(400).send({
            error : 'WRONG_TOKEN'
        });
    }
}

export async function renderPromiseAsJson(req, res, promise) {
    try {
        const data = await promise;

        data.status = 1;

        return res.send(data);
    } catch (error) {
        console.log(error);
        res.send({
            status : 0,
            error  : {
                code    : 'SERVER_ERROR',
                message : 'Please, contact your system administartor!'
            }
        });
    }
}

function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }

    if (req.query && req.query.token) {
        return req.query.token;
    }

    if (req.params && req.params.token) {
        return req.params.token;
    }

    if (req.params && req.params.token) {
        return req.params.token;
    }

    if (req.get('X-AuthToken')) {
        return req.get('X-AuthToken');
    }

    return null;
}
