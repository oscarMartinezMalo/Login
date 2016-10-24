app.controller("MainController", function ($scope,$state, $http, AuthenticationService){
 
 var token ;
 if(localStorage['token']){
     token = JSON.parse(localStorage['token']);
 }else{
     token = "Something";
 }
   
    AuthenticationService.checkToken(token);

    $scope.logout = function(){
        var data = {
            token: token
        }

        $http.post('endpoints/logout.php',data).success(function(response){
            console.log(response);
            localStorage.clear();
            $state.go("login");
        }).error(function(error){
            console.error(error);
        });
    }
})