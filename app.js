var app= angular.module("UserAuthTutorial",["ui.router","ngMessages"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
$urlRouterProvider.otherwise('/');
    $stateProvider
    .state("login", {
        url:"/",
        controller:"LoginController",
        templateUrl:"views/login.html"
    })

    .state("application", {
        url:"/app",
        controller:"MainController",
        templateUrl: "views/application.html",
        params: {'test': null}
    })
}]);


var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};
 app.directive("compareTo", compareTo);

 app.directive('overwriteEmail', function() {
    var EMAIL_REGEXP = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    
  return {
    require: '?ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});

$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal("show");
    });
        $("#myModal").on('hidden.bs.modal', function () {
            alert('The modal is now hidden.');
    });
});

       