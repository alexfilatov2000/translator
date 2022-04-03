import List from '../../../../use-cases/users/List.mjs'
import {makeUseCaseRunner} from "../../serviceRunner.mjs";

export default {
    show           : makeUseCaseRunner(List, req => ({ ...req.query, ...req.params }))
};