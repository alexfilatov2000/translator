import CreateSession from '../../../../use-cases/olx/CreateSession.mjs';
import GetAdverts from '../../../../use-cases/marketplaces/GetAdverts.js';
import { makeUseCaseRunner } from '../../serviceRunner.mjs';

export default {
    createSession : makeUseCaseRunner(CreateSession, req => ({ ...req.query, ...req.params, ...req.body })),
    getAdverts    : makeUseCaseRunner(GetAdverts, req => ({ ...req.query, ...req.params, ...req.body }))
};
