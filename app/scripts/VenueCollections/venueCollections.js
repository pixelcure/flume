define([
	'jquery', 
	'lodash', 
	'backbone',
	'util',
	'../VenueModels/venueModels'
], function($, _, Backbone, Util, VenueModels){

    // Define our object that will contain our modals, collections, and views
    var VenueCollections = {
    	Collections : {}
    }

	// Venues
	VenueCollections.Collections.Venues = Backbone.Collection.extend({
		model : VenueModels.Models.Venue,
		url : '/venues'
	});

	return VenueCollections;
	
});