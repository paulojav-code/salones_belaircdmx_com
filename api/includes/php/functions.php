<?php
    function query($con,$sql,$params = []){
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
            }
            return $res;
        }catch(Throwable $th){
            return ['error'=>$con->error];
        }
    }
    function get_table($t,$j){
        $json = [
            'salones' => 'salones_belaircdmx.json'
        ];
        $tables = json_decode(file_get_contents('../includes/json/'.$json[$j]),1);

        if(isset($tables[$t])){
            return $tables[$t];
        }
        return [];
    }
    function base64url_encode($str){
        return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
    }
    function is_jwt_valid($jwt,$secret=SECRET_JWT){
        try{
            $tokenParts = explode('.', $jwt);
            $header = base64_decode($tokenParts[0]);
            $payload = base64_decode($tokenParts[1]);
            $signature_provided = $tokenParts[2];

            $payload_data = json_decode($payload,1);
            $expiration = $payload_data['exp'];
            $is_token_expired = ($expiration - time()) < 0;
        
            $base64_url_header = base64url_encode($header);
            $base64_url_payload = base64url_encode($payload);
            $signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $secret, true);
            $base64_url_signature = base64url_encode($signature);
        
            $is_signature_valid = ($base64_url_signature === $signature_provided);
            
            if($is_token_expired || !$is_signature_valid){
                return [];
            }else{
                return $payload_data;
            }
        }catch(Throwable $th){
            return [];
        }
    }
    function query_select($con,$s,$user,$t,$j){
        $res = [];
        if(!isset($j['select_type'])){
            $j['select_type'] = 'all';
        }

        $id = [];
        if(isset($j['id_foreign'])){
            $id['name'] = $j['id_foreign']['name'];
            $id['var'] = $j['id_foreign']['id'];
        }else if(isset($j['id'])){
            $id['name'] = $t['id'];
            $id['var'] = $j['id'];
        }

        $type_colums = [
            'all'=>'*',
            'foreign'=>$t['id'].' AS `id`,name',
            'files'=>'id_files AS `id`,name,url_file AS `url`'
        ];
        $columns = $type_colums[$j['select_type']];

        if($s == 2 && $t['name'] == 'styles' && $id['name'] == 'id_pages'){
            $sql = 'SELECT t1.id_styles,t1.id_type_styles,t1.id_pages,t1.style,IF(t2.type = 0,t4.name,t3.name) AS style_name,t1.active 
            FROM '.DATABASE_NAME.'.`styles` AS t1 
            INNER JOIN type_styles AS t2 ON t1.id_type_styles = t2.id_type_styles
            LEFT JOIN type_styles_options AS t3 ON t1.style = t3.id_type_styles_options
            LEFT JOIN colors AS t4 ON t1.style = t4.id_colors
            WHERE t1.`active` > 0';
            $res = query($con,$sql.' AND t1.'.$id['name'].' = ?;',['i',&$id['var']]);
        }else{
            $sql = 'SELECT '.$columns.' FROM '.DATABASE_NAME.'.`'.$t['name'].'` WHERE `active` > 0';
            if($id){
                $res = query($con,$sql.' AND '.$id['name'].' = ?;',['i',&$id['var']]);
            }else{
                $res = query($con,$sql.';');
            }
        }
        return $res;
    }
    function query_insert($con,$s,$user,$t,$j){
        $res = [];
        $columns = [];
        $params = [''];
        $values = [];
        $insert = [];
        
        foreach($t['columns'] as $i){
            if(!isset($i['default']) || !$i['default']){
                $columns[] = $i;
                $values[] = '`'.$i['name'].'`';
                $params[0] .= $i['var'];
                $insert[] = '?';
            }
        }

        foreach($columns as $i){
            if(!isset($j['columns'][$i['name']])){
                return ['error'=>'campos faltantes: '.$i['name']];
            }
            $params[] = &$j['columns'][$i['name']];
        }
        
        $sql = 'INSERT INTO '.DATABASE_NAME.'.`'.$t['name'].'` ('.implode(', ',$values).') VALUES ('.implode(', ',$insert).');';

        $res = query($con,$sql,$params);

        if(isset($res['error'])){
            return $res;
        }else{
            set_audit($con,$s,$j,$user);
            return ['query'=>'insert','table'=>$t['name']];
        }
    }
    function query_update($con,$s,$user,$t,$j){
        $res = [];
        $values = [];
        $params = [''];

        if(!isset($j[$t['id']])||$j[$t['id']]==''){
            return ['error'=>'id no existe'];   
        }
        foreach($t['columns'] as $i){
            if(isset($j['columns'][$i['name']])){
                if($i['name'] != $t['id']){
                    $values[] = '`'.$i['name'].'`'.' = ?';
                    $params[0] .= $i['var'];
                    $params[] = &$j['columns'][$i['name']];
                }
            }
        }
        if($values==[]){
            return ['error'=>'parametros faltantes'];   
        }

        $params[0] .= 'i';
        $params[] = &$j[$t['id']];

        $sql = 'UPDATE '.DATABASE_NAME.'.`'.$t['name'].'` SET '.implode(', ',$values).' WHERE '.$t['id'].' = ?;';

        $res = query($con,$sql,$params);

        if(isset($res['error'])){
            return $res;
        }else{
            set_audit($con,$s,$j,$user);
            return ['query'=>'update','table'=>$t['name']];
        }
    }
    function query_delete($con,$s,$user,$t,$j){
        $res = [];
        $active = '0';

        if(!isset($j['id'])||$j['id']==''){
            return ['error'=>'id no existe'];   
        }

        if(isset($j['delete'])){
            if($j['delete']){
                $active = '1';
            }else{
                $active = '0';
            }
        }

        $sql = 'UPDATE '.DATABASE_NAME.'.`'.$t['name'].'` SET `active`='.$active.' WHERE '.$t['id'].' = ?;';
        $params = ['i',&$j['id']];
        $res = query($con,$sql,$params);
    
        if(isset($res['error'])){
            return $res;
        }else{
            set_audit($con,$s,$j,$user);
            return ['query'=>'delete','table'=>$t['name']];
        }
    }
    function set_audit($con,$s,$d,$u){
        unset($d['token']);
        $a = json_encode($d);
        query($con,'INSERT INTO '.DATABASE_SERVICES.'.audits(`id_users`,`id_type_services`,`request`,`date`) VALUES (?,?,?,NOW());',['iis',&$u['id_users'],&$s,&$a]);
    }
?>