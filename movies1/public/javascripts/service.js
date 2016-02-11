'use strict';

angular.module('movieApp')

        .factory('VediosService',['$resource',function($resource) {
        	return $resource('/api/vedio');
        }])

        .factory('vedioService',['$resource',function($resource) {
        	return $resource('/api/videos/:id', { id: '@_id' }, {
        		update: { method: 'PUT' }
    		});
        }])
;

