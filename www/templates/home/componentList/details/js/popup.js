/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 各种类型的弹框
 */
(function() {
		'use strict'

		app.controller('popupCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal) {
				$scope.componentTitle = $stateParams.componentTitle;
				$scope.componentData = $stateParams.componentData;

				function getData(data) {
					$scope.dataList = data;
				}
				publicService.receiveJson(getData, $scope.componentData);

				function getData1(data) {
					$scope.modalData = data;
					console.log($scope.modalData);
				}
				publicService.receiveJson(getData1, "modalData");

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
					} else if(x.name == "actionSheet: 弹出系统选择按钮框") {
						$scope.plusNativeUIActionSheet();
					} else if(x.name == "alert: 弹出系统提示对话框") {
						$scope.plusNativeUIalert();
					} else if(x.name == "confirm1: 弹出系统确认对话框") {
						$scope.plusNativeUIconfirm1();
					} else if(x.name == "confirm2: 弹出系统确认对话框") {
						$scope.plusNativeUIconfirm2();
					} else if(x.name == "closeWaiting: 关闭系统等待对话框") {
						$scope.plusNativeUIcloseWaiting();
					} else if(x.name == "closeToast: 关闭自动消失的提示消息") {
						$scope.plusNativeUIcloseToast();
					} else if(x.name == "pickDate: 弹出系统日期选择对话框") {
						$scope.plusNativeUIpickDate();
					} else if(x.name == "pickTime: 弹出系统时间选择对话框") {
						$scope.plusNativeUIpickTime();
					} else if(x.name == "prompt: 弹出系统输入对话框") {
						$scope.plusNativeUIprompt();
					} else if(x.name == "toast: 显示自动消失的提示消息") {
						$scope.plusNativeUItoast();
					}
				}
				/**
				 *各种弹框 
				 */
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

				/**
				 *向上的滑动面板
				 */
				$scope.ionicActionSheetShow = function() {
					var hideSheet = $ionicActionSheet.show({
						buttons: [{
								text: '<b>Share</b> This'
							},
							{
								text: 'Move'
							},
							{
								text: 'Three'
							}
						],
						destructiveText: 'Delete',
						//                    titleText: 'Modify your album',
						cancelText: 'Cancel',
						cancel: function() {
							//                         toastService.showToast('close the actionSheet,you can stop me in the code');
						},
						buttonClicked: function(index) {
							switch(index) {
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
				/**
				 *plus.nativeUi
				 * nativeUI管理系统原生界面，可用于弹出系统原生提示对话框窗口、时间日期选择对话框、等待对话框等。
				 */
				$scope.plusNativeUIActionSheet = function() {
					plus.nativeUI.actionSheet({
						title: 'actionSheet',
						cancel: '取消',
						buttons: [{
							title: "1"
						}, {
							title: "2"
						}]
					}, function() {
						toastService.showToast("User pressed: " + e.index);
					});
				}
				$scope.plusNativeUIalert = function() {
					plus.nativeUI.alert('alert的内容', function() {
						toastService.showToast("关闭alert弹框之后执行的方法")
					}, 'alert的标题', 'alert的按钮');
				}
				//		Android - 2.2+ (支持): 对话框上最多只能支持三个按钮，buttons参数超过三个的值则忽略。
				//		iOS - 4.5+ (支持)
				$scope.plusNativeUIconfirm1 = function() {
					plus.nativeUI.confirm('button数组（不建议使用）', function(e) {
						toastService.showToast((e.index == 0) ? "Yes!" : "No!");
					}, "confirm1", ["确认", "取消"]);
				}
				$scope.plusNativeUIconfirm2 = function() {
					plus.nativeUI.confirm('options(建议使用)', function(e) {
						toastService.showToast((e.index == 0) ? "Yes!" : "No!");
					}, {
						"title": "confirm2",
						"buttons": ["确认", "取消"],
						"verticalAlign": "bottom"
					});
				}
				$scope.plusNativeUIcloseWaiting = function() {
					plus.nativeUI.showWaiting("等待中...");
					setTimeout(function() {
						plus.nativeUI.closeWaiting();
					}, 3000);
				}
				$scope.plusNativeUIcloseToast = function() {
					plus.nativeUI.toast("<font style=\"font-size:14px\">再按一次返回键退出<br/>点此可<a onclick=\"console.log('clicked');plus.nativeUI.closeToast();\">关闭此也main</a></font>",
						{
							type: 'richtext',
							duration: 'long',
							richTextStyle: {
								align: 'center'
							}
						})
					}
					$scope.plusNativeUIpickDate = function() {
						var d=new Date(); //minDate: (Date 类型 )日期选择对话框可选择的最小日期
						d.setFullYear(2010,0,1);
						plus.nativeUI.pickDate(function(e) {
							var d = e.date;
							toastService.showToast("选择的日期: " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
						}, function(e) {
							toastService.showToast("未选择日期" + e.message);
						},{minDate:d});
					}
					$scope.plusNativeUIpickTime = function() {
						plus.nativeUI.pickTime(function(e) {
							var d = e.date;
							console.log("选择的时间：" + d.getHours() + ":" + d.getMinutes());
						}, function(e) {
							console.log("未选择时间：" + e.message);
						});
					}
					$scope.plusNativeUIprompt = function(){
						plus.nativeUI.prompt("input your name:",function(e){
							toastService.showToast(((e.index == 0)?"确定：":"取消：")+e.value);
						},"promptTitle","input tip your name",["确定","取消"]);
					}

					/**
					 *模态框
					 */
					$ionicModal.fromTemplateUrl('my-modal.html', {
						scope: $scope,
						animation: 'slide-in-up'
					}).then(function(modal) {
						$scope.modal = modal;
					})
					$scope.openModal = function() {
						$scope.modal.show();
						$(".arrow").css('display', 'none');
					}
					$scope.closeModal = function() {
						$scope.modal.hide();
					}
					//当我们用到模型时，清除它
					$scope.$on('$destory', function() {
						$scope.modal.remove();
					});
					//当隐藏的模型时执行动作
					$scope.$on('modal.hide', function() {
						//执行动作
					});
					//当移动模型时执行动作
					$scope.$on('modal.removed', function() {
						//执行动作
					})

					//返回按钮
					$scope.Back = function() {
						//			$ionicHistory.goBack();
						history.back(-1);
					}
					/*一个小玩笑*/
					$scope.guestWhere = function() {
						toastService.showToast("*′∀`)′∀`)*′∀`)*′∀`)，猜猜模态框在哪");
						$(".arrow").css('display', 'block');
					}

				})
		}())