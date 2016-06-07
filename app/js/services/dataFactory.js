angular.module('app')
       .factory('dataFactory', function ($http,API_BASE_URL) {
           
            var factoryVars = {
                data: [],
                queryObj:{}
            };

            return {
                loadData : function(query=this.queryObj){
                    return $http.post(API_BASE_URL,query);
                },
                
                updateData:function(arg){
                    if(angular.isDefined(arg)){
                        var key=Object.keys(arg)[0];
                        factoryVars.queryObj[key]=arg[key];
                        console.log(factoryVars.queryObj);
                    }
                   
                    $http.post(API_BASE_URL,factoryVars.queryObj).success(function (result) {
                        factoryVars.data=result;
                        console.log(result);
                    });
                },
                
                getData:function(){
                    return factoryVars.data;
                }
            };
});