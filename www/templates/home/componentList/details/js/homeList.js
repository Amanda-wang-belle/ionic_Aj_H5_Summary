/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-17
 * @content 各种类型的首页列表
 */
(function() {
	'use strict'

	app.controller('homeListCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data[0].list;
			console.log($scope.dataList);
			angular.forEach($scope.dataList, function(data) {
				if(data.state == "处理中") {
					data.imgS = "received";
				} else if(data.state == "待接收") {
					data.imgS = "toReceive";
				} else {
					data.imgS = "back";
				}
			})
			startloop();
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
//			$ionicHistory.goBack();
		}
		$scope.taskStyle = 1;
		$scope.changeStyle = function(index) {
			$scope.taskStyle = index;
		}

		function startloop() {
			$('#featured-area ul').roundabout({
				easing: 'easeInQuart',
				duration: 1000,
				loop: false
			});
		}
		
		/*阻止冒泡事件*/
		$scope.jumpAll = function(e){
			toastService.showToast("大列表的跳转 ");
			e.stopPropagation();
		}
		$scope.jumpInside = function(e){
			toastService.showToast("点击列表中的某一项跳转");
			e.stopPropagation();
		}

	})
}())