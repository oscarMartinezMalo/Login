app.controller("MainController", function ($scope,$state, $http, AuthenticationService){
 
 if(localStorage['token']){
     token = JSON.parse(localStorage['token']);
 }else{
     token = "Something";
 }
    var token = JSON.parse(localStorage['token']);
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