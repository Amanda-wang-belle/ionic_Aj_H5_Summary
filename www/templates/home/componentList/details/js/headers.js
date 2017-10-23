/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-23
 * @content 标题
 */
(function() {
	'use strict'

	app.controller('headersCtrl', function($scope,$http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
			console.log($scope.dataList);
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}


		$scope.left =  "1";
		$scope.title = "1";
		$scope.showTitle = function(x){
			switch(x){
				case "1":
					$scope.title = "1";
					$scope.left =  "";
					$scope.right =  "";
					break;
				case "2":
					$scope.title = "1";
					$scope.left =  "1";
					$scope.right =  "";
					break;
				case "3":
					$scope.title = "1";
					$scope.left =  "1";
					$scope.right =  "1";
					break;
				case "4":
					$scope.title = "2"
					break;
				default:
					break;
					
			}
		}
		

	})
}())