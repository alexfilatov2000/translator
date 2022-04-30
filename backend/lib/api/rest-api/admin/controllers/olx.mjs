import CreateSession from '../../../../use-cases/olx/CreateSession.mjs';
import { makeUseCaseRunner } from '../../serviceRunner.mjs';

export default {
    createSession : makeUseCaseRunner(CreateSession, req => ({ ...req.query, ...req.params, ...req.body }))
};
