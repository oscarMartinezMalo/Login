<?php
    try{
        include("../connection.php");
        $data =json_decode(file_get_contents("php://input"));

        $username = $data->username;
        $password = sha1($data->password);
        $token = $username . " | " . uniqid() . uniqid() . uniqid();;

        $q = "INSERT INTO users(email, password, token) VALUES (:email, :password, :token)";
        $query = $conn->prepare($q); 
        $execute = $query->execute(array(
            ":email" => $username,
            ":password" => $password,
            ":token" =>  $token
        ));

        $result = array('username'=>$username,
                        'token'=>$token);
        echo json_encode($result);

    }catch(PDOException $e){
         echo "Error: " . $e->getMessage();
    }  
?>