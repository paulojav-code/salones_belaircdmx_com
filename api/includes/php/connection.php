<?php
    function get_connection($database = null){
        $database_name = $database ?? DATABASE_SERVICES;
        $con = new mysqli(DATABASE_HOST,DATABASE_USER,DATABASE_PASS,$database_name);
        if($con->connect_errno){
            api_response(error_msg('009'));
            exit;
        }
        $con->set_charset('utf8mb4');
        return $con;
    }
    function get_database($service){
        $database = isset(SERVICES_INFO[$service]) ? SERVICES_INFO[$service]['DATABASE'] : '';
        return $database;
    }
    function get_table($table,$service){
        $tables_path = './includes/json/tables/'.SERVICES_INFO[$service]['NAME'].'/';
        $table_file = $tables_path . $table . '.json';
        if (!file_exists($table_file)) {
            api_response(error_msg('016'));
            exit;
        }
        $table = json_decode(file_get_contents($table_file),1);
        return $table;
    }
    function query($sql,$params=[],$database = null){
        $response = [];
        $con = get_connection($database);
        try{
            $stmt = $con->prepare($sql);
            if(count($params) > 1){
                call_user_func_array([$stmt,'bind_param'],$params);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            if(isset($result->num_rows) && $result->num_rows > 0){
                while($row = $result->fetch_array(MYSQLI_ASSOC)){
                    $response[] = $row;
                }
            }
            return $response;
        }catch(Throwable $th){
            $error = error_msg('010');
            $error['error']['error_sql'] = $con->error;
            $error['error']['query'] = $sql;
            return $error;
        }
    }
    function _query($con,$sql,$params = [],$insert_id = false){
        $res = [];
        try{
            $stmt = $con->prepare($sql);
            if($params != []){
                call_user_func_array([$stmt,'bind_param'],$params);
            }
            $stmt->execute();
            
            $result = $stmt->get_result();
            if(isset($result->num_rows) && $result->num_rows > 0){
                while($row = $result->fetch_array(MYSQLI_ASSOC)){
                    $res[] = $row;
                }
            }else if($insert_id){
                $res['insert_id'] = $con->insert_id;
            }
            return $res;
        }catch(Throwable $th){
            return ['error'=>$con->error,'query'=>$sql];
        }
    }
?>