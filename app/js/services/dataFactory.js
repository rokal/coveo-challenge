angular.module('app')
       .factory('dataFactory', function ($http,API_BASE_URL) {
           
            var factoryVars = {
                data: [],
                queryObj:{firstResult:0}
            };

            return {
                loadData : function(query=this.queryObj){
                    return $http.post(API_BASE_URL,query);
                },
                
                updateData:function(arg){
                    if(angular.isDefined(arg)){
                        angular.forEach(arg,function (key,val) {
                            factoryVars.queryObj[val]=key;
                        });
                        console.log(factoryVars.queryObj);
                    }
                   
                    $http.post(API_BASE_URL,factoryVars.queryObj).success(function (result) {
                        result["query"]=factoryVars.queryObj
                        factoryVars.data=result;
                        console.log(result);
                    });
                },
                
                getData:function(){
                    return factoryVars.data;
                }
            };
});