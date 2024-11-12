<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $type_api = 1;
    include_once('../includes/php/const.php');
    include_once('../includes/php/connection.php');
    include_once('../includes/php/functions.php');

    $j = json_decode(file_get_contents('php://input'),1);
    $res = [];
    if(isset($j['token'])){
        $res = is_jwt_valid($j['token']);
        $res = ['login'=>($res!=[])? true:false];
    }else{
        if(!isset($j['username'])){
            echo json_encode(['login'=>false,'error'=>'usuario no declarado']);
            exit();
        }        
        $res = query_login($con,$j);
    }
    echo json_encode($res);

    function query_login($c,$j){
        $res = query($c,'SELECT * FROM '.DATABASE_NAME.'.users WHERE `username` = ? AND `active` = 1;',['s',&$j['username']]);
        if($res == []){
            return ['login'=>false,'error'=>'usuario no existe'];
        }
        $res = $res[0];
        if($res['password'] != $j['password']){
            return ['login'=>false,'error'=>'password incorrecta'];
        }
        $headers = array('alg'=>'HS256','typ'=>'JWT');
        $payload = array('id_users'=>$res['id_users'],'exp'=>(time() + (2 * 60 * 60)));

        $jwt = generate_jwt($headers,$payload);

        query($c,'INSERT INTO '.DATABASE_NAME.'.audits(`id_users`,`id_type_services`,`request`,`date`) VALUES (?,1,?,NOW());',['is',&$res['id_users'],&$jwt]);

        return ['login'=>true,'id_users'=>$res['id_users'],'username'=>$res['username'],'type'=>$res['id_type_users'],'token'=>$jwt];
    }
    function generate_jwt($h,$p, $s=SECRET_JWT) {
        $headers_encoded = base64url_encode(json_encode($h));
        $payload_encoded = base64url_encode(json_encode($p));
        $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $s, true);
        $signature_encoded = base64url_encode($signature);
        $jwt = "$headers_encoded.$payload_encoded.$signature_encoded";
        return $jwt;
    }
?>