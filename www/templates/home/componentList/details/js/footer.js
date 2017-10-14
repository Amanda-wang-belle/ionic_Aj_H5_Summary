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

		$scope.footerIndex = 0;
		//控制分支内容的隐现
		$scope.showOrHide = function(x) {
			if(x.value == "1") {
				$scope.footerIndex = 0;
			} else {
				$scope.footerIndex = 1;
				var idBottom = "#idBottom" + x.value;
				var idTop = "#idTop" + x.value;
				if($(idBottom).css('display') == 'block') {
					$(idBottom).slideUp();
					$(idTop).removeClass("ion-ios-arrow-up");
					$(idTop).addClass("ion-ios-arrow-down");
				} else {
					$(idBottom).slideDown();
					$(idTop).removeClass("ion-ios-arrow-down");
					$(idTop).addClass("ion-ios-arrow-up");
				}
			}

		}
		
		

	})
}())