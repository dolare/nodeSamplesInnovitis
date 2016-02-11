'use strict';
//user angular UI router

angular.module('qiantai', ['ui.date','ui.router','ngResource'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // route for the home page
            .state('index', {
                url:'/',
                views: {      
                    'header':{
                        templateUrl:'view/header.html'
                    },
                    'articleTable':{
                        templateUrl:'view/articleTable.html',
                        controller:'articleTableCtrl'
                    },
                    'footer':{
                        templateUrl:'view/footer.html'
                    }
                }

            })

            .state('index.post',{
                url:'post',
             views: {      
                   
                    'articleTable@':{
                        templateUrl:'view/edit.html',
                        controller:'editCtrl'
                    }
                    
                }
            }) 
          
          .state('index.edit',{
                url:'edit',
             views: {      
                   
                    'articleTable@':{
                        templateUrl:'view/edit.html',
                        controller:'editCtrl'
                    }
                    
                }
            });  
        $urlRouterProvider.otherwise('/');
    })
;

