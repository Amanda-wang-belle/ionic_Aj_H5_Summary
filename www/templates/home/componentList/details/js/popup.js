/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 各种类型的弹框
 */
(function() {
	'use strict'

	app.controller('popupCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet) {
		$scope.component = $stateParams.component;

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.component.data);

		//控制分支内容的隐现
		$scope.showOrHide = function(x) {
			if(x.name == "$ionicActionSheet向上滑动的面板") {
				$scope.ionicActionSheetShow();
			} else {
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
		$scope.showToast = function(x) {
			if(x.name === "自定义toast弹框(短)" || x.name === "自定义toast弹框(长)") {
				toastService.showToast(x.data);
			} else if(x.name === "toast宽度随着由内容填充(少)" || x.name === "toast宽度随着由内容填充(多)") {
				toastService.showToast2(x.data);
			} else if(x.name === "ionicPopupConfirm确认对话框") {
				$scope.ionicPopupConfirm();
			} else if(x.name === "ionicPopupAlert提示对话框") {
				$scope.ionicPopupAlert();
			} else if(x.name === "ionicPopupShow自定义弹窗") {
				$scope.ionicPopupShow();
			} else if(x.name == "一定时间后消失的弹框") {
				$scope.displayPop();
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
						$scope.ionicPopupConfirm();
						//不允许用户关闭，除非他键入wifi密码
						toastService.showToast('不允许用户关闭，除非他键入wifi密码');
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

		$scope.displayPop = function() {
			var displayPop = $ionicPopup.alert({
				template: '我会在2秒钟之后消失哟'
			})
			$timeout(function() {
				displayPop.close();
			}, 2000)
		}

		//向上的滑动面板
		$scope.ionicActionSheetShow = function() {
			 var hideSheet = $ionicActionSheet.show({
                      buttons: [
                        { text: '<b>Share</b> This' },
                        { text: 'Move' },
                        { text: 'Three' }
                      ],
                      destructiveText: 'Delete',
//                    titleText: 'Modify your album',
                      cancelText: 'Cancel',
                      cancel: function() {
//                         toastService.showToast('close the actionSheet,you can stop me in the code');
                         },
                      buttonClicked: function(index) {
                      	switch(index){
                      		case 0:
                      			toastService.showToast("you tap <b>Share</b> This");
                      			break;
                      		case 1:
                      			toastService.showToast('你如果不想让我2s之后所辖区，可修改代码$timeout');
                      			break;
                      		case 2:
                      			toastService.showToast('Three');
                      			break;
                      	}
                        
                      }
                  });

                  $timeout(function() {
                      hideSheet();
                  }, 2000);
		}

	})
}())