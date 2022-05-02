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

    //authentication
    router.post('/login',  controllers.authentication.login);
    router.post('/register',  controllers.authentication.register);
    router.post('/email-verify/:token',  controllers.authentication.emailVerify);

    // olx
    router.get('/olx/session', controllers.olx.getSession);

    // router.use(errorHandler);

    return router;
}

