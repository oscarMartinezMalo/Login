<?php
    include("../connection.php");
    $data =json_decode(file_get_contents("php://input"));
    
    $username = $data->username;
    $password = sha1($data->password);

    $q = "INSERT INTO users(email, password) VALUES (:email, :password)";
    $query = $conn->prepare($q);
    $execute = $query->execute(array(
        ":email" => $username,
        ":password" => $password 
    ));
    echo json_encode($username);
?>