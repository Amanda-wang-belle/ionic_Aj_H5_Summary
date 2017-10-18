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

		$scope.createDownload = function(x) {
			var options = {
				method: "GET",
				filename: "_downloads/"+x.name,
				create:true
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

	})
}())