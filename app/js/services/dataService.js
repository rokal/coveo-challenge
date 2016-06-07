angular.module('app')
       .service('dataService',dataService);
       
function dataService($http,API_BASE_URL){
    this.data=[];
    this.queryObj={
        sortField:"@tpmillesime",
        sortCriteria:"fielddescending"
    };
    this.loadData=function(query=this.queryObj){
        return $http.post(API_BASE_URL,query);
    };
    
    this.updateData=function(arg){
        var key=Object.keys[0];
        this.queryObj[key]=arg[key];
        console.log(this.queryObj);
        this.loadData(this.queryObj).success(function (result) {
            this.data=result;
            console.log(result);
        });
    }
}