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
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}


	
	})
}())