/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-14
 * @content 各种类型的底部栏
 */
(function() {
	'use strict'

	app.controller('footerCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal,jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.componentData);

		function getData1(data) {
			$scope.buttonDataAll = data;
		}
		publicService.receiveJson(getData1, "buttonData");

		$scope.footerIndex = 1;
		$scope.idBottom = "";
		$scope.idTop = "";
		//控制分支内容的隐现
		$scope.showOrHide = function(x) {
			jQuerySlide.slideUp($scope.idBottom,$scope.idTop);
			$scope.buttonData = [];
			if(x.value == "1") {
				$scope.footerIndex = 1;
			} else {
				$scope.idBottom = "#idBottom" + x.value;
				$scope.idTop = "#idTop" + x.value;
				jQuerySlide.slideToggle($scope.idBottom,$scope.idTop);
				showDifFooter(x.value);
			}

		}
		//显示三个不同大页签的底部栏
		function showDifFooter(value){
			if(value == "2") {
				$scope.footerIndex = 2;
			} else {
				$scope.footerIndex = 3;
			}
		}
		
		//显示不同的footer
		$scope.showFooter = function(x, y) {
			showDifFooter(x.value);
			$scope.buttonData = $scope.buttonDataAll.slice(0, y.value);
			console.log($scope.buttonData);
		}

	})
}())