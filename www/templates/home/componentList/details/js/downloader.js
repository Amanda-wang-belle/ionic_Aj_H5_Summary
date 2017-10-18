/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-14
 * @content 各种类型的底部栏
 */
(function() {
	'use strict'

	app.controller('downloaderCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide, $ionicLoading) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}
		$scope.file = {
			"name":"",
			"value":""
		}
		$scope.createDownload = function(x) {
			var options = {
				method: "GET",
				filename: "_downloads/" + x.name,
				create: true
			};
			var url = x.value;
			var dtask = plus.downloader.createDownload(url, options, function(d, status) {
				// 下载完成
				if(status == 200) {
					toastService.showToast(x.name + "下载成功");
					plus.runtime.openFile(d.filename, {}, function() {
						plus.nativeUI.toast('打开失败!');
						$timeout(function() {
							$ionicLoading.hide();
						}, 1000);
					});
				} else {
					plus.nativeUI.toast("Download failed: " + status);
				}
			});
			dtask.start();
			dtask.addEventListener("statechanged", function(task, status) {
				if(!dtask) {
					return;
				}
				switch(task.state) {
					case 1: // 开始
						$ionicLoading.show({
							template: "开始下载..."
						});
						break;
					case 2: // 已连接到服务器
						$ionicLoading.show({
							template: "链接到服务器..."
						});
						break;
					case 3: // 已接收到数据
						$ionicLoading.show({
							//template: "已经下载：" + task.downloadedSize + "/" + task.totalSize
							//							template: "已经下载：" + (task.downloadedSize/task.totalSize*100).toFixed(0)+"%"
							template: "正在下载..."

						});
						break;
					case 4: // 下载完成
						$ionicLoading.show({
							template: "下载完成！"
						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 1000);
						break;
				}
			})
		}

		$scope.getfile = function(x) {
			var relativePath = "_downloads/" + x.name;
			plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
				plus.nativeUI.toast("文件已经存在");
				plus.runtime.openFile(relativePath, {}, function() {
					plus.nativeUI.toast('打开失败!');
				});
			}, function(e) {
				$scope.createDownload(x);
			});
		}
		
		
		//清除所有下载任务
		$scope.clearall = function(){
			plus.downloader.clear();
		}

	})
}())