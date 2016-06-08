angular.module('app')
       .controller('appCtrl',appCtrl);

function appCtrl(dataFactory,$scope){
    
    dataFactory.updateData();
     $scope.search=function () {
        dataFactory.updateData($scope.query);
    }
    
    $scope.reset=function(){
        $scope.query.q="";
        dataFactory.updateData($scope.query);
    };
    
    $scope.$watch(function () { return dataFactory.getData(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) $scope.data = newValue;
    });
    
    
}
        