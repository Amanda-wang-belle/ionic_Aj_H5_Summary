/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-11-1
 * @content 列表的新增删除保存
 */
(function() {
	'use strict'

	app.controller('listAddDelCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}

		$scope.dataList = [{
			"name": "姓名",
			"value": ""
		}, {
			"name": "性别",
			"value": ""
		}, {
			"name": "部门",
			"value": ""
		}, {
			"name": "号码",
			"value": ""
		}]

		//移动
		$scope.moveItem = function(item, fromIndex, toIndex) {
			//把该项移动到数组中
			$scope.dataList.splice(fromIndex, 1);
			$scope.dataList.splice(toIndex, 0, item);
		};
		//删除
		$scope.onItemDelete = function(item) {
			$scope.dataList.splice($scope.dataList.indexOf(item), 1);
		};
		//增加列表
		$scope.addList = function() {
			var dataList1 = [{
				"name": "姓名",
				"value": ""
			}, {
				"name": "性别",
				"value": ""
			}, {
				"name": "部门",
				"value": ""
			}, {
				"name": "号码",
				"value": ""
			}]
			$scope.dataList.push(dataList1);
		}
		//左滑操作
		$scope.edit = function(x){
			toastService.showToast("you want to edit "+$scope.dataList.indexOf(x));
		}
		$scope.share = function(x){
			toastService.showToast("you want to edit "+$scope.dataList.indexOf(x));
		}
	})
}())