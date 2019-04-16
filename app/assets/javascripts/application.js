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

	$scope.nodeView = function(name) {
		var blocks = document.getElementsByName(name);
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i].style.display == "block") {
				blocks[i].style.display = "none"
			} else {
				blocks[i].style.display = "block"
			}
		}
	}

	$scope.createNode = function(e){
		if (!!skipUpdate) return;
		skipUpdate = true;
		$scope.activeEdge = e;
		$scope.dataNode = {};
		$scope.dataEdge = {};
		$("#node_creation_"+e.id).css({
			"opacity": 1,
			"pointer-events": "all"
		});
	}

	$scope.sendNewNodeData = function(e){
		var dataNode = {
			node: $scope.dataNode
		};
		var dataForEdge = {
			node_id: e.node_id,
			target_node_id: e.target_node_id
		};
		var dataEdge = {
			edge: dataForEdge
		};
		$.ajax({
			url: '/node/create',
			type: "POST",
 			data: dataNode,
			success: function(msg){
				alert('Новый нод добавлен');
				// $("#node_creation_"+e.id).css({
				// 	"opacity": 0,
				// 	"pointer-events": "none"
				// });
				$.ajax({
					url: '/edges/create',
					type: "POST",
					data: dataEdge,
					success: function(){
						alert("wow");
					},
					error: function(msg){
						alert("Error: " + JSON.stringify(dataEdge));
					}
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
