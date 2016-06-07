angular.module('app')
       .service('dataService',dataService);
       
function dataService($http,API_BASE_URL){
    this.data=[];
    this.queryObj={};
    this.loadData=function(){
        return $http.post(API_BASE_URL,this.queryObj);
    }
}