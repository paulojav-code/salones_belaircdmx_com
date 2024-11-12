<?php
    $DATABASE_NAME_LIST = [
        1 => 'salones_belaircdmx_t'
    ];
    define('DATABASE_USER','webmasterbelair');
    define('DATABASE_PASS','Wbmstr11_');
    define('DATABASE_HOST',IN_PRODUCTION?'localhost:3306':'52.9.201.245:3306');
    define('DATABASE_NAME',$DATABASE_NAME_LIST[$type_api]);
    
    $con = new mysqli(DATABASE_HOST,DATABASE_USER,DATABASE_PASS,DATABASE_NAME);
    if($con->connect_errno){
        echo 'Failed to connect to MySQL: '.$con->connect_error;
        exit();
    }
    $con->query("SET NAMES 'utf8'");
?>