angular.module('app',["ngResource"])
    .constant("API_BASE_URL","https://cloudplatform.coveo.com/rest/search"+
                    "?access_token=6318103b-f9da-437c-854b-9e6f1f44e27b")
                    
    .factory("dataResource",function(API_BASE_URL,$resource){
       return {
         load : function(){
             return $resource(API_BASE_URL,{},{
                 method:'POST'
             });
         }  
       };
        
    })
                    
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
    });