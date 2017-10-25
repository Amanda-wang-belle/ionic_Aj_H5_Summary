/**
 * @author wang_szhan
 * @version 1.0.0
 * 创建时间  2017-10-12
 */
(function() {
	'use strict'
	//公共地址
	app.value('value', {
		"url": "http://"
	})
	/**
	 *隐藏tabs指令 wang_szhan 20171012 
	 * http://blog.csdn.net/qq673318522/article/details/53236076
	 */
	app.directive('hideTabs', function($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				scope.$on('$ionicView.beforeEnter', function() {
					scope.$watch(attributes.hideTabs, function(value) {
						$rootScope.hideTabs = 'tabs-item-hide';
					})
				});
				scope.$on('$ionicView.beforeLeave', function() {
					$rootScope.hideTabs = false;
				});
				scope.$watch('$destory', function() {
					$rootScope.hideTabs = false;
				})
			}
		}
	})
	/**
	 * 自定义toast框 wang_szhan 20171012 
	 */
	app.factory('toastService', function($ionicPopup, $timeout) {
		return {
			showToast: function(keyText) {
				var s = document.getElementById('toastTest');
				if(s) {
					document.body.removeChild(s);
				}
				var x = document.createElement('div');
				var m = document.createElement('div');
				x.id = "toastTest";
				m.id = "toastTest1";
				document.body.appendChild(x);
				x.appendChild(m);
				m.innerHTML = keyText;
				var ScreenHeight = window.screen.height;
				var toastHeight = $("#toastTest").height();
				var toastTop = (ScreenHeight - toastHeight) / 2;
				x.style.cssText = 'top:' + toastTop + "px";
				setTimeout(function() {
					x.style.webkitTransition = 'opacity 0.5s ease-in-out';
					x.style.opacity = '0';
					setTimeout(function() {
						var s = document.getElementById('toastTest');
						if(s) {
							document.body.removeChild(s);
						}
					}, 1000);
				}, 2000);
			},
			showToast2: function(keyText) {
				var s = document.getElementById('toastTest');
				if(s) {
					document.body.removeChild(s);
				}
				var x = document.createElement('div');
				var m = document.createElement('div');
				x.id = "toastTest";
				m.id = "toastTest2";
				document.body.appendChild(x);
				x.appendChild(m);
				m.innerHTML = keyText;
				var ScreenHeight = window.screen.height;
				var toastHeight = $("#toastTest").height();
				var toastTop = (ScreenHeight - toastHeight) / 2;
				x.style.cssText = 'top:' + toastTop + "px";
				setTimeout(function() {
					x.style.webkitTransition = 'opacity 0.5s ease-in-out';
					x.style.opacity = '0';
					setTimeout(function() {
						var s = document.getElementById('toastTest');
						if(s) {
							document.body.removeChild(s);
						}
					}, 1000);
				}, 2000);
			}
		}
	})
	/**
	 * 公共的跳转方法 wang_szhan 20171012 
	 */
	app.factory('publicJump', function($state, toastService) {
		return {
			jumpTo: function(x) {
				var page = "tab." + x.value;
				if(x.value) {
					$state.go(page, {
						"componentTitle": x.name,
						"componentData": x.data,
					});
				} else {
					toastService.showToast(x.data);
				}
			}
		}
	})
	/**
	 *jQuery收起放下列表中的详情内容 
	 */
	app.factory('jQuerySlide', [function() {
		return {
			slideUp: function(a, b) {
				$(a).slideUp();
				$(b).removeClass("ion-ios-arrow-up");
				$(b).addClass("ion-ios-arrow-down");
				a = "";
				b = "";
			},
			slideDown: function(a, b) {
				$(a).slideDown();
				$(b).removeClass("ion-ios-arrow-down");
				$(b).addClass("ion-ios-arrow-up");
			},
			slideToggle: function(a, b) {
				if($(a).css('display') == 'block') {
					$(a).slideUp();
					$(b).removeClass("ion-ios-arrow-up");
					$(b).addClass("ion-ios-arrow-down");
					a = "";
					b = "";
				} else {
					$(a).slideDown();
					$(b).removeClass("ion-ios-arrow-down");
					$(b).addClass("ion-ios-arrow-up");
				}
			}
		}
	}])
	/**
	 *调取json的公共方法 wang_szhan 20170112
	 */
	app.factory('publicService', ['$http', function($http) {
		return {
			receiveJson: function(fn, x) {
				var dataList;
				$http.get('json/home.json')
					.success(function(data) {
						dataList = data[x];
						fn(dataList);
					})
			}
		}
	}])
	/**
	 *本地缓存 wang_szhan 200171017
	 */
	app.factory('userService', ['localStorageService', function(localStorageService) {
		return {
			set: function(key, value) {
				//设置缓存;
				localStorageService.set(key, value);
			},
			get: function(key) {
				//获取缓存
				return localStorageService.get(key);
			},
			clearAll: function() {
				localStorageService.clearAll();
			}

		};
	}])
	//本地缓存 wang_szhan 200171018
	app.factory('locals', ['$window', function($window) {
		return { //存储单个属性
			set: function(key, value) {
				$window.localStorage[key] = value;
			}, //读取单个属性
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			}, //存储对象，以JSON格式存储
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value); //将对象以字符串保存
			}, //读取对象
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}'); //获取字符串并解析成对象
			},
			remove: function(key) {
				$window.localStorage.removeItem(key);
			},
			clearAll: function() {
				$window.localStorage.clear();
			}

		}
	}]);
	//公共调取后台接口的方法
	app.factory("httpService", ['$q', '$http', 'value', function($q, $http, value) {
		//发送Json类型的数据，后台返回的数据也是Json类型的数据
		var postJsonReceiveJson = function(url, dataJson) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			promise = $http({
				method: 'POST',
				url: url,
				data: dataJson
			});
			return promise;
		};

		//发送Json类型的数据，后台返回字符串
		var postJsonReceiveString = function(url, dataJson) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			promise = $http({
				method: 'POST',
				url: url,
				data: dataJson,
				headers: {
					'Accept': 'text/plain'
				}
			});
			return promise;
		};

		//33发送字符串，后台返回Json数据类型
		var postStringReceiveJson = function(operAtt, url, dataStr) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			promise = $http({
				method: 'POST',
				url: value.url + url,
				params: {
					serviceId: operAtt,
					para: dataStr
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			});
			return promise;
		};

		//发送字符串，后台返回字符串
		var postStringReceiveString = function(url, dataStr) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			promise = $http({
				method: 'POST',
				url: url,
				data: dataStr,
				headers: {
					'Accept': 'text/plain',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			});
			return promise;
		};

		//发送字符串，后台返回Json数据类型，应用于路由中的resolve
		var postStringReceiveJsonForResolve = function(url, dataStr) {
			var deferred = $q.defer();
			promise = $http({
					method: 'POST',
					url: url,
					data: dataStr,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).success(function(data, status, headers, cfg) {
					deferred.resolve(data);
				})
				.error(function(data, status, headers, cfg) {
					deferred.reject(data);
				});
			return deferred.promise;
		};

		//发送字符串，后台返回字符串数据类型，应用于路由中的resolve
		var postStringReceiveStringForResolve = function(url, dataStr) {
			var deferred = $q.defer();
			promise = $http({
					method: 'POST',
					url: url,
					data: dataStr,
					headers: {
						'Accept': 'text/plain',
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).success(function(data, status, headers, cfg) {
					deferred.resolve(data);
				})
				.error(function(data, status, headers, cfg) {
					deferred.reject(data);
				});
			return deferred.promise;
		};

		return {
			postJsonReceiveJson: postJsonReceiveJson,
			postJsonReceiveString: postJsonReceiveString,
			postStringReceiveJson: postStringReceiveJson,
			postStringReceiveString: postStringReceiveString,
			postStringReceiveJsonForResolve: postStringReceiveJsonForResolve,
			postStringReceiveStringForResolve: postStringReceiveStringForResolve
		};

	}])
	app.directive('toLimit', function($parse) {
		//字符串长度控制 
		function len(s) {
			s = String(s);
			console.log(s.length + (s.match(/[^\x00-\xff]/g) || "").length);
			return s.length + (s.match(/[^\x00-\xff]/g) || "").length; // 加上匹配到的全角字符长度
		}
		return {
			//		    require: 'A',  
			link: function(scope, element, attrs, ctrl) {
				//控制输入框只能输入数字和小数点  
				function limitLength() {
					var limit = attrs.toLimit;
					var val = element[0].value;
					if(len(val) > limit) {
						val = val.substring(0, limit);
						while(len(val) > limit) {
							val = val.substring(0, val.length - 1);
						};
						//					obj.value = val;
						val = val.substring(0, limit);
						element[0].value = val;
						$parse(attrs['ngModel']).assign(scope, val);
						console.log(val);
						//						toast("最多输入" + limit + "个字哟");
					}
				}
				scope.$watch(attrs.ngModel, function() {
					limitLength();
				})
			}
		};
	})
	app.directive('toChange', function($parse) {
		/*效果: 将页面展示效果和ngModel分开
			1 输入框只能输入数字和字母
			2 输入整数和小数位数长度控制
			3 整数3位一逗号*/
		return {
			link: function(scope, element, attrs, ctrl) {
				var numberDigit = attrs.toChange;
				var numberArr = numberDigit.split(",");
				//小数位数
				var decimalDigit = parseInt(numberArr[1]);
				//整数位数
				var integerDigit = parseInt(numberArr[0]) - decimalDigit;

				//控制输入框只能输入数字和小数点
				function limit() {
					var limitV = element[0].value;
					limitV = limitV.replace(/[^0-9.]/g, "");
					//必须保证第一个为数字而不是. 
					limitV = limitV.replace(/^\./g, "");
					element[0].value = limitV;
					$parse(attrs['ngModel']).assign(scope, limitV);
					format();
				}

				//对输入数字的整数部分插入千位分隔符  
				function format() {
					var formatV = element[0].value;
					//开头不能连续输入两个0，一位以上的数字首位不能为0
					var first = formatV.substring(0, 1);
					var second = formatV.substring(1, 2);
					if("0" == first && "0" == second) {
						formatV = "0";
					}
					//					else if("0" == first && second !="0"&& second !=""&& second !=undefined){
					//						formatV = formatV.substring(1,formatV.length);
					//					}
					var array = new Array();
					array = formatV.split(".");

					//控制整数位数和小数位数
					var x1 = array[0];
					var x2 = array.length > 1 ? array[1] : '';
					if(array.length == 1) {
						//整数，没有小数点
						if(x1.length > integerDigit) {
							formatV = x1.substring(0, integerDigit);
						}
					} else {
						//有小数点
						if(x1.length > integerDigit) {
							x1 = x1.substring(0, integerDigit);
						}
						if(x2.length > decimalDigit) {
							x2 = x2.substring(0, decimalDigit);
						}
						formatV = x1 + "." + x2;

					}
					if(decimalDigit == 0) {
						formatV = formatV.replace(".", "");
					}
					element[0].value = formatV;
					console.log("整数位数---" + x1.length + ",---小数位数---" + x2.length);
					console.log(formatV);

					var re = /(-?\d+)(\d{3})/;
					while(re.test(array[0])) {
						array[0] = array[0].replace(re, "$1,$2")
					}
					var returnV = array[0];
					for(var i = 1; i < array.length; i++) {
						returnV += "." + array[i];
					}
					element[0].value = returnV;
					$parse(attrs['ngModel']).assign(scope, formatV);
				}

				scope.$watch(attrs.ngModel, function() {
					limit();
				})
			}
		};

	})
	app.directive('limitNumber', function($parse) {
		/*效果: 将页面展示效果和ngModel分开
			1 输入框只能输入数字和字母
			2 输入整数和小数位数长度控制
			3 整数3位一逗号*/
		return {
			link: function(scope, element, attrs, ctrl) {

				//控制输入框只能输入数字和小数点
				function limit() {
					var limitV = element[0].value;
					limitV = limitV.replace(/[^0-9]/g, "");
					element[0].value = limitV;
					$parse(attrs['ngModel']).assign(scope, limitV);
				}
				scope.$watch(attrs.ngModel, function() {
					limit();
				})
			}
		};

	})
}());