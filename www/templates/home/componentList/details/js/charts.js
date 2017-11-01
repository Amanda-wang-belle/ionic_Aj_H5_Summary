/**
 * @author wang_szhan
 * @version 1.0.0
 * @createDate 2017-10-14
 * @content 各种类型的底部栏
 */
(function() {
	'use strict'

	app.controller('chartsCtrl', function($scope, $http, $stateParams, $ionicPopup, $timeout, toastService, publicService, $ionicActionSheet, $ionicHistory, $ionicModal, jQuerySlide) {
		$scope.componentTitle = $stateParams.componentTitle;
		$scope.componentData = $stateParams.componentData;

		$scope.buttonData = [];

		function getData(data) {
			$scope.dataList = data;
			for(var i = 0; i < $scope.dataList.length; i++) {
				$scope.buttonData.push($scope.dataList[i].name);
			}
			$scope.slideIndex = 0;
			$scope.chartData = $scope.dataList[0].value;
			$scope.lineCharts();
		}
		publicService.receiveJson(getData, $scope.componentData);
		$scope.Back = function() {
			history.back(-1);
		}

		$scope.chartChoose = function(index) {
			$scope.slideIndex = index;
			$scope.chartData = $scope.dataList[index].value;
			switch(index) {
				case 0:
					$scope.lineCharts();
					break;
				case 1:
					$scope.barCharts();
					break;
				case 2:
					$scope.pieCharts();
					break;
				default:
					break;
			}
		}
		//折线图
		$scope.lineCharts = function() {
			$('#container').highcharts({
				title: {
					text: $scope.chartData.title,
				},
				subtitle: {
					text: $scope.chartData.subtitle,
				},
				yAxis: {
					title: {
						text: $scope.chartData.yAxis,
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},
				plotOptions: {
					series: {
						label: {
							connectorAllowed: false
						},
						pointStart: 2010
					}
				},
				series: $scope.chartData.series,
				responsive: {
					rules: [{
						condition: {
							maxWidth: 500
						},
						chartOptions: {
							legend: {
								layout: 'horizontal',
								align: 'center',
								verticalAlign: 'bottom'
							}
						}
					}]
				}
			})

		}
		//柱状图
		$scope.barCharts = function() {
			$('#container').highcharts({
				chart: {
					type: 'bar'
				},
				title: {
					text: $scope.chartData.title,
				},
				subtitle: {
					text: $scope.chartData.subtitle,
				},
				xAxis: {
					categories: $scope.chartData.xAxis,
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: $scope.chartData.yAxis,
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: $scope.chartData.tooltip
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true,
							allowOverlap: true
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -40,
					y: 100,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				},
				credits: {
					enabled: false
				},
				series:$scope.chartData.series
			});
		}

	})
}())