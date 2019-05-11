app.metricsHelper = function($scope) {
	// alert(2);
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
				$scope.getEdges();
				setTimeout(function(){
					$scope.nodeView(e.id);
				},2000);
			},
			error: function(msg){
				alert("ERROR: "+JSON.stringify(addDataNode));
			}
		});
	}

	$scope.createMetric = function(){
		// alert(12);
		$scope.dataMetric = {};
		$scope.dataMetricValue = {};
		$(".new-metric-container").css({
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
		// if (!!$scope.skipUpdate) return;
		// $scope.skipUpdate = true;
		$("#add_metric_has_to_be_entered_"+e.id).css({
			"opacity": 1,
			"pointer-events": "all",
			"z-index": "10000"
		});
	}

	$scope.closeAddMetricHasToBeEntered = function(e){
		// $scope.skipUpdate = false;
		$("#add_metric_has_to_be_entered_"+e.id).css({
			"opacity": 0,
			"pointer-events": "none",
			"z-index": "0"
		});
	}

	$scope.sendAddNodeDataOperation = function(e){
		var addDataNodeOperation = {
			metric: $("#desired-metric-"+e.id).val(),
			metric_operation_value: $("#desired-metric-operation-value-"+e.id).val(),
			metric_operation_name: $("#desired-metric-operation-name-"+e.id).val(),
			edge: e.id
		};
		$.ajax({
			url: '/edges/update',
			type: "POST",
 			data: addDataNodeOperation,
			success: function(msg){
				alert("Нод обновлен." + JSON.stringify(addDataNodeOperation));
				$("#add_metric_operation_"+e.id).css({
					"opacity": 0,
					"pointer-events": "none",
					"z-index": "0"
				});
			},
			error: function(msg){
				alert("ERROR: "+JSON.stringify(addDataNodeOperation));
			}
		});
	}

	$scope.addMetricOperation = function(e){
		// if (!!$scope.skipUpdate) return;
		// $scope.skipUpdate = true;
		$("#add_metric_operation_"+e.id).css({
			"opacity": 1,
			"pointer-events": "all",
			"z-index": "10000"
		});
	}

	$scope.closeAddMetricOperation = function(e){
		// $scope.skipUpdate = false;
		$("#add_metric_operation_"+e.id).css({
			"opacity": 0,
			"pointer-events": "none",
			"z-index": "0"
		});
	}

	$scope.addMetricHasNotTobeEntered = function(e){
		// if (!!$scope.skipUpdate) return;
		// $scope.skipUpdate = false;
		$("#add_metric_has_not_to_be_entered_"+e.id).css({
			"opacity": 1,
			"pointer-events": "all",
			"z-index": "10000"
		});
	}

	$scope.closeAddMetricHasNotToBeEntered = function(e){
		$scope.skipUpdate = false;
		// $scope.init();
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
}