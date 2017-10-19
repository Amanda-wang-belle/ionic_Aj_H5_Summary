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

		function getData(data) {
			$scope.dataList = data;
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}

		var data = $stateParams.data;
		var projectId; // 当前的id
		// 返回
		$scope.back = function() {
			history.back(-1);
		}

		$scope.tolocalday = function(date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			month = month < 10 ? '0' + month : month;
			var day = date.getDate();
			day = day < 10 ? ('0' + day) : day;
			return year + "-" + month + "-" + day;
		}

		function inity(x) {
			var y = {};
			y = x;
			if(!y.termorDay) {
				y.termorDay = "01";
			}
			if(!y.retperm) {
				y.retperm = "1";
			} else {
				y.retperm = y.retperm + '';
			}
			if(!y.proflg) {
				y.proflg = "00";
			}
			if(!y.retMethod) {
				y.retMethod = "00";
			}
			if(!y.ydays) {
				y.ydays = "365";
			} else {
				y.ydays = y.ydays + '';
			}
			if(!y.rate) {
				y.rate = "0.0000";
			} else {
				y.rate = y.rate.toFixed(4);
			}
			if(!y.prjamt) {
				y.prjamt = "0.00";
			}
			if(!y.nominalprice) {
				y.nominalprice = "0.00";
			}
			if(!y.guramtPer) {
				y.guramtPer = "0.0000";
			} else {
				y.guramtPer = y.guramtPer.toFixed(4);
			}
			if(!y.svrfeePer) {
				y.svrfeePer = "0.0000";
			} else {
				y.svrfeePer = y.svrfeePer.toFixed(4);
			}
			if(!y.bgdt) {
				y.bgdtdate = new Date();
				y.bgdt = $scope.tolocalday(y.bgdtdate);
			} else {
				y.bgdtdate = new Date(y.bgdt);
			}
			$scope.y = y;
		}
		var x = {};
		inity(x);
		$scope.temorDayChange = function(x) {
			if($("#termorDay option:selected").val() == '01') {
				$scope.y.ydays = "365";
			}
			if($("#termorDay option:selected").val() == '00') {
				$scope.y.ydays = "360";
			}
		}
		// 千分位格式化
		$scope.comdify = function(n) {　　
			var re = /\d{1,3}(?=(\d{3})+$)/g;　　
			var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
				return s1.replace(re, "$&,") + s2;
			});　　
			return n1;
		}

		$scope.xz = function(x) {
			var oldStr = $("#" + x).val();
			if(oldStr == "") {
				return;
			}
			//		oldStr = oldStr.replace(",","");
			oldStr = oldStr.replace(/[^0-9.]/g, "");

			//以小数点为界分割字符串  
			var splitArray = new Array();
			splitArray = oldStr.split(".");
			// 16位
			if(splitArray[0].length > 16) {
				$("#" + x).val($scope.comdify(splitArray[0].substr(0, 16)));
				return;
			}
			//小数点两位
			if(splitArray.length > 1) {
				//得到小数点后的字符串   
				if(splitArray[1].length > 4) {
					$("#" + x).val($scope.comdify(splitArray[0] + "." + splitArray[1].substr(0, 4)));
					return;
				}
			}
			$("#" + x).val($scope.comdify(oldStr));
			return;
		}

		$scope.limitmonth = function(x) {
			var oldStr = $("#" + x).val();
			if(oldStr == "") {
				return;
			}
			oldStr = oldStr.replace(/[^0-9]/g, "");
			$("#" + x).val(oldStr);
		}

		$scope.limitrate = function(x) {
			var max = 100;
			var num = 3;
			if(x == "rate") { // 利率 1000.00
				max = 1000;
				num = 4;
			}
			var oldStr = $("#" + x).val();
			if(oldStr == "") {
				return;
			}
			oldStr = oldStr.replace(/[^0-9.]/g, "");
			$("#" + x).val(oldStr);

			if(parseFloat(oldStr) > max) { // 大于最大值
				$("#" + x).val("");
				if(num == 4) {
					plus.nativeUI.toast("不大于1000.00");
				} else {
					plus.nativeUI.toast("不大于100.00");
				}

			}

			//以小数点为界分割字符串  
			var splitArray = new Array();
			splitArray = oldStr.split(".");
			// 16位
			if(splitArray[0].length > num) {
				$("#" + x).val(splitArray[0].substr(0, num));
				return;
			}
			//小数点两位
			if(splitArray.length > 1) {
				//得到小数点后的字符串   
				if(splitArray[1].length > 4) {
					$("#" + x).val(splitArray[0] + "." + splitArray[1].substr(0, 4));
					return;
				}
			}
		}

		$scope.clear = function(x) {
			$("#" + x).val("");
		}


	})
}())