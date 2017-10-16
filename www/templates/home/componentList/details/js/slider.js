/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 各种类型的弹框
 */
(function() {
	'use strict'

	app.controller('sliderCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal,jQuerySlide,$ionicSlideBoxDelegate) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;
		
		function getData(data) {
			$scope.dataList = data;
			console.log($scope.dataList);
		}
		publicService.receiveJson(getData, $scope.componentData);
		function getData1(data) {
			$scope.buttonListSlide1 = data.slice(0,8);
			$scope.buttonListSlide2 = data.slice(8,11);
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
		
		/******************ion-slide-box*****************************/
		$scope.doesContinue = true; //是否循环切换 
		$scope.autoPlay = true;  //是否自动播放,默认4000ms
		$scope.slideInterval = 5000; //自动播放的间隔时间
		$scope.showPager = true;   //是否显示分页器
		
		$scope.slideIndex = 0;
		//on-slide-changed  幻灯页切换事件
		$scope.go_changed = function(index){
			$scope.slideIndex = index;
			toastService.showToast("这个鹿晗第"+(index+1)+"张图片");
		}
		//pager-click - 分页器点击事件
		$scope.go = function(index){
			 $ionicSlideBoxDelegate.slide(index);  
		}
		$scope.showSlide = function(value){
			toastService.showToast("本人暂时无法通过事件改变ion-slide-box的does-continue等属性，希望各位可以提出好的建议");
		}
		

	})
}())