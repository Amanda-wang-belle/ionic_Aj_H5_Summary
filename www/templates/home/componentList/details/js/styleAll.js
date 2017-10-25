/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-14
 * @content 各种类型的底部栏
 */
(function() {
	'use strict'

	app.controller('styleAllCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {

		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;
		
		
		var nowTime = new Date();
		$("#startDate").val(nowTime);
		$("#endDate").val(nowTime);
		$scope.dataList = {
			"proName": "",
			"proMoney": "0.00",
			"sartDate": nowTime,
			"month": "10",
			"proNumbber": "18",
			"endDate": nowTime,
			"retMethod": "00",
			"proRate": "0.000",
			"height": "0",
			"rate": "00"
		}

		function getData(data) {
			$scope.dataList = data;
			console.log($scope.dataList);
			$("#startDate").val($scope.dataList.startDate);
			$("#endDate").val($scope.dataList.endDate);
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}
		
		$scope.save = function(){
			console.log($scope.dataList.proName);
			toastService.showToast("保存成功");
		}

	})
}())