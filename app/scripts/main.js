//************************
// Main JS File
//************************
'use strict';

require([
    'jquery',
    'lodash',
    'backbone',
    'VenueModels/venueModels',
    'VenueCollections/venueCollections',
    'venuesList/venuesList',
    'venueSignUp/venueSignUp',
], function ($, _, Backbone, VenueModels, VenueCollections, VenuesList, VenueSignUp) {

    // Some Venues
    var someVenues = [ 
        {
            id : 1,
            firstName : 'Mister', 
            lastName : 'Jones', 
            address : '48 Allston Street', 
            city : 'Boston', 
            state : 'MA', 
            zip : '02134', 
            phoneNumber : '888-100-2018',
            venue : 'Royale', 
            eventDate : '07/21/2015', 
            summary : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus sunt eligendi consectetur ab natus iusto obcaecati temporibus nisi explicabo adipisci quia amet ullam maiores culpa cumque ipsum consequuntur nulla neque.'
        },    
        {
            id : 2,
            firstName : 'Rick',
            lastName : 'James', 
            address : '48 Orchard Street', 
            city : 'Boston', 
            state : 'MA', 
            zip : '02134',
            phoneNumber : '381-399-1999', 
            venue : 'House of Blues', 
            eventDate : '06/11/2015', 
            summary : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus sunt eligendi consectetur ab natus iusto obcaecati temporibus nisi explicabo adipisci quia amet ullam maiores culpa cumque ipsum consequuntur nulla neque.'
        }

    ];

    // Document Ready
    $(function(){
        
        // Create New Venue Model
        var venue = new VenueModels.Models.Venue({}),
        
        // Create New Venues Collection
        venues = new VenueCollections.Collections.Venues({
            model : venue
        }),


        // Venue Sign Up
        venueForm = new VenueSignUp.Views.VenueForm({
            el : $('div.venueSignUp'),
            model : venue,
            collection : venues
        }),

        // Venue List
        venuesList = new VenuesList.Views.VenuesList({
            el : $('div.venuesList'),
            model : venue,
            collection : venues
        });

       
        // Reset Venues Collection, Add Data
        venues.reset(someVenues);
        
        // Venue Sign Up Render
        venueForm.render({el: $('div.venueSignUp'), model: venue, collection: venues});
        
        // Venue List Render
        venuesList.render({collection : venues}).el;

        venues.on('change', function(){
            alert('change!');
        })


    }) // End Doc Ready  

    Backbone.history.start();
});
