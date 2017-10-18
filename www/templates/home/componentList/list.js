/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 构件列表
 */
(function() {
	'use strict'

	app.controller('componentListCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicJump, publicService, locals,userService,$rootScope) {
		
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}

		$scope.toDetail = function(x) {
			publicJump.jumpTo(x);

		}

	})
}())