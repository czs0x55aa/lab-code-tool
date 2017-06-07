.factory('StripsProcessTest', ['$q', '$resource', function ($q, $resource) {
    return $resource(host + '/api/Dic/StripsProcessTest', {}, {
        Get: {
            method: 'GET',
            url: host + '/api/Dic/StripsProcessTest'
        },
        Post: {
            method: 'Post',
            url: host + '/api/Dic/StripsProcessTest'
        },
        Delete: {
            method: 'Delete',
            url: host + '/api/Dic/StripsProcessTest'
        },
        Deletes: {
            method: 'Post',
            url: host + '/api/Dic/StripsProcessTest/deletes'
        },
        DeleteDetail: {
            method: 'Delete',
            url: host + '/api/Dic/StripsProcessTest/deleteDetail'
        },
        DeleteDetails: {
            method: 'Post',
            url: host + '/api/Dic/StripsProcessTest/deleteDetails' 
        },
    });
 }])
﻿.factory('TobaccoProcessTest', ['$q', '$resource', function ($q, $resource) {
    return $resource(host + '/api/Dic/TobaccoProcessTest', {}, {
        Get: {
            method: 'GET',
            url: host + '/api/Dic/TobaccoProcessTest'
        },
        Post: {
            method: 'Post',
            url: host + '/api/Dic/TobaccoProcessTest'
        },
        Delete: {
            method: 'Delete',
            url: host + '/api/Dic/TobaccoProcessTest'
        },
        Deletes: {
            method: 'Post',
            url: host + '/api/Dic/TobaccoProcessTest/deletes'
        },
        DeleteDetail: {
            method: 'Delete',
            url: host + '/api/Dic/TobaccoProcessTest/deleteDetail'
        },
        DeleteDetails: {
            method: 'Post',
            url: host + '/api/Dic/TobaccoProcessTest/deleteDetails' 
        },
    });
 }])