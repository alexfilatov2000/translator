import List from '../../../../use-cases/users/List.mjs';
import { makeUseCaseRunner } from '../../serviceRunner.mjs';

export default {
    getSession : makeUseCaseRunner(List, req => ({ ...req.query, ...req.params }))
};
