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
				case 3:
					$scope.bar3D();
				case 4:
					$scope.pie3D();
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
				series: $scope.chartData.series
			});
		}
		//饼状图
		$scope.pieCharts = function() {
			$('#container').highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: $scope.chartData.title,
				},
				tooltip: {
					headerFormat: '{series.name}<br>',
					pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							style: {
								color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
						}
					}
				},
				series: [{
					type: 'pie',
					name: $scope.chartData.seriousName,
					data: $scope.chartData.data,
				}]
			});
		}
		//3D柱状图
		$scope.bar3D = function() {
			$(function() {
				// Set up the chart
				var chart = new Highcharts.Chart({
					chart: {
						renderTo: 'container',
						type: 'column',
						options3d: {
							enabled: true,
							alpha: 15,
							beta: 15,
							depth: 50,
							viewDistance: 25
						}
					},
					title: {
						text: $scope.chartData.title,
					},
					subtitle: {
						text: $scope.chartData.subtitle,
					},
					plotOptions: {
						column: {
							depth: 55
						}
					},
					series: [{
						name:$scope.chartData.seriousName,
						data: $scope.chartData.data
					}]
				});

				function showValues() {
					$('#alpha-value').html(chart.options.chart.options3d.alpha);
					$('#beta-value').html(chart.options.chart.options3d.beta);
					$('#depth-value').html(chart.options.chart.options3d.depth);
				}
				// Activate the sliders
				$('#sliders input').on('input change', function() {
					chart.options.chart.options3d[this.id] = this.value;
					showValues();
					chart.redraw(false);
				});
				showValues();
			});
		}

	})
}())