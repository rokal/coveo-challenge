angular.module('data',['ngResource']).
        factory('Drink',['$resource',
            function($resource){
                var url='https://cloudplatform.coveo.com/rest/search';
                            // var query='https://cloudplatform.coveo.com/rest/search?callback=JSON_CALLBACK'+"&access_token="+
                            // '6318103b-f9da-437c-854b-9e6f1f44e27b';
                return $resource(url,{},{
                    list:{
                        
                        method: 'GET',
                       params:{access_token:"6318103b-f9da-437c-854b-9e6f1f44e27b"},
                        isArray: false
                    }
                    
                    
                });
            }
        ]);