import List from '../../../../use-cases/users/List.mjs';
import GetOne from '../../../../use-cases/users/GetOne.mjs';
import { makeUseCaseRunner } from '../../serviceRunner.mjs';

export default {
    show : makeUseCaseRunner(List, req => ({ ...req.query, ...req.params })),
    getOne : makeUseCaseRunner(GetOne, req => ({ ...req.query, ...req.params }))
};
