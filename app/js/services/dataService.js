angular.module('app')
       .service('dataService',dataService);
       
function dataService($resource,API_BASE_URL){
    this.data=[];
    this.queryObj={};
    this.loadData=dataresource=$resource(API_BASE_URL,{},{list:{method:"POST"}});
    
    this.updateQuery=function(args=this.queryObj){
        var key=Object.keys(args)[0];
        this.queryObj[key]=args[key];
        console.log(angular.toJson(this.queryObj));
        this.loadData.save(angular.toJson(this.queryObj));
        this.loadData.list().$promise.then(function(data){
            this.data=data;
            console.log({desc:"Service data rest query successful",result:data});
            // 
        });
    }
    
    // this.updateQuery();
}