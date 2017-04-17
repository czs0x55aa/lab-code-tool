.factory('<< table_name >>', ['$q', '$resource', function ($q, $resource) {
    return $resource(host + '/api/<< base_path >>/<< table_name >>', {}, {
        Get: {
            method: 'GET',
            url: host + '/api/<< base_path >>/<< table_name >>'
        },
        Post: {
            method: 'Post',
            url: host + '/api/<< base_path >>/<< table_name >>'
        },
        Delete: {
            method: 'Delete',
            url: host + '/api/<< base_path >>/<< table_name >>'
        },
        Deletes: {
            method: 'Post',
            url: host + '/api/<< base_path >>/<< table_name >>/deletes'
        },
        OneAudit: {
            method: 'Post',
            url: host + '/api/<< base_path >>/<< table_name >>/OneAudit'
        },
        <%- if 'Dic' in table_name %>
        DeleteDetail: {
            method: 'Delete',
            url: host + '/api/<< base_path >>/<< table_name >>/deleteDetail'
        },
        DeleteDetails: {
            method: 'Post',
            url: host + '/api/<< base_path >>/<< table_name >>/deleteDetails'
        },
        <%- endif %>
    });
}])