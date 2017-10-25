/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-24
 * @content 根据后台数据随机生成页签和各页签下相应内容
 */
(function() {
	'use strict'

	app.controller('listRandomCtrl', function($scope,$http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
			publicService.receiveJson(getData1, $scope.dataList[0].value);
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}
		
		function getData1(data) {
			$scope.dataListData = data;
			console.log($scope.dataListData);
		}
		
		$scope.slideIndex  = 0;

		$scope.go = function(index){
			$scope.slideIndex = index;
			publicService.receiveJson(getData1, $scope.dataList[index].value);
		}
		
		
		$scope.button = ["第一个 ","第二个","第三个","第四个","第五个","第六个","第七个","第八个"]
		$scope.change = function(){
			if ($(".slidePage").css("display")=="none") {
				$(".slidePage").slideDown(); // 下拉显示列表
			} else{
				$(".slidePage").slideUp(); // 收回下拉列表
			}
		}
	
	})
}())