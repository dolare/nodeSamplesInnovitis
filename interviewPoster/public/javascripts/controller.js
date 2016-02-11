angular.module('qiantai')
	.controller('headerCtrl', ['$scope', '$resource', function($scope, $resource){
		//各种function和用户检查等等

	}])

	.controller('dateCtrl', ['$scope', function($scope){
		//各种function和用户检查等等
		 $scope.dateOptions = {
		   /* changeYear: true,
		    changeMonth: true,
		    changeDay:true,
		    yearRange: '2015:-0'*/
	    };
	}])


	.controller('editCtrl', ['$scope', '$resource','articlesFact','shareData', function($scope, $resource,articlesFact,shareData){
		$scope.whichArticle = shareData.whichArticle; 
		if(shareData.isPost){
			$scope.isPost = true;
			$scope.editId = shareData.articles.length;
			shareData.isPost = false;
		}else{
			$scope.isPost = false;
			$scope.editId = $scope.whichArticle.id;
		}

		$scope.update = function(){
			var article = articlesFact.get({_id:$scope.editId});
			article.position = $scope.whichArticle.position;
			article.company = $scope.whichArticle.company;
			article.date = $scope.whichArticle.date;
			article.description = $scope.whichArticle.description;	
			article.save();		
		}
	}])


	.controller('articleTableCtrl', ['$scope', '$resource','articlesFact','shareData', function($scope, $resource,articlesFact,shareData){
		

		var restAPI = articlesFact;
		var myobj;
		var lastDetail = -1;
		$scope.showArticle = false;
		$scope.whichArticle;
		$scope.articles = [];
		$scope.fenyeAticles= [];

		function article(id,position,company,date,description){
			this.id = id;
	        this.position = position;
	        this.company = company;
	        this.date = date;	
	        this.description = description;	
		};


		restAPI.query(function(articles){
			myobj = eval(articles);
							
			for (var i = 0; i <=  myobj.length - 1; i++) {
				/*var temp = JSON.stringify(myobj[i]);
				alert(temp);
				alert(temp._id);*/
				var tempArticle = new article(myobj[i]._id,myobj[i].position,myobj[i].company,myobj[i].date,myobj[i].description);
	    		$scope.articles.push(tempArticle);
	    	}

	    	//分页初始化
	    	$scope.pageNumbers = $scope.articles.length / 10;//分页 
	    	$scope.lastPageNumber= 0;
			$scope.currentPageNumber = 1;

			for (var i = 0; i < 10 && i < $scope.articles.length; i++) {
				$scope.fenyeAticles.push($scope.articles[i])
			};

		});

		$scope.changePage = function(index){
			if(index == -1 && $scope.currentPageNumber > 1){
				$scope.currentPageNumber--;
			}else if(index == 5 && ($scope.currentPageNumber + 4) < $scope.pageNumbers){
				$scope.currentPageNumber++;
			}else if(index >= 0 && index <=4){
				$scope.currentPageNumber = $scope.currentPageNumber + index;
			}

			for (var i = 0; i < 10 && i < $scope.articles.length; i++) {
				$scope.fenyeAticles[i] = $scope.articles[i + ($scope.currentPageNumber - 1) * 10];
			};

		};

		shareData.articles = $scope.articles;

		$scope.showDetail = function(index){

			var currentIndex = index  + ($scope.currentPageNumber - 1) * 10

			if(lastDetail == currentIndex || $scope.showArticle == false){
				$scope.showArticle = !$scope.showArticle;
			}
			
			var articleId = parseInt(currentIndex);
			/*alert(articleId);*/
			$scope.whichArticle = $scope.articles[articleId];

			lastDetail = currentIndex;
		}

		$scope.edit = function(index){
			var currentIndex = index  + ($scope.currentPageNumber - 1) * 10

			var articleId = parseInt(currentIndex);
			$scope.whichArticle = $scope.articles[articleId];
			shareData.whichArticle = $scope.whichArticle;
		}

		$scope.isPost = function(){
			shareData.isPost = true;
		}

	}])

;