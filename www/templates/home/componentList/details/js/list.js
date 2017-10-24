/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-14
 * @content 各种类型的底部栏
 */
(function() {
	'use strict'

	app.controller('listCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide,$ionicScrollDelegate) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		/*
		 * init
		 * */
		var page = 0;
		$scope.moredata = false;
		$scope.dataList = [];
		var isLock = false; //锁，防止在网络慢的情况下多次加载

		var removeAnimation = function() {
			/*
			       页面下拉刷新，其实就是延迟更改数据
			       数据一旦被延迟更新，在Angular中我们通过$scope.$apply()进行脏数据检查，
			       然后将数据同步 ionic中，要通过广播信号的方式，
			       使用$scope.$broadcase("scroll.refreshComplete")告诉页面中的所有组件，
			       数据已经刷新完成，可以重新加载数据
       		*/
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.infiniteScrollComplete')
		}

		$scope.loadMore = function() {
			if(isLock) return;
			isLock = true;

			$http.get('json/home.json')
				.success(function(data) {
					
					removeAnimation();
					
					var dataChange = data[$scope.componentData][page].list;
					angular.forEach(dataChange, function(data) {
						if(data.state == "处理中") {
							data.imgS = "received";
						} else if(data.state == "待接收") {
							data.imgS = "toReceive";
						} else {
							data.imgS = "toReceive";
						}
					})
					
					$scope.dataList = $scope.dataList.concat(dataChange);
					console.log($scope.dataList);
					
					/*此处是json，可以如此判断，如果是调接口，需要根据后台code等做判断*/
					if(dataChange.length != 10) {
						$scope.moredata = false;
					} else {
						$scope.moredata = true;
					}
					page++;
					/*  
					 *1.使用一个定时器，为了实现当返回的DOM都加载完之后，在广播执行结束上拉加载的动作；  
					 * 2.如果不使用这个定时器，虽然数据请求回来了，但是内容还没有冲满整个屏幕，这是加载动作已经结束，它就会再自动执行一次或者多次加载，造成数据错误  
					 */
					//					var timer = $timeout(function() {
					//						// 停止广播上拉加载请求  
					//						$scope.$broadcast('scroll.infiniteScrollComplete');
					//					})
					
				}).finally(function(data) {
					isLock = false;
					removeAnimation();
				})

		}

		$scope.doRefresh = function() {
			page = 0;
			$scope.moredata = true;
			$scope.dataList = [];
			$scope.loadMore();
		}

		if(navigator.onLine) {
			//$scope.$on没起作用，没找到为什么
//			$scope.$on('$stateChangeSuccess', function() {
//				$scope.loadMore();
//			});
			$scope.loadMore();
		
		} else {
			toastService.showToast("网络异常");
		}
		//滚动到顶部
		$scope.scrollTop = function(){
			$ionicScrollDelegate.scrollTop();
//			$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
		}
		$scope.Back = function() {
			history.back(-1);
		}

	})
}())