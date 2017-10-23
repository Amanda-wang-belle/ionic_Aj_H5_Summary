/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-14
 * @content 各种类型的底部栏
 */
(function() {
	'use strict'

	app.controller('listCtrl', function($scope,$http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
			angular.forEach($scope.dataList, function(data) {
				if(data.state == "处理中") {
					data.imgS = "received";
				} else if(data.state == "待接收") {
					data.imgS = "toReceive";
				} else {
//					data.imgS = "back";  //没有切back退回的图标，暂时用待接收代替
					data.imgS = "toReceive";
				}
			})
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
			
		}

		
	})
}())