/* eslint-disable no-sync */
import fs            from 'fs';
import https         from 'https';
import express       from 'express';
import bluebird    from 'bluebird';
import cors from 'cors';
import bodyParser from 'body-parser';
import adminRotes    from './admin/router.mjs';

const promisify = bluebird.promisifyAll;

const app = express();

let server = null;

export function init({ sequelize }) {
    app.use(cors());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/storage', express.static('storage'));
    app.use('/api/v1',  adminRotes({ sequelize }));

    return app;
}

export function start({ appPort, secure }) {
    const securedApp = secure ? useHttps(app) : app;

    server = securedApp.listen(appPort, () => {
        console.log(`app started on port ${appPort}`);
    });

    server.closeAsync = promisify(server.close);
}

export async function stop() {
    if (!server) return;

    console.log('server was stopped');

    await server.closeAsync();
}

function useHttps(application) {
    const httpsOptions = {
        key  : fs.readFileSync('./certs/localhost-key.pem'),
        cert : fs.readFileSync('./certs/localhost.pem')
    };

    return https.createServer(httpsOptions, application);
}
