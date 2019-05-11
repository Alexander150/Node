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
