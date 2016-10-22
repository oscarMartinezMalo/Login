<?php
include("../connection.php");
$data = json_decode(file_get_contents("php://input"));

$password=sha1( $data->password);
$username=$data->username;

$userInfo= $conn->query("SELECT email FROM users WHERE email='$username' AND password='$password'" );
$userInfo = $userInfo->fetchAll();
 
$token;
    if(count($userInfo) == 1){
        $token = $username . " | " . uniqid() . uniqid() . uniqid(); 

        $q="UPDATE users SET token=:token WHERE email=:email AND password=:password ";
        $query =$conn-> prepare($q);
        $execute = $query->execute(array(
            ":token" => $token,
            ":email" => $username,
            ":password" => $password
        ));

        echo json_encode($token);
        
    }else{
        echo "ERROR";
    }



?>