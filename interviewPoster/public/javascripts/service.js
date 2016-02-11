'use strict';

angular.module('qiantai')

        .factory('articlesFact',['$resource',function($resource) {
        	/*return $resource('/api/vedio');*/
            return $resource('/api/articles',null,
            {
                'update':{method:'put'},
                'creat':{method:'post'}
            });
        }])

        .factory('shareData',[function() {
            var data = {
                isPost:false,
                articles:{},
                whichArticle:[]
            };
            
            return data;
        }])

     
;

