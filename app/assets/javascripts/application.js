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
	$scope.init = function(){
		$.getJSON("/flow/edges",function(res){
			$scope.edges = res;
			$scope.$apply();	
		});
		setTimeout(function(){
			$scope.init();
		}, 5000);
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
});
//= require rails-ujs
//= require activestorage
//= require_tree .
