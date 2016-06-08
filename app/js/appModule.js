angular.module('app',["ngResource","ngRoute"])
    .constant("API_BASE_URL","https://cloudplatform.coveo.com/rest/search"+
                    "?access_token=6318103b-f9da-437c-854b-9e6f1f44e27b")
    .constant("CSS_ACTIVE_CLASS","active")
    .filter('secs',function(){
        return function (millisecs) {
            return millisecs/1000 +" sec";
        }
    })
    .config(['$routeProvider','$compileProvider',
    function config( $routeProvider,$compileProvider) {
        $compileProvider.debugInfoEnabled(false);
        
        $routeProvider.
            when("/", {
                templateUrl: "./partials/mainView.html",
                controller: "appCtrl"
            }).
            otherwise({ redirectTo: '/' });
    }
  ]);;