app.nodesHelper = function($scope) {
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
		if (!!$scope.skipUpdate) return;
		// alert(e);
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

	$scope.getEdges = function(){
		$.getJSON("/flow/edges",function(res){
			if (!!$scope.skipUpdate){return;}
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
			// setTimeout(function(){
			// 	$scope.init();
			// }, 1000);		
		});
	}
}