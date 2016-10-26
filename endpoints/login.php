<?php
include("../connection.php");
try{
    $data = json_decode(file_get_contents("php://input"));

    $username=$data->username;
    $password=sha1( $data->password);
    $q ="SELECT email FROM users WHERE email='$username' AND password='$password'" ;

    $userInfo = $conn->query($q);
    $userInfo = $userInfo->fetchAll();
    
    $token;
        if(count($userInfo) == 1){
            $token = $username . " | " . uniqid() . uniqid() . uniqid(); 

            $q="UPDATE users SET token=:token WHERE email=:email AND password=:password ";
            $query =$conn-> prepare($q);
            $execute = $query->execute(array(
                ":email" => $username,
                ":password" => $password,
                ":token" => $token
            ));
            echo json_encode($token);            
        }else{
            echo "ERROR";
        }    

}catch(PDOException $e){
    echo $q . "<br>" . $e->getMessage();
}

$conn = null;
?>