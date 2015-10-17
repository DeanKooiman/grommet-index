// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var merge = require('lodash/object/merge');
var RestWatch = require('./RestWatch');

var state = {
  urlPrefix: ''
};

function normalizeParams(params) {
  var result = merge({}, params);
  if (result.query && (typeof result.query === 'object')) {
    result.query = result.query.fullText;
  }
  return result;
}

function normalizeAggregate(result, handler) {
  handler(result[0].counts); // for now
}

var Api = {

  pageSize: 20,

  urlPrefix: function(urlPrefix) {
    state.urlPrefix = urlPrefix;
  },

  getItems: function (params) {
    return get(state.urlPrefix + '/rest/index/resources', params);
  },

  watchItems: function (params, handler) {
    var url = state.urlPrefix + '/rest/index/resources';
    params = normalizeParams(params);
    var watcher = RestWatch.start(url, params, handler);
    return watcher;
  },

  watchItem: function (uri, handler) {
    var url = state.urlPrefix + uri;
    var watcher = RestWatch.start(url, {}, handler);
    return watcher;
  },

  watchAggregate: function (params, handler) {
    var url = state.urlPrefix + '/rest/index/resources/aggregated';
    params = normalizeParams(params);
    var watcher = RestWatch.start(url, params,
      function (result) {
        normalizeAggregate(result, handler);
      }
    );
    return watcher;
  },

  stopWatching: function (watcher) {
    RestWatch.stop(watcher);
  }

};

module.exports = Api;
