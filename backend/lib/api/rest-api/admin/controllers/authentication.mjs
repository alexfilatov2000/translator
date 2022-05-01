import Login from '../../../../use-cases/authentication/login.mjs'
import Register from '../../../../use-cases/authentication/register.mjs'
import EmailVerify from '../../../../use-cases/authentication/email-verify.mjs'
import {makeUseCaseRunner} from "../../serviceRunner.mjs";

export default {
    login : makeUseCaseRunner(Login, req => ({ ...req.query, ...req.params, ...req.body})),
    register : makeUseCaseRunner(Register, req => ({ ...req.query, ...req.params, ...req.body})),
    emailVerify : makeUseCaseRunner(EmailVerify, req => ({ ...req.query, ...req.params, ...req.body}),)
};