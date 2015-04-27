define([
    'jquery', 
    'lodash', 
    'backbone',
    'util',
    '../VenueCollections/venueCollections',
    'ldsh!./templates/venueSignUp',
    'ldsh!./templates/venueNewDate',
], function($, _, Backbone, Util, VenueCollections, venueSignUp, venueNewDate){

    // Define our object that will contain our views
    var VenueSignUp = {
        Views : {}
    }

    // Simple Vendors List
    VenueSignUp.Views.VenueForm = Backbone.View.extend({

        // Tag Name
        tagName : '<li>',

        // Template
        template : venueSignUp,

        // Define Collection
        collection : VenueCollections.Collections.Venues,
        
        // Events
        events : {
            'click #venueSignUpSubmit' : 'addNewVenue',
            'click .add-new-date' : 'addVenueDate',
            'click div.venue-dates fieldset span.remove' : 'removeVenueDate'
        },

        // Init
        initialize: function() {
            this.listenTo(this.collection, 'add', this.addNewVenue);
        },

        // Render Venue Form
        render : function () {

            // Compile our template
            _.template( this.template );

            // Build the html
            this.$el.append( this.template );

            return this;
        },

        // Add New Venue Date
        addVenueDate : function(e){
            
            // Clone Date Input
            var newDateTemplate = venueNewDate;

            // Append New Date
            $(e.currentTarget).parent().find('div.venue-dates').append(newDateTemplate);

        },

        // Add New Venue
        addNewVenue : function() {
            // adding verification/string testing soon

            // Define Variables for Event Dates List
            var eventDatesList = [];

            // Build Address, To Get Coordinates in Lat/Lng
            var venueAddress = $('.venue-signUp').find('input[name="address"]').val() + ' '
                            + $('.venue-signUp').find('input[name="city"]').val() + ' '
                            + $('.venue-signUp').find('select[name="state"]').val() + ' '
                            + $('.venue-signUp').find('input[name="zip"]').val();

            // Convert Address From Lat / Lng, Calls Google Geocoder API
            $.ajax({
                url : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + venueAddress + '&key=AIzaSyDe5DYJZUSe9nw6NjyrYnxMAD3rH4khQY4',
                data : 'json',
                type : 'GET'
            }).success(function(response){
                // Coordinates
                var lat = response.results[0].geometry.location.lat,
                    lng = response.results[0].geometry.location.lng;
                    
                // Lat / Lng Coordinates
                latLng = {
                    lat : lat,
                    lng : lng
                };

                return latLng;
            });  

            // Build Array of Available Dates
            $('.venue-signUp').find('.venue-dates input.date').each(function(){                
                // Add date to Array
                eventDatesList.push( $(this).val() )
            });

            // New Venue Data
            var newVenue = {
                firstName : $('.venue-signUp').find('input[name="firstName"]').val(),
                lastName : $('.venue-signUp').find('input[name="lastName"]').val(),
                email : $('.venue-signUp').find('input[name="email"]').val(),
                phoneNumber : $('.venue-signUp').find('input[name="phoneNumber"]').val(),
                address : $('.venue-signUp').find('input[name="address"]').val(),
                city : $('.venue-signUp').find('input[name="city"]').val(),
                state : $('.venue-signUp').find('select[name="state"]').val(),
                zip : $('.venue-signUp').find('input[name="zip"]').val(),
                latLng : {},
                website : $('.venue-signUp').find('input[name="venueWebsite"]').val(),
                eventDates : eventDatesList,
                summary : $('.venue-signUp').find('textarea[name="venueSummary"]').val()
            };
            
            // Add New Venue to Collection
            this.collection.add(newVenue);
            
            // Reset Collection
            this.collection.reset();

        },

        // Remove Venue Date
        removeVenueDate : function(e) {
            
            // Remove Fieldset With New Date Template
            $(e.currentTarget).parent().remove();
        
        }   

    }); // End Venue List View
 
    return VenueSignUp;

});
