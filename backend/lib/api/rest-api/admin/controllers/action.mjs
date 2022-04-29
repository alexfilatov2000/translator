import List from '../../../../use-cases/users/List.mjs'
import {makeUseCaseRunner} from "../../serviceRunner.mjs";

export default {
    login : makeUseCaseRunner(List, req => ({ ...req.query, ...req.params, ...req.body}), {withToken: true})
};