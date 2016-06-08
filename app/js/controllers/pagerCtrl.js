(function () {
    'use strict';
    
    angular.module('app')
       .controller('pagerCtrl',pagerCtrl);

    function pagerCtrl(dataFactory,$scope,CSS_ACTIVE_CLASS){
        var PAGER_SIZE=10;
        var GAP_BEGIN_SELECTED_PAGE=4;
        $scope.data=[];
        
        
        $scope.$watch(function () { return dataFactory.getData(); }, function (newValue, oldValue) {
            if (newValue !== oldValue) $scope.updateView(newValue);
        });
        
        function initVars(){
            $scope.selectedPage=1;
            $scope.beginPage=1;
            $scope.endPage=PAGER_SIZE;
        }
        
        $scope.loadPages=function(){
            $scope.pages=[];
            for(var i= $scope.beginPage; i<=$scope.endPage;i++){
                $scope.pages.push(i);
            }
        }
        
        $scope.updateView=function (newData) {
            if(!$scope.actionNewPage){
                $scope.actionNewPage=false;
                initVars();
                $scope.data=newData;
                $scope.pageSize=$scope.data.results.length;
                $scope.maxPage=Math.ceil($scope.data.totalCount/$scope.pageSize);
                $scope.endPage=Math.min(PAGER_SIZE,$scope.maxPage);
                $scope.loadPages();
            }
        }
        
        $scope.isLeftLoadable=function(newPage){
            return newPage< Math.floor(($scope.endPage+$scope.beginPage)/2) && $scope.maxPage>PAGER_SIZE;
        }
        
        $scope.isRightLoadable=function(newPage){
            return newPage > Math.floor(($scope.endPage+$scope.beginPage)/2) && $scope.maxPage>PAGER_SIZE;
        }
        
        $scope.queryNewPage=function(pageNum,actionNewPage){
            $scope.actionNewPage=actionNewPage;
            this.selectPage(pageNum);
            dataFactory.updateData({firstResult:(pageNum-1)*$scope.pageSize});
        }
        
        $scope.selectPage=function(newPage){
            
            if(newPage<$scope.selectedPage && $scope.isLeftLoadable(newPage)){
                var rankToDecrease=Math.min(GAP_BEGIN_SELECTED_PAGE,newPage-1);
                $scope.beginPage=newPage-rankToDecrease;
                $scope.endPage=$scope.beginPage+(PAGER_SIZE-1);
                $scope.loadPages();
            }
            if(newPage>$scope.selectedPage && $scope.isRightLoadable(newPage)){
                var rankToIncrease=Math.min(5,$scope.maxPage-newPage);
                $scope.endPage=newPage+rankToIncrease;
                $scope.beginPage=$scope.endPage-(PAGER_SIZE-1);
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
})();