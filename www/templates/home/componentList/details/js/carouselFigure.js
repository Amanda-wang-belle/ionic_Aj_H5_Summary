/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-15
 * @content 轮播图列表
 */
(function() {
	'use strict'

	app.controller('carouselFigureCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide, publicJump) {
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

		function getData1(data) {
			$scope.buttonDataAll = data;
		}
		publicService.receiveJson(getData1, "buttonData");

		$scope.idBottom = "";
		$scope.idTop = "";
		//控制分支内容的隐现
		$scope.showOrHide = function(x) {
			jQuerySlide.slideUp($scope.idBottom, $scope.idTop);
			$scope.buttonData = [];
			$scope.idBottom = "#idBottom" + x.value;
			$scope.idTop = "#idTop" + x.value;
			jQuerySlide.slideToggle($scope.idBottom, $scope.idTop);

		}

		$scope.toDetail = function(x) {
			publicJump.jumpTo(x);
		}

	})
}())