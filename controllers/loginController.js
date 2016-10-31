  app.controller("LoginController", function($scope, $http, $state){
    //Variables
    $scope.signUpInfo={
        username:undefined,
        password:undefined
    }

     $scope.loginInfo={
        username:undefined,
        password:undefined
    }
    
    //Functions
    $scope.signUserUp =function (){

        if($scope.myForm.$valid){
            var data= {
                username: $scope.signUpInfo.username,
                password: $scope.signUpInfo.password
            }

            $http.post('endpoints/signup.php',data).success(function(response){
                if(response == "User and Password are required")
                {
                alert(response);
                }else
                {
                    console.log(response.token);
                    console.log(response.username);
                    localStorage.setItem("token",response.token);
                    $state.go("application");
                }
            
            }).error(function(error){
                console.error(error);
            });
        }

    };

    $scope.loginUser = function (){
        var data= {
            username: $scope.loginInfo.username,
            password: $scope.loginInfo.password
        }

        $http.post('endpoints/login.php',data).success(function(response){
            console.log(response);
            localStorage.setItem("token",JSON.parse(response));
            $state.go("application");

        }).error(function(error){
            console.error(error);
        });
    };
    //Init
})

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




