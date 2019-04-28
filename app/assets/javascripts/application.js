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
	$scope.init = function(){

		$.getJSON("/flow/edges",function(res){
			if (!skipUpdate){
				$scope.edges = res;
				$scope.$apply();
			}
			setTimeout(function(){
				$scope.init();
			}, 5000);		
		});
		
	}

	$scope.nodeView = function(eId) {
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
				alert(JSON.stringify(dataNode));
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

	$scope.createMetric = function(){
		if (!!skipUpdate) return;
		skipUpdate = true;
		// $scope.activeEdge = e;
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

	$scope.sendNewNodeData = function(e){
		var dataNode = {
			metric: $scope.dataMetric,
			metric_value: $scope.dataMetricValue
		};
		$.ajax({
			url: '/node/create',
			type: "POST",
 			data: dataNode,
			success: function(msg){
				alert(JSON.stringify(dataNode));
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
});
//= require rails-ujs
//= require activestorage
//= require_tree .
