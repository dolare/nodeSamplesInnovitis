'use strict';
//user angular UI router

angular.module('movieApp', ['ui.router','ngResource'])
	.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('movieApp', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'header.html',
                    },
                    'home': {
                        templateUrl : 'home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'footer.html'
                    }
                }

            })
            .state('postPage',{
                url:'/postPage',
                views:{
                    'postPage':{
                        templateUrl:'postPage.html',
                        controller:'postPageController'
                    }
                }
            })
            .state('detail',{
                url:'/detail/:id',
                veiws:{
                    'detail':{
                        templateUrl:'detail.html',
                       // controller:'detailPageController'
                    }
                }
            });
               
        $urlRouterProvider.otherwise('/');
    })

/*    .config(['$resourceProvider',function($resourceProvider){
         // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])*/
;

