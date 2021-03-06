App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Store = DS.Store.extend();

App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace : 'api'
});

App.setupForTesting();

App.injectTestHelpers();

App.rootElement = '#ember-testing';