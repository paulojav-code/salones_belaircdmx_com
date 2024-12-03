<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    $type_api = 1;
    include_once('../includes/php/const.php');
    include_once('../includes/php/connection.php');
    include_once('../includes/php/functions.php');

    $json = json_decode(file_get_contents('php://input'),1);
    // echo json_encode($json);
    // $json = $_REQUEST;

    if(!isset($json['action'])){
        echo json_encode(['error'=>'01','msg'=>'action no definida.']);
        exit();
    }
    $user = [];
    $table = [];
    if(!isset($json['token'])){
        echo json_encode(['error'=>'02','msg'=>'login no definido','login'=>false]);
        exit();
    }
    $user = is_jwt_valid($json['token']);
    if($user == []){
        echo json_encode(['error'=>'03','error'=>'login no existente','login'=>false]);
        exit();
    }
    if(!isset($json['table'])){
        echo json_encode(['error'=>'04','msg'=>'tabla no definida']);
        exit();
    }
    $table = get_table($json['table'],$type_api);
    
    if($table == []){
        echo json_encode(['error'=>'05','msg'=>'tabla no existe']);
        exit();
    }
    $type_action = [
        'select'=>function($p){return query_select($p['con'],$p['api'],$p['user'],$p['table'],$p['json']);},
        'insert'=>function($p){return query_insert($p['con'],$p['api'],$p['user'],$p['table'],$p['json']);},
        'update'=>function($p){return query_update($p['con'],$p['api'],$p['user'],$p['table'],$p['json']);},
        'delete'=>function($p){return query_delete($p['con'],$p['api'],$p['user'],$p['table'],$p['json']);}
    ];
    
    $res = isset($type_action[$json['action']]) ? $type_action[$json['action']](['con'=>$con,'api'=>$type_api,'user'=>$user,'table'=>$table,'json'=>$json]) : ['error'=>'action desconocida'];
    echo json_encode($res);
?>