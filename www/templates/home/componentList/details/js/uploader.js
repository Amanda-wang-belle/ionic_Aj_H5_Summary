/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-17
 * @content 图片上传
 */
(function() {
	'use strict'

	app.controller('uploaderCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}

		//传给后台
		$scope.pictureUp = []
		//页面显示
		$scope.pictureShow = [];
		var localurl;

		$scope.captureCamera = function() {
			var cmr = plus.camera.getCamera();
			var res = cmr.supportedImageResolutions[0];
			var fmt = cmr.supportedImageFormats[0];
			//			console.log("Resolution: " + res + ", Format: " + fmt);
			cmr.captureImage(function(p) {

					//					console.log(p);
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						localurl = entry.fullPath; //把拍照的目录路径，变成本地url路径，例如file:///........之类的。
						console.log("变成本地路径了");

						appendFile(localurl);
						console.log(localurl);
					}, function(e) {
						plus.nativeUI.toast(e.message);
					});

				},
				function(error) {
					plus.nativeUI.toast("拍照失败！")
				}, {
					resolution: res,
					format: fmt
				}
			);
		}
		// 拍照或从相册选择
		$scope.captureImage = function() {

			var hideSheet = $ionicActionSheet.show({
				buttons: [{
						text: '拍照'
					},
					{
						text: '从相册选择'
					}
				],
				cancelText: '取消',
				cancel: function() {
					hideSheet();
				},
				buttonClicked: function(index) {
					if(0 == index) {
						$scope.captureCamera();
					} else if(1 == index) {
						galleryImg();
					}
					return true;
				}
			});
		}

		// 从相册中选择图片 
		function galleryImg() {
			// 从相册中选择图片
			//			console.log("从相册中选择图片:");
			plus.gallery.pick(function(path) {

				console.log(path);
				localurl = path;
				console.log("从相册中选择图片");
				appendFile(path);
			}, function(e) {
				console.log("取消选择图片");
			}, {
				filter: "image"
			});
		}

		// 添加文件
		var imgSrc = null;

		/*老方法*/
		function appendFile(path) {
			var img = new Image();
			img.src = path; // 传过来的图片路径在这里用。
			var secret11 = userService.get("X-AUTH-TOKEN");
			img.onload = function() {
				userService.set("X-AUTH-TOKEN", secret11);
				var that = this;
				//生成比例 
				var w = that.width,
					h = that.height,
					//					scale = w / h;
					scale = 296 / 360;
				w = 800 || w; //480  你想压缩到多大，改这里
				h = w * scale;
				//				console.log(w);
				//				console.log(h);
				//生成canvas
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				$(canvas).attr({
					width: w,
					height: h
				});
				ctx.drawImage(that, 0, 0, w, h);
				var base64 = canvas.toDataURL('image/png', 1 || 1); //1最清晰，越低越模糊。有一点不清楚这里明明设置的是jpeg。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
				imgSrc = base64.replace("data:image/png;base64,", ""); // 把base64数据丢过去，上传要用。

				var data = [{
					"image": imgSrc
				}]
				////					
				$scope.pictureUp = $scope.pictureUp.concat(data);
				//				console.log(JSON.stringify($scope.pictureUp))

				$scope.pictureShow.push(base64);

				$scope.$apply(); //需要手动刷新

			}
		}

		/*ajax请求接口*/

		$scope.submitPhotoIn = function(arrData, i) {
			var imgSrc = arrData[i].image;
			var secret = userService.get("X-AUTH-TOKEN");
			var params = "{\"isContractId\":\"" + isContractId + "\",\"userId\":\"" + userId + "\",\"flowContextId\":\"" + flowContextId + "\",\"imageBytes\":\"" + imgSrc + "\"}"
			$.ajax({
				type: "post",
				url: value.url + "?operAtt=getDownLoadUpload",
				data: {
					"param": params
				},
				//datatype:"json",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'secret': secret
				},
				success: function(data) {
					//将后台传的字符串转换成前台需要的json，不适用所有情况
					var data = eval("(" + data + ")");
					console.log(data);
					var code = data.code;
					var message = data.message;

					if(code == "1") {
						i++;
						if(i < arrData.length) {
							$scope.submitPhotoIn(arrData, i);
						}
						if(i == arrData.length) {
							plus.nativeUI.toast("上传成功");
							history.back(-1);
						}
					} else {
						plus.nativeUI.toast("第" + (i + 1) + "张图片上传失败：" + message);
					}

				},
				error: function(data) {
					loadService.hide();
					plus.nativeUI.toast("上传附件过大，建议单个上传或者在PC端上传");
				},
				async: true
			});
		}

		//		 点击提交
		$scope.submitPhoto = function() {
			if(kongTest($scope.pictureUp)) {
				plus.nativeUI.toast("请先上传图片！")
			} else {
				var arrData = $scope.pictureUp;
				var i = 0;
				$scope.submitPhotoIn(arrData, i);

			}
		}

		function kongTest(arr) {
			if(arr.length == 0) {
				return true;
			} else {
				return false;
			}
		}

	})
}())