define([
	'jquery', 
	'lodash', 
	'backbone',
	'util'
], function($, _, Backbone, Util){

    // Define our object that will contain our modals, collections, and views
    var VenueModels = {
    	Models : {}
    }

    // Simple Vendor
	VenueModels.Models.Venue = Backbone.Model.extend({
		defaults : {
			id : '',
			firstName : '',
			lastName : '',
			email : '',
			phoneNumber : '',
			address : '',
			city : '',
			state : '',
			zip : '',
			venue : '',
			website : '',
			capacity : '',
			ageRestriction : '',
			eventDates : [],
			summary : '',
			reviews : [],
			venueImages : []
		},
		urlRoot : '/venue'
	});

	return VenueModels;

});