angular.module("app")
    .factory("ResData",function($resource,API_BASE_URL){
        return $resource(API_BASE_URL,{},{
            list:{method:"POST", params:{"q":"biere"}}
        });
    })
    .controller('appCtrl',function($scope,ResData ){
        $scope.defaultQuery={
            sortField:"@tpmillesime",
            sortCriteria:"fielddescending"
        };
        
        // var query=angular.copy(defaultQuery);
        var query={};
        // query.q="biere";
        var queryString=angular.toJson(query);
        // console.log(angular.toJson(query));
        
        $scope.data=[];
        ResData.list().$promise.then(function(result){
            $scope.data = result; 
            // console.log(result);
        });
        
    })
  .controller("pagerController",function($rootScope,$scope,CSS_ACTIVE_CLASS,ResData){
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
      
      $scope.data=[];
      
      ResData.list().$promise.then(function(result){
            $scope.data = result; 
            $scope.maxPage=Math.ceil($scope.data.totalCount/$scope.pageSize);
        });
      
      
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
  
  AppCtrl.$inject=['dataService'];
  function AppCtrl(dataService){
      this.data=dataService.data;
  }
  
  
  function dataService(){
      this.data=[];
      this.queryObj={};
      this.queryData=function(){
          
      }
  }
    