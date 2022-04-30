import Login from '../../../../use-cases/action/login.mjs'
import Register from '../../../../use-cases/action/register.mjs'
import EmailVerify from '../../../../use-cases/action/email-verify.mjs'
import {makeUseCaseRunner} from "../../serviceRunner.mjs";

export default {
    login : makeUseCaseRunner(Login, req => ({ ...req.query, ...req.params, ...req.body})),
    register : makeUseCaseRunner(Register, req => ({ ...req.query, ...req.params, ...req.body})),
    emailVerify : makeUseCaseRunner(EmailVerify, req => ({ ...req.query, ...req.params, ...req.body}),)
};