import ApplicationAdapter from './application';

export default class ApiTokenAdapter extends ApplicationAdapter {
  namespace = 'api/v1/me';

  pathForType() {
    return 'tokens';
  }

  buildQuery(...args) {
    const query = super.buildQuery(...args);
    query.expired_days = 30;

    return query;
  }

  createRecord(store, type, snapshot) {
    let data = {};
    let serializer = store.serializerFor(type.modelName);
    let url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    return this.ajax(url, 'PUT', { data });
  }
}
