/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 各种类型的弹框
 */
(function() {
	'use strict'

	app.controller('homeListCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal,jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;
		function getData(data) {
			$scope.dataList = data;
			console.log($scope.dataList);
			angular.forEach($scope.dataList,function(data){
				if (data.state == "处理中") {
					data.imgS = "received";
				} else if (data.state == "待接收"){
					data.imgS = "toReceive";
				} else {
					data.imgS = "back";
				}
			})
			startloop();
		}
		publicService.receiveJson(getData, $scope.componentData);
		
		$scope.taskStyle = 1;
		$scope.changeStyle = function(index){
			$scope.taskStyle = index;
		}
		
		function startloop(){
			$('#featured-area ul').roundabout({
				easing: 'easeInQuart',
				duration: 1000,
				loop: false
			});
		}
		
		
	})
}())