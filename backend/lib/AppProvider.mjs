import * as api                from './api/rest-api/app.mjs';
import {initModels} from "./domain-model/index.mjs";
import UseCaseBase             from './use-cases/Base.mjs';
import config                  from '../configs/config.json' assert {type: 'json'};

export default class AppProvider {
    config = null;

    sequelize = null;

    api = null;

    dbConfig = {};

    static create() {
        return new this();
    }

    initApp() {
        this.config = config;
        this.api = api;

        this.initDb();
        this.initUseCases();

        return this;
    }

    start(params = {}) {
        this.api.init({ sequelize: this.sequelize });
        this.api.start({
            appPort : this.config.appPort,
            secure  : this.config?.https,
            ...params
        });
    }

    initDb() {
        const { sequelize } = initModels(this.config, this.dbConfig);

        this.sequelize = sequelize;
    }

    initUseCases() {
        UseCaseBase.setSequelizeInstanse(this.sequelize);
        UseCaseBase.setAppConfig(this.config);
    }
}
