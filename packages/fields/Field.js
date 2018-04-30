const inflection = require('inflection');

module.exports = class Field {
  constructor(path, { listKey, ...config }) {
    this.path = path;
    this.config = config;
    this.listKey = listKey;
    this.label = config.label || inflection.humanize(path);
  }
  addToMongooseSchema() {
    throw new Error(
      `Field type [${
        this.constructor.name
      }] does not implement addToMongooseSchema()`
    );
  }
  getGraphqlSchema() {
    if (!this.graphQLType) {
      throw new Error(
        `Field type [${this.constructor.name}] does not implement graphQLType`
      );
    }
    return `${this.path}: ${this.graphQLType}`;
  }
  getGraphqlTypes() {}
  getGraphqlQueryArgs() {}
  getGraphqlUpdateArgs() {}
  getQueryConditions() {
    return [];
  }
  getAdminMeta() {
    return this.extendAdminMeta({
      label: this.label,
      path: this.path,
      type: this.constructor.name,
      // TODO: Confirm whether this was supposed to be here
      // If so, is this only going to be used in the backend?
      defaultValue: this.config.defaultValue,
    });
  }
  extendAdminMeta(meta) {
    return meta;
  }
};
