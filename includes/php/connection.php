<?php
    if($_SERVER['SERVER_NAME'] == 'localhost') {
        $DATABASE_HOST = '52.9.201.245:3306';
    }else{
        $DATABASE_HOST = 'localhost:3306';
    }
    $DATABASE_NAME = 'salones_belaircdmx_t';
    $DATABASE_USER = 'webmasterbelair';
    $DATABASE_PASS = 'Wbmstr11_';

    $con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
    if(mysqli_connect_errno()){
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    $con->query("SET NAMES 'utf8'");
?>