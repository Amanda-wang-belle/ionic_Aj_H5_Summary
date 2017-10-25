/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-14
 * @content 各种类型的底部栏
 */
(function() {
	'use strict'

	app.controller('slideUpDownCtrl', function($scope,$http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
			$scope.dataList1 = $scope.dataList.list1;
			$scope.dataList2 = $scope.dataList.list2;
			
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}

		$scope.slide1 = function(){
			if ($(".slide1").css("display")=="none") {
				$(".slide1").slideDown(); // 下拉显示列表
			} else{
				$(".slide1").slideUp(); // 收回下拉列表
			}
		}
		$scope.slide2 = function(){
			if ($(".slide2").css("display")=="none") {
				$(".slide2").slideDown(); // 下拉显示列表
			} else{
				$(".slide2").slideUp(); // 收回下拉列表
			}
		}
		$scope.slide3 = function(){
			if ($(".slide3").css("display")=="none") {
				$(".slide3").slideDown(); // 下拉显示列表
			} else{
				$(".slide3").slideUp(); // 收回下拉列表
			}
		}
		$scope.slide4 = function(){
			if ($(".slide4").css("display")=="none") {
				$(".slide4").slideDown(); // 下拉显示列表
			} else{
				$(".slide4").slideUp(); // 收回下拉列表
			}
		}

	})
}())