.factory('<< table_name >>', ['$q', '$resource', function ($q, $resource) {
    return $resource(host + '/api/Dic/<< table_name >>', {}, {
        Get: {
            method: 'GET',
            url: host + '/api/Dic/<< table_name >>'
        },
        Post: {
            method: 'Post',
            url: host + '/api/Dic/<< table_name >>'
        },
        Delete: {
            method: 'Delete',
            url: host + '/api/Dic/<< table_name >>'
        },
        Deletes: {
            method: 'Post',
            url: host + '/api/Dic/<< table_name >>/deletes'
        },
        DeleteDetail: {
            method: 'Delete',
            url: host + '/api/Dic/<< table_name >>/deleteDetail'
        },
        DeleteDetails: {
            method: 'Post',
            url: host + '/api/Dic/<< table_name >>/deleteDetails' 
        },
    });
 }])