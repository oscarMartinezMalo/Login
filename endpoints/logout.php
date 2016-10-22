<?php
include("../connection.php");

$data = json_decode(file_get_contents("php://input"));
$token = $data->token;

$db = $conn->query("UPDATE users SET token='LOGED OUT' WHERE token=$token");
echo "success";

?>