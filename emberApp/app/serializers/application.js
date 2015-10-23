import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeFindRecordResponse(store, type, payload) {
    const quoteObjs = payload.dataset.data.map(function (quote, i) {
      return {
        date: moment(payload.dataset.data[i][0]).valueOf(),
        open: payload.dataset.data[i][1],
        high: payload.dataset.data[i][2],
        low: payload.dataset.data[i][3],
        close: payload.dataset.data[i][4],
        volume: payload.dataset.data[i][5],
      };
    })
    return {
      data: {
        id: payload.dataset.dataset_code,
        type: type.modelName,
        attributes: {
          name: payload.dataset.name,
          symbol: payload.dataset.dataset_code,
          quotes: quoteObjs
        }
      }
    };
  }
});
