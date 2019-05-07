// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//


var app = angular.module('NodesApp', ['ngMaterial']);

app.controller('NodeCtrl', ['$scope', function($scope){
	var nodeId = -1;
	$scope.init = function(newNodeId){
		nodeId = newNodeId;
		$scope.url = "/node/"+nodeId;

	}
	$scope.makeUrl = function(mId, mValue){
		$scope.url = "/node/"+nodeId+"?";
		// $scope.url += "m_id"+mId+"value="+mValue;
		$scope.url += "value="+mValue;
	}
}]);

app.controller('AdminBoardCtrl', function($scope){
	var skipUpdate = false;
	$scope.init = function(metrics){
		$scope.metrics = metrics;
		$.getJSON("/flow/edges",function(res){
			if (!skipUpdate){
				$scope.edges = res;
				for(var i=1; i<$scope.edges.length; i++){
					var edge = $scope.edges[i];
					$scope.edges[i].prevNode = $scope.edges[i-1].node;
				}

				for(var i=1; i<$scope.edges.length; i++){
					var edge = $scope.edges[i];
					var availableMetrics = [];

					for(var j=0; j<$scope.metrics.length; j++){
						availableMetrics.push($scope.metrics[j]);
					}

					var usedMetrics = edge.prevNode.metric_values.map(function(val, index, array){
						return val.metric;
					});
					for(var j=0; j<usedMetrics.length; j++){
						var metrIndex = -1;
						for(var k=0; k<availableMetrics.length; k++){
							if (availableMetrics[k].id == usedMetrics[j].id){
								// alert(edge.id+": "+availableMetrics[k].id+" "+usedMetrics[j].id);
								metrIndex = k;
								break;
							}
						}
						if ( -1 < metrIndex ) {
							availableMetrics.splice(metrIndex,1);
						}
					}
					$scope.edges[i-1].availableMetrics=availableMetrics = availableMetrics;
				}
				$scope.$apply();
			}
			setTimeout(function(){
				$scope.init();
			}, 5000);		
		});
		
	}

	$scope.nodeView = function(eId) {
		var addDataNode = {};
		var target = document.getElementById("e-"+eId);
		var blocks = document.getElementsByClassName("white_block");
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].style.display = "none"
		}
		target.style.display="block";
	}

	$scope.createNode = function(e){
		if (!!skipUpdate) return;
		skipUpdate = true;
		$scope.activeEdge = e;
		$scope.dataNode = {};
		$scope.dataMetricValue = {};
		$("#node_creation_"+e.id).css({
			"opacity": 1,
			"pointer-events": "all",
			"z-index": "1000"
		});
	}

	$scope.closeCreateNode = function(e){
		$("#node_creation_"+e.id).css({
			"opacity": 0,
			"pointer-events": "none",
			"z-index": "0"
		});
	}

	$.ajaxSetup({
  		headers: {
    		'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  		}
	});

	$scope.sendNewNodeData = function(e){
		var dataNode = {
			node: $scope.dataNode,
			edge: e.id,
			metric_value: $scope.dataMetricValue
		};
		$.ajax({
			url: '/node/create',
			type: "POST",
 			data: dataNode,
			success: function(msg){
				alert("Новый нод добавлен.");
				$("#node_creation_"+e.id).css({
					"opacity": 0,
					"pointer-events": "none",
					"z-index": "0"
				});
			},
			error: function(msg){
				alert("ERROR: "+JSON.stringify(msg));
			}
		});
	}
	$scope.sendAddNodeDataHasToBeEntered = function(e){
		var addDataNode = {
			metric_value: $("#desired-metric-value-"+e.id).val(),
			metric: $("#desired-metric-"+e.id).val(),
			edge: e.id
		};
		$.ajax({
			url: '/node/update',
			type: "POST",
 			data: addDataNode,
			success: function(msg){
				alert("Нод обновлен." + JSON.stringify(addDataNode));
				$("#add_metric_has_to_be_entered_"+e.id).css({
					"opacity": 0,
					"pointer-events": "none",
					"z-index": "0"
				});
			},
			error: function(msg){
				alert("ERROR: "+JSON.stringify(addDataNode));
			}
		});
	}

	$scope.createMetric = function(){
		if (!!skipUpdate) return;
		skipUpdate = true;
		$scope.dataMetric = {};
		$scope.dataMetricValue = {};
		$("#metric_creation").css({
			"opacity": 1,
			"pointer-events": "all",
			"z-index": "10000"
		});
	}

	$scope.closeCreateMetric = function(){
		$("#metric_creation").css({
			"opacity": 0,
			"pointer-events": "none",
			"z-index": "0"
		});
	}

	$scope.sendAddNodeDataHasNotToBeEntered = function(e){
		var addDataNode = {
			metric: $("#desired-metric-"+e.id).val(),
			edge: e.id
		};
		$.ajax({
			url: '/node/update',
			type: "POST",
 			data: addDataNode,
			success: function(msg){
				alert("Нод обновлен." + JSON.stringify(addDataNode));
				$("#add_metric_has_not_to_be_entered_"+e.id).css({
					"opacity": 0,
					"pointer-events": "none",
					"z-index": "0"
				});
			},
			error: function(msg){
				alert("ERROR: "+JSON.stringify(addDataNode));
			}
		});
	}

	$scope.addMetricHasTobeEntered = function(e){
		if (!!skipUpdate) return;
		skipUpdate = true;
		$("#add_metric_has_to_be_entered_"+e.id).css({
			"opacity": 1,
			"pointer-events": "all",
			"z-index": "10000"
		});
	}

	$scope.closeAddMetricHasToBeEntered = function(e){
		skipUpdate = false;
		$("#add_metric_has_to_be_entered_"+e.id).css({
			"opacity": 0,
			"pointer-events": "none",
			"z-index": "0"
		});
	}

	$scope.sendAddNodeDataOperation = function(e){
		var addDataNode = {
			metric: $("#desired-metric-"+e.id).val(),
			edge: e.id
		};
		$.ajax({
			url: '/node/update',
			type: "POST",
 			data: addDataNode,
			success: function(msg){
				alert("Нод обновлен." + JSON.stringify(addDataNode));
				$("#add_metric_operation_"+e.id).css({
					"opacity": 0,
					"pointer-events": "none",
					"z-index": "0"
				});
			},
			error: function(msg){
				alert("ERROR: "+JSON.stringify(addDataNode));
			}
		});
	}

	$scope.addMetricOperation = function(e){
		if (!!skipUpdate) return;
		skipUpdate = true;
		$("#add_metric_operation_"+e.id).css({
			"opacity": 1,
			"pointer-events": "all",
			"z-index": "10000"
		});
	}

	$scope.closeAddMetricOperation = function(e){
		skipUpdate = false;
		$("#add_metric_operation_"+e.id).css({
			"opacity": 0,
			"pointer-events": "none",
			"z-index": "0"
		});
	}

	$scope.addMetricHasNotTobeEntered = function(e){
		if (!!skipUpdate) return;
		skipUpdate = true;
		$("#add_metric_has_not_to_be_entered_"+e.id).css({
			"opacity": 1,
			"pointer-events": "all",
			"z-index": "10000"
		});
	}

	$scope.closeAddMetricHasNotToBeEntered = function(e){
		skipUpdate = false;
		$("#add_metric_has_not_to_be_entered_"+e.id).css({
			"opacity": 0,
			"pointer-events": "none",
			"z-index": "0"
		});
	}

	$scope.sendNewMetricData = function(){
		var dataMetric = {
			metric: $scope.dataMetric,
			metric_value: $scope.dataMetricValue
		};
		$.ajax({
			url: '/metrics/create',
			type: "POST",
 			data: dataMetric,
			success: function(msg){
				alert("Новая метрика добавлена.");
				$("#metric_creation").css({
					"opacity": 0,
					"pointer-events": "none",
					"z-index": "0"
				});
			},
			error: function(msg){
				alert("ERROR: "+JSON.stringify(msg));
			}
		});
	}
});
//= require rails-ujs
//= require activestorage
//= require_tree .
