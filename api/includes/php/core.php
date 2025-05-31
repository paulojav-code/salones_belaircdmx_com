<?php
    function api_response($response){
        $http_status = json_decode(file_get_contents('./includes/json/http_status.json'),1);

        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");

        $api_response = [
            'status'=>[
                'code'=>200,
                'message'=>''
            ],
            'data'=>[],
            'error'=>null,
        ];
        
        if (isset($response['error'])) {
            $api_response['status']['code'] = $response['status'];
            $api_response['error'] = $response['error'];
        } else {
            $api_response['data'] = $response['data'];
        }

        $api_response['status']['message'] = $http_status[$api_response['status']['code']];
        http_response_code($api_response['status']['code']);
        echo json_encode($api_response, JSON_UNESCAPED_UNICODE);
    }
    function error_msg($error){
        $error_list = json_decode(file_get_contents('./includes/json/error_hander.json'),1);
        return ['error'=>['code'=>$error,'message'=>$error_list[$error]['message']],'status'=>$error_list[$error]['status']];
    }
    function request_uri(){
        $requestUri = $_REQUEST['uri'] ?? '';
        $uri = trim($requestUri,'/');
        $uri = str_replace('/', '_', $uri);

        if($uri == ''){
            api_response(error_msg('001'));
            exit;
        }

        return $uri;
    }
    function request_token($uri){
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? null;

        if($uri != 'login' && $uri != 'templates_preview_old'){
            if (!$authHeader) {
                api_response(error_msg('002'));
                exit;
            }
            if (strpos($authHeader, 'Bearer ') !== 0) {
                api_response(error_msg('003'));
                exit;
            }
        }

        $token = substr($authHeader, 7);

        if($uri != 'login' && $uri != 'templates_preview_old'){
            if(!valid_jwt($token)){
                api_response(error_msg('100'));
                exit;
            }
        }
        return $token;
    }
    function request_json($uri){
        if(file_get_contents('php://input') !== ''){
            $requestJson = file_get_contents('php://input');
            $json = json_decode($requestJson,1) ?? [];
        }else{
            $json= $_REQUEST;
            unset($json['uri']);
        }

        if($uri != 'login'){
            if(count($json) == 0){
                api_response(error_msg('004'));
                exit;
            }
        }

        return $json;
    }
    function set_services_log($user,$flag,$log){
        // if($s != 1){
        //     unset($d['token']);
        // }
        // $d = json_encode($d);
        // echo json_encode([$u,$s,$f,$d]);

        // 0 eliminado
        // 1 activo / completado
        // 2 desactivado
        // 3 revision

        $sql = 'INSERT INTO '.DATABASE_SERVICES.'.services_log(`id_users`,`id_type_flags`,`log`,`date`) VALUES (?,(SELECT `id_type_flags` FROM '.DATABASE_SERVICES.'.type_flags WHERE name = ?),?,NOW());';
        $params = ['iss',&$user,&$flag,&$log];
        query($sql,$params);
    }
?>