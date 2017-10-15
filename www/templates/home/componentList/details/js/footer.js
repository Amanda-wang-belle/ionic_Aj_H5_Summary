/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 各种类型的弹框
 */
(function() {
	'use strict'

	app.controller('footerCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal) {
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
			slideUp() ;
			$scope.buttonData = [];
			if(x.value == "1") {
				$scope.footerIndex = 1;
			} else {
				$scope.idBottom = "#idBottom" + x.value;
				$scope.idTop = "#idTop" + x.value;
				if($($scope.idBottom).css('display') == 'block') {
					slideUp();
				} else {
					slideDown();
				}
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
		//收起下拉内容
		function slideUp() {
			$($scope.idBottom).slideUp();
			$($scope.idTop).removeClass("ion-ios-arrow-up");
			$($scope.idTop).addClass("ion-ios-arrow-down");
			$scope.idBottom = "";
			$scope.idTop = "";
		}
		//放下下拉内容
		function slideDown(){
			$($scope.idBottom).slideDown();
			$($scope.idTop).removeClass("ion-ios-arrow-down");
			$($scope.idTop).addClass("ion-ios-arrow-up");
		}
		
		//显示不同的footer
		$scope.showFooter = function(x, y) {
			showDifFooter(x.value);
			$scope.buttonData = $scope.buttonDataAll.slice(0, y.value);
			console.log($scope.buttonData);
		}

	})
}())