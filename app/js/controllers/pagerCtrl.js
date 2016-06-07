angular.module('app')
       .controller('pagerCtrl',pagerCtrl);

function pagerCtrl(dataService,$scope,CSS_ACTIVE_CLASS){
    
    dataService.loadData().success(function (resu) {
        $scope.selectedPage=1;
        $scope.beginPage=1;
        $scope.pages=[];
        $scope.pageSize=6;
        $scope.data=[];
        $scope.data=resu
        $scope.maxPage=Math.ceil($scope.data.totalCount/$scope.pageSize);
        $scope.endPage=Math.min(7,$scope.maxPage);
        
        $scope.loadPages=function(){
            $scope.pages=[];
            for(var i= $scope.beginPage; i<=$scope.endPage;i++){
                $scope.pages.push(i);
            }
        }
        
        $scope.isLeftLoadable=function(newPage){
            return $scope.selectedPage- newPage>0 && $scope.beginPage>1;
        }
        
        $scope.isRightLoadable=function(newPage){
            return newPage-$scope.selectedPage >0 && $scope.endPage<$scope.maxPage;
        }
        
        $scope.selectPage=function(newPage){
            if(newPage<$scope.selectedPage && $scope.isLeftLoadable(newPage)){
                var lastBeginPage=angular.copy($scope.beginPage);
                $scope.beginPage= Math.max($scope.beginPage-($scope.selectedPage-newPage),1);
                $scope.endPage-=lastBeginPage-$scope.beginPage;
                $scope.loadPages();
            }
            if(newPage>$scope.selectedPage && $scope.isRightLoadable(newPage)){
                var lastEndPage=angular.copy($scope.endPage);
                $scope.endPage= Math.min($scope.endPage+(newPage-$scope.selectedPage),$scope.maxPage);
                $scope.beginPage+=$scope.endPage-lastEndPage;
                $scope.loadPages();
            }
            $scope.selectedPage=newPage;
            
            //broadcast pageSelected
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
        
        $scope.loadPages();
    });
    
    
    
    
    
    
    // dataService.loadData.list().$promise.then(function(results){
    //     $scope.data=results;
    //     $scope.maxPage=Math.ceil(results.totalCount/$scope.pageSize);
    //     // $scope.loadPages();
    // });
    
    
    
    // $scope.numberOfPages=function(totalResults){
    //     return Math.ceil(totalResults / $scope.pageSize);
    // }
    
    
      
      
}