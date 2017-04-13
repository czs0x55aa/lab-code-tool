.factory('YbTestMain', ['$q', '$resource', function ($q, $resource) {
    return $resource(host + '/api/YbTest/YbTestMain', {}, {
        Get: {
            method: 'GET',
            url: host + '/api/YbTest/YbTestMain'
        },
        Post: {
            method: 'Post',
            url: host + '/api/YbTest/YbTestMain'
        },
        Delete: {
            method: 'Delete',
            url: host + '/api/YbTest/YbTestMain'
        },
        Deletes: {
            method: 'Post',
            url: host + '/api/YbTest/YbTestMain/deletes'
        },
        
    });
}])