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
	 *本地缓存 
	 */
}());