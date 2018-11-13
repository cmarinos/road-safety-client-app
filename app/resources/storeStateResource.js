'use strict';


/**
 * This module contains fields that can store state attributes, while transitioning from one route to another.
 * It can be used by views to transfer the model (state) between pages.
 * It can also be used by display information, so that they can cache their state.
 */
angular.module('app.resources.StoreStateFactory', [])
    .factory('storeStateResource', [function () {

    return {
        //used to restore the input page after submit
        inputData: undefined,

        isLoggedIn: false,

        //used to keep the state of the input page that is considered as reset
        resetData: undefined,

        extraData: undefined,

        // store results data
        resultsData: undefined,

        //keeps the params for a query
        params: {},

        //used to keep the filters data of a display query
        filtersData: undefined,

        //used to keep the display data
        displayData: undefined,

        //the error messages
        errorMessages: undefined,

        //determines the scrolling direction of the page
        scrollBackwards: false,

        //determines if we are processing a related search
        relatedSearch: false,

        relatedDirection: ''
    };
}]);
