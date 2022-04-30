import express     from 'express';

import controllers from './controllers/index.mjs';
// import middlewares from './../middlewares.mjs';


const router = express.Router();
// const { fileUpload, detectDevice, detectIp, sequelizeSession, errorHandler } = middlewares;
// const { check } = controllers.sessions;

export default function init() {
    // router.use(sequelizeSession({ sequelize }));
    // router.use(fileUpload().any());
    // router.use(csrfProtection);

    //users
    router.get('/users',  controllers.users.show);

    //action
    router.post('/login',  controllers.action.login);
    router.post('/register',  controllers.action.register);
    router.post('/email-verify/:token',  controllers.action.emailVerify);

    // olx
    router.post('/olx/session', controllers.olx.createSession);

    // router.use(errorHandler);

    return router;
}

