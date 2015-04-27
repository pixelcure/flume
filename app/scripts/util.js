define(['jquery', 'lodash', 'backbone'], function($, _, Backbone){
	
	var Util = {};

	_.extend(Util, Backbone.Events);
	
	// add .trigger, .on, .off, .listenTo, .StopListening 
	// because we extent backbone events to Util object



	return Util;

});