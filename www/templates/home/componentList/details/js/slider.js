/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 各种类型的弹框
 */
(function() {
	'use strict'

	app.controller('sliderCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal,jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;
		$scope.slideShow = "1";
		slideShow($scope.componentTitle);
		function getData(data) {
			$scope.dataList = data;
			console.log($scope.dataList);
		}
		publicService.receiveJson(getData, $scope.componentData);
		function getData1(data) {
			$scope.buttonListSlide = data;
			console.log($scope.buttonListSlide);
		}
		publicService.receiveJson(getData1, "buttonList");
		
		
		$scope.idBottom = "";
		$scope.idTop = "";
		//控制分支内容的隐现
		$scope.showOrHide = function(x) {
			jQuerySlide.slideUp($scope.idBottom,$scope.idTop);
			$scope.buttonData = [];
			$scope.idBottom = "#idBottom" + x.value;
			$scope.idTop = "#idTop" + x.value;
			jQuerySlide.slideToggle($scope.idBottom,$scope.idTop);

		}
		
		function slideShow(title){
			switch(title){
				case "独自slide轮播":
					$scope.slideShow = 1;
					break;
				case "上下对应Ionic轮播效果":
					$scope.slideShow = 2;
					break;
				case "无导航swiper滑动":
					$scope.slideShow = 3;
					break;
				case "有导航的swiper":
					$scope.slideShow = 4;
					break;
				case "上下对应的swiper滑动":
					$scope.slideShow = 5;
					break;
				default:
					break;
			}
		}
		
		$scope.go_changed = function(index){
			toastService.showToast("这个鹿晗第"+(index+1)+"张图片");
		}
		$scope.showSlide = function(){
			var aaa = $("#slideBox").prop('autoplay');
			console.log(aaa);
		}

	})
}())