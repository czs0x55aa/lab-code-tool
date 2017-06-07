.factory('StripsProcessTest', ['$q', '$resource', function ($q, $resource) {
    return $resource(host + '/api/Quality/StripsProcessTest', {}, {
        Get: {
            method: 'GET',
            url: host + '/api/Quality/StripsProcessTest'
        },
        Post: {
            method: 'Post',
            url: host + '/api/Quality/StripsProcessTest'
        },
        Delete: {
            method: 'Delete',
            url: host + '/api/Quality/StripsProcessTest'
        },
        Deletes: {
            method: 'Post',
            url: host + '/api/Quality/StripsProcessTest/deletes'
        },
        Audit: {
            method: 'Post',
            url: host + '/api/Quality/StripsProcessTest/Audit'
        },
    });
}])
﻿.factory('TobaccoProcessTest', ['$q', '$resource', function ($q, $resource) {
    return $resource(host + '/api/Quality/TobaccoProcessTest', {}, {
        Get: {
            method: 'GET',
            url: host + '/api/Quality/TobaccoProcessTest'
        },
        Post: {
            method: 'Post',
            url: host + '/api/Quality/TobaccoProcessTest'
        },
        Delete: {
            method: 'Delete',
            url: host + '/api/Quality/TobaccoProcessTest'
        },
        Deletes: {
            method: 'Post',
            url: host + '/api/Quality/TobaccoProcessTest/deletes'
        },
        Audit: {
            method: 'Post',
            url: host + '/api/Quality/TobaccoProcessTest/Audit'
        },
    });
}])