import List from '../../../../use-cases/users/List.mjs';
import GetOne from '../../../../use-cases/users/GetOne.mjs';
import Update from '../../../../use-cases/users/Update.mjs';
import GetUpdateToken from '../../../../use-cases/users/GetUpdateToken.mjs';
import { makeUseCaseRunner } from '../../serviceRunner.mjs';

export default {
    show   : makeUseCaseRunner(List, req => ({ ...req.query, ...req.params })),
    getOne : makeUseCaseRunner(GetOne, req => ({ ...req.query, ...req.params })),
    update : makeUseCaseRunner(Update, req => ({ ...req.query, ...req.params, ...req.body })),
    getUpdateToken : makeUseCaseRunner(GetUpdateToken, req => ({ ...req.query, ...req.params, ...req.body }))
};
