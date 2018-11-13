/**
 *
 */
angular.module('app.common.utilities.Constants', [])
    .constant('Constants', {
        Time: {
            DAY: 86400000,
            WEEK: 7 * 86400000,
            MONTH: 30 * 86400000,
            YEAR: 12 * 30 * 86400000
        },
        General: {
            FILTER_DISPLAY_THRESHOLD: 100,
            MAX_FILE_SIZE_FOR_UPLOAD: 1024 * 1024,
            SLIDE_ANIMATION_DURATION: 400
        },
        Rest: {
            LOCAL_API_URL: '/assets/data',
            API_URL: 'http://localhost:3000'
        },
        ResponseCodes: {
            SUCCESS: 200,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403
        },
        SortDirection: {
            ASC: "asc",
            DESC: "desc"
        },
        Topic: {
            RISK_FACTOR: "RISK FACTOR",
            COUNTERMEASURE: "COUNTERMEASURE"
        },
        Level: {
            "ZERO": 0,
            "ONE": 1,
            "TWO": 2
        },
        WP: {
            Behavior: "WP4",
            Infrastructure: "WP5",
            Vehicle: "WP6",
            Post_Impact_Care: "WP7"
        },
        Related: {
            RISKS_TO_MEASURES: "RISKS_TO_MEASURES",
            MEASURES_TO_RISKS: "MEASURES_TO_RISKS"
        }
    });