define([
	'jquery', 
	'lodash', 
	'backbone',
	'util', 
	'../VenueModels/venueModels',
	'../VenueCollections/venueCollections',
	'ldsh!./templates/venueDetail'
], function($, _, Backbone, Util, VenueModels, VenueCollections, venueDetail){


    // Define our object that will contain our views
    VenuesList = {
    	Views : {}
    };

	// Simple Vendors List
	VenuesList.Views.VenuesList = Backbone.View.extend({

		collection : VenueCollections.Collections.Venues,

		tagName : '<li>',

		template : venueDetail,

		className : 'venueDir',

		initialize: function() {
			 this.listenTo(this.collection, 'add', this.render);
		},

		render : function () {

			// Take all the models in vendors
			var venues = this.collection.toJSON();

			// Compile our template
			_.template( this.template );

			// Pass vendors object as vendors > vendor
	        var data = this.template({
	            
	        	// The Venues Collection Data
	            venues : venues,

	            // Builds Map of Venue Location
	            venueMapHandler : function(address){	

	            	// Convert address from lat / lng, do call from geocode google api
					$.ajax({
						url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyDe5DYJZUSe9nw6NjyrYnxMAD3rH4khQY4',
						data : 'json',
						type : 'GET'
					}).success(function(response){

						// Coordinates
						var lat = response.results[0].geometry.location.lat;
						var lng = response.results[0].geometry.location.lng;

					}); // End Convert	            
	            } // End Make Map
	        }); // End Template Venue List Data

	        // Build the html
			this.$el.html( data );

			return this;
		}	
	}); // End Venue List View
 
	return VenuesList;

});



// // Build Map
// buildMap(lat, lng)

// // Render Venue Map
// function buildMap(lat, lng, venue){
	
// 	// Map Options
// 	var mapOptions = {
// 	  center: new google.maps.LatLng(lat, lng),
// 	  zoom: 18
// 	},
	
// 	// Location Marker Image
// 	img = 'images/marker.png',
	
// 	// Lat / Lng Coordinates
// 	latLng = {
// 		lat : lat,
// 		lng : lng
// 	},
	
// 	x = 0;
	
// 	console.log(x + ': ' + $('.map')[x]);

// 	// Instantiate New Google Map
// 	var mapBuild = new google.maps.Map($('.map')[x], mapOptions),
	
// 	// Venue Map Marker
// 	marker = new google.maps.Marker({
// 				    position: latLng,
// 				    map: mapBuild,
// 				    animation: google.maps.Animation.DROP,
// 				    icon : img
// 	}); // End Marker + Variables

// 	// Make Function to Init Map
// 	function initialize(){};

// 	x++;

// 	// Load Venue Map
// 	google.maps.event.addDomListener(window, 'load', initialize);

// 	// Invoke Venue Map
// 	initialize();

// 	// Style Map
// 	colorMap(mapBuild);

// } // end build Map

// // Color Map
// function colorMap(map){
	
// 	// Styles, Features
// 	var styles = [
// 	  {
// 	    stylers: [
// 	      { hue: "#19ffe0" },
// 	      { saturation: 30 }
// 	    ]
// 	  },{
// 	    featureType: "road",
// 	    elementType: "geometry",
// 	    stylers: [
// 	      { lightness: 100 },
// 	      { visibility: "simplified" }
// 	    ]
// 	  },{
// 	    featureType: "road",
// 	    elementType: "labels",
// 	    stylers: [
// 	      { visibility: "off" }
// 	    ]
// 	  }
// 	]; // End Array

// 	// Set Map Options
// 	map.setOptions({styles: styles});							
// } // end Color Map