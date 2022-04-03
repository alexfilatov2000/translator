
import {Exception} from "./Exception.mjs";

import "../utils/livr.mjs"
import LIVR from 'livr';

export default class UseCaseBase {
    static sequelizeInstanse = null;

    static setSequelizeInstanse(sequelize) {
        UseCaseBase.sequelizeInstanse = sequelize;
    }

    static setAppConfig(config) {
        UseCaseBase.appConfig = config;
    }

    async run(args) {
        return UseCaseBase.sequelizeInstanse.transaction(async () => {
            let result = null;

            try {
                const cleanParams = await this.validate(args);

                result = this.execute(cleanParams);
            } catch (e) {
                throw e
            }

            return result;
        });
    }


    async doValidation(data, rules) {
        const validator = new LIVR.Validator(rules).prepare();
        const result = validator.validate(data);

        if (!result) {
            const exception = new Exception({
                code   : 'FORMAT_ERROR',
                fields : validator.getErrors()
            });

            throw exception;
        }

        return result;
    }
}
