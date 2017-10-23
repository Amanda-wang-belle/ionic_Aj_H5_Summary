/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-17
 * @content 图片上传
 */
(function() {
	'use strict'

	app.controller('versionUpdateCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide, locals,httpService) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}

		/*******************版本检测****************************/
		var osname; // 设备os
		var content;
		var androidDownLoad;
		var iosDownLoad;
		var version;
		if(window.plus) {
			version = plus.runtime.version;
			osname = plus.os.name;
		}
		var dtask = null;

		function createDownloadTask(url) {
			//			if(dtask) {
			//				return;
			//			}
			if(window.plus) {
				var options = {
					method: "GET"
				};
				dtask = plus.downloader.createDownload(url, options, function(d, status) {
					// 下载完成
					if(status == 200) {
						//打开文件安装
						plus.runtime.openFile(d.filename, function(e) {
							//							console.log(e);
						});
						plus.runtime.quit();
						//					plus.runtime.install(d.filename, {}, function() {
						//						plus.nativeUI.alert("更新成功, 正在重启!", function() {
						//							plus.runtime.restart();
						//						});
						//					}, function(e) {
						//						$ionicLoading.show({
						//							template: "更新失败！"
						//						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 1000);
						//					});
					} else {
						$ionicLoading.show({
							template: "下载失败！"
						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 1000);
					}
				});
				dtask.start();
				dtask.addEventListener("statechanged", function(task, status) {
					switch(task.state) {
						case 1: // 开始
							$ionicLoading.show({
								template: "开始下载..."
							});
							console.log("开始");
							break;
						case 2: // 已连接到服务器
							$ionicLoading.show({
								template: "链接到服务器..."
							});
							break;
						case 3: // 已接收到数据
							$ionicLoading.show({
								//template: "已经下载：" + task.downloadedSize + "/" + task.totalSize
								template: "已经下载：" + (task.downloadedSize / dtask.getResponseHeader("Length") * 100).toFixed(0) + "%"

							});
							break;
						case 4: // 下载完成
							//						$ionicLoading.show({
							//							template: "下载完成！"
							//						});
							$timeout(function() {
								$ionicLoading.hide();
							}, 1000);
							break;
					}
				});
			}

		}

		function showUpdateAndroid() {
			var confirmPopup = $ionicPopup.confirm({
				title: '版本升级',
				template: "不更新将无法继续使用！", //从服务端获取更新的内容
				cancelText: '退出',
				cancelType: 'colorRed',
				okText: '升级'
			});
			confirmPopup.then(function(res) {
				if(res) {
					//	                	console.log(androidDownLoad);
					createDownloadTask(androidDownLoad);
				} else {
					// 取消更新
					plus.runtime.quit();
				}
			});
		}

		function showUpdateiOS() {
			var confirmPopup = $ionicPopup.show({
				template: "不更新将无法继续使用！",
				title: '版本升级',
				buttons: [{
					text: '升级',
					type: 'button-positive',
					onTap: function(e) {
						//跳转到appstore ，如果不上架，则跳转plist下载页面 
						var url = iosDownLoad;
						plus.runtime.openURL(url);
						e.preventDefault();
					}
				}, ]
			});
		}

		function updatereturn(code) {
			switch(code) {
				//是最新版本
				case "0":
					plus.nativeUI.toast("当前已经是最新版本");
					break;
				case "1":
					if('iOS' == osname) {
						showUpdateiOS();
					}
					if("Android" == osname) {
						showUpdateAndroid();
					}
					break;
				default:
					plus.nativeUI.toast("当前已经是最新版本");
					break;
			}
		}

		//调接口，将当前版本号发给后台，通过后台反馈是否需要更新
		//如果需要更新，反馈安卓和Ios的下载地址
		var postdata = function(version) {
			var method = "";
			var url = "";
			var params = {};
			params.version = version;
			// 请求接口
			var promise = httpService.postStringReceiveJson(method, url, params);
			promise.then(
				function(data) {
					//						console.log(data.data.dbrw.iosUrl);
					//						console.log(data.data.dbrw.apkUrl);
					if("1" == data.data.state) {
						// 1更新 0不更新
						updatereturn(data.data.state);
						iosDownLoad = data.data.dbrw.iosUrl;
						androidDownLoad = data.data.dbrw.apkUrl;
					} else if("0" == data.data.state) {
						updatereturn(data.data.state);
					} else if("2" == data.data.state) {
						plus.nativeUI.toast(data.data.message);
					} else {
						plus.nativeUI.toast("服务器异常!");
					}
				},
				function(data) { // 处理错误 .reject
					plus.nativeUI.toast("请求失败!");
				}
			);
		};
		//版本检测按钮
		$scope.bbjc = function() {
			if(navigator.onLine) {
				//				createDownloadTask("http://192.168.132.95:8080/lbms/dc/SmsFlowAction.do?operAtt=downLoadForAndroid&param={'url':'D:/sfa.apk'}");
				//				createDownloadTask("http://192.168.132.57:9080/shyc-service/file/appDownLoad.do?urlId=D:/H5024169B_0503140327.apk");
				postdata(version);
			} else {
				plus.nativeUI.toast("网络异常!");
			}
		}

	})
}())