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

    // users
    router.get('/users',  controllers.users.show);
    router.get('/users/:id',  controllers.users.getOne);
    router.post('/update-verify',  controllers.users.getUpdateToken);
    router.patch('/users/:token',  controllers.users.update);

    // authentication
    router.post('/login',  controllers.authentication.login);
    router.post('/register',  controllers.authentication.register);
    router.get('/verify-email/:token',  controllers.authentication.emailVerify);

    // marketplaces
    router.post('/olx/session', controllers.marketplaces.createSession);
    router.post('/autoria/session', controllers.marketplaces.autoriaSession);
    router.post('/adverts',  controllers.marketplaces.getAdverts);
    router.post('/adverts/clone',  controllers.marketplaces.cloneAdvert);
    router.post('/adverts/mark_as_sold',  controllers.marketplaces.markAsSold);
    router.get('/adverts/statistics',  controllers.marketplaces.getSoldStatistics);

    // router.use(errorHandler);

    return router;
}

