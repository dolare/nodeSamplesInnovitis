'use strict';


angular.module('movieApp')
	.controller('HomeController', ['$scope', '$resource', function($scope, $resource){
    	var Vedios = $resource('/api/vedio');
    	var myobj ;
    	Vedios.query(function(vedios){
	        myobj = eval(vedios);
	    	$scope.vedios = [];
	    	for (var i = myobj.length - 1; i >= 0; i--) {
	    	/*	$scope.vedios.push(JSON.stringify(myobj[i]));*/
	    	$scope.vedios.push(myobj[i]._id);
	    		//console.log(myobj[i].name)
	    	}
   	    });
   	    
    	$scope.pomp = function(){
    		alert(myobj[0]._id);
    	}
		}])

	.controller('postPageController',['$scope', '$resource', '$location','VediosService',
    	function($scope, $resource, $location,VediosService){
/*    	var Videos = $resource('api/vedio',null,
    		{'update':{method:'put'}}).query();*/
		/*var Vedios = $resource('api/vedio');*/
        $scope.save = function(){
         /*   
            Videos.save($scope.video, function(){
                $location.path('/');
             
            });*/
			VediosService.save($scope.vedio);
			$location.path('/');
        };
    }])

    .controller('detailPageController',['$scope', '$resource', '$location','$routeParams','vediosService',
    	function($scope, $resource, $location,$routeParams,vediosService){
    		vediosService.get({id:$routeParams.id},function(vedio){
    			$scope.vedio = vedio;
    		});


    		$scope.save = function(){
    			VediosService.update($scope.vedio,function(){
    				$location.path('/');
    			});
    		};

        }]);
;