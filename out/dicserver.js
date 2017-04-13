.factory('YbTestMain', ['$q', '$resource', function ($q, $resource) {
    return $resource(host + '/api/Dic/YbTestMain', {}, {
        Get: {
            method: 'GET',
            url: host + '/api/Dic/YbTestMain'
        },
        Post: {
            method: 'Post',
            url: host + '/api/Dic/YbTestMain'
        },
        Delete: {
            method: 'Delete',
            url: host + '/api/Dic/YbTestMain'
        },
        Deletes: {
            method: 'Post',
            url: host + '/api/Dic/YbTestMain/deletes'
        },
        DeleteDetail: {
            method: 'Delete',
            url: host + '/api/Dic/YbTestMain/deleteDetail'
        },
        DeleteDetails: {
            method: 'Post',
            url: host + '/api/Dic/YbTestMain/deleteDetails' 
        },
    });
 }])