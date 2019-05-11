var app = angular.module('NodesApp', ['ngMaterial']);


app.controller('AdminBoardCtrl', function($scope){
	$.ajaxSetup({
  		headers: {
    		'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  		}
	});
	$scope.skipUpdate = false;
	

	$scope.init = function(metrics, dataTypes, measures){
		$scope.metrics   = metrics;
		$scope.dataTypes = dataTypes;
		$scope.measures  = measures;
		app.nodesHelper($scope);
		app.metricsHelper($scope);
		setTimeout(function(){
			$scope.getEdges();
		},500);
	}
});