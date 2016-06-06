angular.module("app")
    .controller('appCtrl',function($scope,$resource,API_BASE_URL ){
        var defaultQuery={
            sortField:"@tpmillesime",
            sortCriteria:"fielddescending"
        };
        
        // var query=angular.copy(defaultQuery);
        var query={};
        query.q="biere";
        var queryString=angular.toJson(query);
        console.log(angular.toJson(query));
        
        $scope.data=[];
        
        $scope.dataResource=$resource(API_BASE_URL,{},{
            list:{method:"POST", params:{"q":"biere"}}
        });
        
        $scope.loadData=function(){
            $scope.data= $scope.dataResource.list();
            console.log($scope.data);
        };
        
        
        $scope.loadData();
    })
  .controller("pagerController",function($rootScope,$scope,CSS_ACTIVE_CLASS){
      $scope.selectedPage=1;
      $scope.beginPage=1;
      $scope.endPage=5;
      $scope.pages=[];
      $scope.pageSize=6;
      
      $scope.numberOfPages=function (totalResults){
          return Math.ceil(totalResults / $scope.pageSize);
      }
      
      $scope.loadPages=function (){
          $scope.pages=[];
          for(var i= $scope.beginPage; i<=$scope.endPage;i++){
              $scope.pages.push(i);
          }
      }
      
      $scope.isLeftLoadable=function (newPage){
          return $scope.selectedPage- newPage>0 && $scope.beginPage>1;
      }
      
      $scope.maxPage=$scope.numberOfPages(100);
      
      $scope.isRightLoadable=function (newPage){
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
        //   if(newPage<$scope.selectedPage){
        //       if($scope.isLeftLoadable(newPage)){
        //           $scope.beginPage--;
        //           $scope.endPage--;
        //           $scope.loadPages();
        //       }
        //   }else{
        //       if($scope.isRightLoadable(newPage)){
        //           $scope.beginPage++;
        //           $scope.endPage++;
        //           $scope.loadPages();
        //       }
        //   }
          $scope.selectedPage=newPage;
          
          //broadcast pageSelected
      };
     
      
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
    