app.controller("LoginController", function($scope, $http, $state){
    //Variables
    $scope.myVar='showSignUp';
    $scope.actionMethod= "signUserUp";
    
    $scope.signUpInfo={
        username:undefined,
        password:undefined
    }

     $scope.loginInfo={
        username:undefined,
        password:undefined
    }
        $("#openModal").click(function(){
                $("#myModal").modal("show");
        });

        $("#myModal").on('hidden.bs.modal', function () { 
            document.getElementById("onlyForm").reset();
            $scope.myForm.$setPristine();
            $scope.myForm.$setValidity();
            $scope.myForm.$setUntouched();
             $scope.$apply();
        });

    //Functions
    $scope.signUserUp =function (){
        //Fade out the back grey screen
        $(".modal-backdrop").remove();

        var data= {
            username: $scope.signUpInfo.username,
            password: $scope.signUpInfo.password
        }
        $http.post('endpoints/signup.php',data).success(function(response){
            if(response == "User and Password are required")
            {
              //alert("User and password required");
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
    };

    $scope.loginUser = function (){
        //Fade out the back grey screen
        $(".modal-backdrop").remove();
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
});

 
