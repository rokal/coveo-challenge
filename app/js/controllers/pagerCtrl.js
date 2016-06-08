angular.module('app')
       .controller('pagerCtrl',pagerCtrl);

function pagerCtrl(dataFactory,$scope,CSS_ACTIVE_CLASS){
    
    $scope.pageSize=6;// to bind with the view
    $scope.data=[];
    
    $scope.$watch(function () { return dataFactory.getData(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) $scope.updateView(newValue);
    });
    
    function initVars(){
        $scope.selectedPage=1;
        $scope.beginPage=1;
        $scope.endPage=$scope.beginPage+9;
    }
    
    $scope.loadPages=function(){
        $scope.pages=[];
        for(var i= $scope.beginPage; i<=$scope.endPage;i++){
            $scope.pages.push(i);
        }
    }
    
    $scope.updateView=function (newData) {
        initVars();
        $scope.data=newData;
        $scope.maxPage=Math.ceil($scope.data.totalCount/$scope.pageSize);
        $scope.endPage=Math.min(10,$scope.maxPage);
        $scope.loadPages();
    }
    
    $scope.isLeftLoadable=function(newPage){
        return newPage< Math.floor(($scope.endPage+$scope.beginPage)/2);
    }
    
    $scope.isRightLoadable=function(newPage){
        return newPage > Math.floor(($scope.endPage+$scope.beginPage)/2);
    }
    
    $scope.selectPage=function(newPage){
        
        if(newPage<$scope.selectedPage && $scope.isLeftLoadable(newPage)){
            var rankToDecrease=Math.min(4,newPage-1);
            $scope.beginPage=newPage-rankToDecrease;
            $scope.endPage=$scope.beginPage+9;
            $scope.loadPages();
        }
        if(newPage>$scope.selectedPage && $scope.isRightLoadable(newPage)){
            var rankToIncrease=Math.min(5,$scope.maxPage-newPage);
            $scope.endPage=newPage+rankToIncrease;
            $scope.beginPage=$scope.endPage-9;
            $scope.loadPages();
        }
        $scope.selectedPage=newPage;
    };
    
    $scope.next=function(){
        if($scope.endPage<$scope.maxPage){
            $scope.beginPage++;
            $scope.endPage++;
            $scope.selectedPage++;
            $scope.loadPages();
        }
        
    }
    $scope.prev=function(){
        if($scope.beginPage>1){
            $scope.beginPage--;
            $scope.endPage--;
            $scope.selectedPage--;
            $scope.loadPages();
        }
        
    }
    
    
    $scope.getPageClass=function(page){
        return $scope.selectedPage==page?CSS_ACTIVE_CLASS:"";
    };
    
    $scope.prevDisabled=function(){
        return $scope.beginPage==1?"disabled":"";
    }
    
    $scope.nextDisabled=function(){
        return $scope.endPage==$scope.maxPage?"disabled":"";
    }
    initVars();
    $scope.loadPages();
}