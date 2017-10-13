/**
 * @author wang_szhan
 * @version 1.0.0
 * 创建时间  2017-10-10 下午14:35
 */
var app = angular.module('starter', ['ionic', 'ui.router', 'oc.lazyLoad', 'LocalStorageModule'])

app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $ocLazyLoadProvider, $provide, $compileProvider, $controllerProvider, $filterProvider, $httpProvider) {

	//定义所有类型的懒加载服务
	app.controller = $controllerProvider.register;
	app.directive = $compileProvider.directive;
	app.filter = $filterProvider.register;
	app.factory = $provide.factory;
	app.service = $provide.service;
	app.constant = $provide.constant;
	app.value = $provide.value;

	$ocLazyLoadProvider.config({
		debug: true,
		event: true //广播懒加载事件
	})

	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	//android中tabs位于设备顶部，将tabs设置到设备底部
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('bottom');
	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon(' ion-ios-arrow-back"');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');
	
	$stateProvider

		// setup an abstract state for the tabs directive
		.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'templates/tabs.html'
		})

		// Each tab has its own nav history stack:

		.state('tab.dash', {
			url: '/dash',
			views: {
				'tab-dash': {
					templateUrl: 'templates/tab-dash.html',
					controller: 'DashCtrl'
				}
			}
		})

		.state('tab.chats', {
			url: '/chats',
			views: {
				'tab-chats': {
					templateUrl: 'templates/tab-chats.html',
					controller: 'ChatsCtrl'
				}
			}
		})
		.state('tab.chat-detail', {
			url: '/chats/:chatId',
			views: {
				'tab-chats': {
					templateUrl: 'templates/chat-detail.html',
					controller: 'ChatDetailCtrl'
				}
			}
		})

		.state('tab.account', {
			url: '/account',
			views: {
				'tab-account': {
					templateUrl: 'templates/tab-account.html',
					controller: 'AccountCtrl'
				}
			}
		})
		
		//首页
		.state('tab.home',{
			url:'/home',
			cache:'false',
			views: {
				'tab-home':{
					templateUrl:'templates/home/home.html',
					controller:'homeCtrl'
				}
			},
			resolve: {
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					return $ocLazyLoad.load('templates/home/home.js');
				}]
			}
		})
		//构件列表 wang_szhan 2017.10.11
		.state('tab.componentList',{
			url:'/componentList',
			params:{
				"component":null
			},
			cache:'false',
			views: {
				'tab-home':{
					templateUrl:'templates/home/componentList/list.html',
					controller:'componentListCtrl'
				}
			},
			resolve: {
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					return $ocLazyLoad.load('templates/home/componentList/list.js');
				}]
			}
		})
		//各种弹框页面 wang_szhan 2017.10.12
		.state('tab.popup',{
			url:'/popup',
			params:{
				"component":null
			},
			cache:'false',
			views: {
				'tab-home':{
					templateUrl:'templates/home/componentList/details/popup.html',
					controller:'popupCtrl'
				}
			},
			resolve: {
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					return $ocLazyLoad.load('templates/home/componentList/details/popup.js');
				}]
			}
		})
		//工作消息
		.state('tab.msg',{
			url:'/msg',
			cache:'false',
			views: {
				'tab-msg':{
					templateUrl:'templates/msg/msg.html',
					controller:'msgCtrl'
				}
			},
			resolve: {
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					return $ocLazyLoad.load('templates/msg/msg.js');
				}]
			}
		})
		//报价测算
		.state('tab.irrcs',{
			url:'/irrcs',
			cache:'false',
			views: {
				'tab-irrcs':{
					templateUrl:'templates/irrcs/irrcs.html',
					controller:'irrcsCtrl'
				}
			},
			resolve: {
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					return $ocLazyLoad.load('templates/irrcs/irrcs.js');
				}]
			}
		})
		//我的账户
		.state('tab.mine',{
			url:'/mine',
			cache:'false',
			views: {
				'tab-mine':{
					templateUrl:'templates/mine/mine.html',
					controller:'mineCtrl'
				}
			},
			resolve: {
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					return $ocLazyLoad.load('templates/mine/mine.js');
				}]
			}
		})
		
		
		
		
		
		
		
		
		
		
		
		
		
		

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/dash');

});