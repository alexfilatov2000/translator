import express     from 'express';

import controllers from './controllers/index.mjs';
// import middlewares from './../middlewares.mjs';


const router = express.Router();
// const { fileUpload, detectDevice, detectIp, sequelizeSession, errorHandler } = middlewares;
// const { check } = controllers.sessions;

export default function init({ sequelize }) {
    // router.use(sequelizeSession({ sequelize }));
    // router.use(fileUpload().any());
    // router.use(csrfProtection);

    console.log('router')
    router.get('/users',  () => {
        console.log(12313)});

    // router.use(errorHandler);

    return router;
}

