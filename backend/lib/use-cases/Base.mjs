
export default class UseCaseBase {
    static sequelizeInstanse = null;

    static setSequelizeInstanse(sequelize) {
        UseCaseBase.sequelizeInstanse = sequelize;
    }

    static setAppConfig(config) {
        UseCaseBase.appConfig = config;
    }
}
