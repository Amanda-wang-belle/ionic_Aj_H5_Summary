/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 各种类型的弹框
 */
(function() {
	'use strict'

	app.controller('popupCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService) {
		$scope.component = $stateParams.component;

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.component.data);

		//控制tip的隐现
		$scope.showOrHide = function(x) {
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
		$scope.showToast = function(x) {
			if(x.name == "自定义toast弹框(短)" || x.name == "自定义toast弹框(长)") {
				toastService.showToast(x.data);
			} else if(x.name == "toast宽度随着由内容填充(少)" || x.name == "toast宽度随着由内容填充(多)") {
				toastService.showToast2(x.data);
			} else if(x.name == "ionicPopupConfirm确认对话框") {
				$scope.ionicPopupConfirm();
			} else if(x.name == "ionicPopupAlert提示对话框") {
				$scope.ionicPopupAlert();
			} else if(x.name == "ionicPopupShow自定义弹窗") {
				$scope.ionicPopupShow();
			}
		}
		$scope.data = {};
		// 一个确认对话框
		$scope.ionicPopupConfirm = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: '确认对话框',
				template: '<input type="password" ng-model="data.wifi">',
				scope: $scope,
			})
			confirmPopup.then(function(res) {
				if(res) {
					if(!$scope.data.wifi) {
						//不允许用户关闭，除非他键入wifi密码
						toastService.showToast('暂时没有办法控制confirm确认时候，不关闭弹框，可以用show');
					} else {
						console.log($scope.data.wifi)
						return $scope.data.wifi;
					}
				} else {
					toastService.showToast('You are not sure');
				}
			});
		};
		//提示对话框
		$scope.ionicPopupAlert = function() {
			var alertPopup = $ionicPopup.alert({
				title: '提示对话框',
				template: '这是一个提示对话框，$ionicPopup.alert'
			})
			alertPopup.then(function(res) {
				toastService.showToast('只能点击确认哟');
			})
		};
		
		// 自定义弹窗
		$scope.ionicPopupShow = function() {
			var showPopup = $ionicPopup.show({
				title: '自定义弹框',
				subTitle: '这是弹框副标题',
				template: '<input type="password" ng-model="data.wifi">',
				scope: $scope,
				buttons: [{
						text: '取消'
					},
					{
						text: '确认',
						type: 'button-positive',
						onTap: function(e) {
							if(!$scope.data.wifi) {
								//不允许用户关闭，除非他键入wifi密码
								e.preventDefault();
								toastService.showToast('不允许关闭，除非键入wifi密码');
							} else {
								return $scope.data.wifi;
							}
						}
					}
				]
			});
			showPopup.then(function(res) {
				console.log('Tapped!', res);
			})
//			$timeout(function() {
//				showPopup.close();
//			}, 2000)
		}

	})
}())