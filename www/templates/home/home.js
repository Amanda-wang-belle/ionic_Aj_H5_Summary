/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-12
 * @content 首页
 */
(function(){
	'use strict'
	
	app.controller('homeCtrl',function($scope,$http,$state,publicJump,publicService){
		function getData(data){
			$scope.dataList = data;
		}
		publicService.receiveJson(getData,"homeData");
		
		$scope.fool = function(){
			alert("*′∀`)′∀`)*′∀`)*′∀`)，谁点谁是笨蛋");
		}
		
		$scope.toDetail = function(x){
			publicJump.jumpTo(x);
			
		}
		
	})
}())
