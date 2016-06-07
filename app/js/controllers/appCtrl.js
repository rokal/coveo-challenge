angular.module('app')
       .controller('appCtrl',appCtrl);

function appCtrl(dataService,$scope){
    // $scope.data=[];
    // $scope.data=dataService.data;
    // dataService.loadData.list().$promise.then(function(results){
    //     $scope.data=results;
    //     dataService.updateQuery({q:"biere rousse"});
    // });
    
    dataService.loadData().success(function(resu){
        console.log(resu);
        $scope.data=resu;
    });
}
        