/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    map: {
        '*': {
            'underscore': 'lodash'
        }
    },    
    paths: {
        async: '../bower_components/requirejs-plugins/src/async',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore-min',
        text: '../bower_components/requirejs-text/text',
        lodash: '../bower_components/lodash/lodash',
        ldsh: '../bower_components/lodash-template-loader/loader'
    }
});