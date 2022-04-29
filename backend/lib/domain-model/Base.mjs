import Sequelize      from 'sequelize';

class Base extends Sequelize.Model {
    constructor({context}) {
        super();
        this.context = context;
    }
    static init(sequelize, options = {}) {
        if (this.generateSchema) {
            this.generateSchema();
        }

        // TODO: rename this.schema
        // schema already exists in sequelize Base model class.
        // See line 1416 in model.js : static schema(schema, options) { ... }
        super.init(this.schema, {
            tableName : this.tableName,
            ...options,
            sequelize,
            ...this.options
        });
    }

    static initRelationsAndHooks() {
        if (this.initRelations) this.initRelations();
        if (this.initHooks) this.initHooks();
    }
}

export default Base;
