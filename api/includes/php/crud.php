<?php
    function request_crud($json,$token,$service,$querys=[]){
        $crud_functions = [
            'select'=>'query_select',
            'insert'=>'query_insert',
            'update'=>'query_update',
            'delete'=>'query_delete',
            'foreign'=>'query_foreign'
        ];
        // $crud_functions = array_merge($crud_functions,$functions);

        if (!isset($json['action'])) {
            return error_msg('013');
        }
        if (!isset($crud_functions[$json['action']])){
            return error_msg('014');
        }
        if (!isset($json['table'])) {
            return error_msg('015');
        }

        $table = get_table($json['table'],$service);
        $database = get_database($service);
        $jwt = valid_jwt($token);
        $user = $jwt['id_users'];
        
        $flag = SERVICES_INFO[$service]['FLAGS'][$json['action']];
        $options = $json['options'] ?? [];

        $request = [
            'database'=>$database,
            'table'=>$table,
            'user'=>$user,
            'flag'=>$flag,
            'options'=>$options,
            'querys'=>$querys
        ];

        if(isset($querys[$json['action']])){
            if(!is_array($querys[$json['action']])){
                return call_user_func($querys[$json['action']], $request);
            }else{
                if(isset($querys[$json['action']][$table['name']])){
                    return call_user_func($querys[$json['action']][$table['name']], $request);
                }
                // return ['data'=>$querys[$json['action']][$table['name']]];
            }
        }
        return call_user_func($crud_functions[$json['action']], $request);

    }
    function query_select($request){
        $database = $request['database'];
        $table    = $request['table'];
        $options  = $request['options'];
        $querys   = $request['querys'];
        // $user     = $request['user'];
        // $flag     = $request['flag'];

        $params = [''];
        // COLUMNS
        $columns = isset($options['columns']) ? implode(', ',$options['columns']) : "t0.*";
        // JOINS
        $join_list = [];
        if(isset($options['join']) && is_array($options['join'])){
            $table_number = 0;
            foreach($options['join'] as &$element){
                $type = strtoupper($element['type']);
                $join_table = $element['table'];
                $condition = $element['condition'];
                $table_number++;
                $join_list[] = " " . $type . " JOIN `" . $join_table . "` AS t" . $table_number . " ON " . $condition;
            }
        }
        $join = count($join_list) > 0 ? implode(" ",$join_list) : "";
        // WHERE
        $where_list = [];
        if(isset($options['where']) && is_array($options['where'])){
            foreach($options['where'] as &$element){
                $column = $element[0];
                $values = &$element[1];
                $operador = $element[2] ?? '=';
                $type = $element[3] ?? 's';
                if(!is_array($values)){
                    $where_list[] = $column." " . $operador . " ?";
                    $params[0] .= $type;
                    $params[] = &$values;
                }else{
                    $placeholder = array_fill(...[0, count($values), '?']);
                    foreach($values as &$value){
                        $params[0] .= $type;
                        $params[] = &$value;
                    }
                    $where_list[] = $column." IN(" . implode(', ',$placeholder) . ")";
                }
            }
        }
        $where = count($where_list) > 0 ? " WHERE " . implode(" AND ",$where_list) : "";
        // ORDER
        $group = isset($options['group']) ? " GROUP BY " . $options['group'] : "";
        // ORDER
        $order = isset($options['order']) ? " ORDER BY " . $options['order'] : "";
        // LIMIT
        $limit = "";
        if(isset($options['limit'])){
            $limit = " LIMIT ?";
            $params[0] .= "i";
            $params[] = &$options['limit'];
        }
        // OFFSET
        $offset = "";
        if(isset($options['offset'])){
            $offset = " OFFSET ?";
            $params[0] .= "i";
            $params[] = &$options['offset'];
        }

        $sql = "SELECT " . $columns . " FROM `" . $table['name'] . "` AS t0" . $join . $where . $group . $order . $limit . $offset . ";";

        $response = query($sql,$params,$database);
        if(isset($response['error'])){
            return $response;
        }else{
            return ['data'=>$response];
        }
    }
    function query_insert($request){
        $database = $request['database'];
        $table    = $request['table'];
        $options  = $request['options'];
        $user     = $request['user'];
        $flag     = $request['flag'];

        $params = [''];
        $columns = [];
        $values = [];
        $uniques_list = [];
        $unique_count = 0;
        
        foreach($table['columns'] as $column){
            if(!isset($column['default']) || !$column['default']){
                $columns[] = $column;
                $values[] = '`'.$column['name'].'`';
                $params[0] .= $column['var'];
            }
            if(!isset($column['unique']) || !$column['unique']){
                if($column['name'] != $table['id']){
                    $uniques_list[] = "`" . $column['name'] . "` = VALUES(" . $column['name'] . ")";
                }
            }else{
                $unique_count++;
            }
        }
        
        foreach($columns as $column){
            if(!isset($options['columns'][$column['name']])){
                return error_msg('012');
            }
            $params[] = &$options['columns'][$column['name']];
        }
        $placeholder = array_fill(...[0, count($columns), '?']);

        $unique = "";
        if($unique_count > 0){
            $unique = " ON DUPLICATE KEY UPDATE " . implode(', ',$uniques_list);
        }
        
        $sql = "INSERT INTO `" . $table['name'] . "` (" . implode(', ',$values) . ") VALUES (" . implode(', ',$placeholder) . ")" . $unique . ";";
        
        $response = query($sql,$params,$database);
        if(isset($response['error'])){
            return $response;
        }else{
            set_services_log($user,$flag,json_encode(['table'=>$table,'options'=>$options]));
            return ['data'=>$response];
        }
    }
    function query_update($request){
        $database = $request['database'];
        $table    = $request['table'];
        $options  = $request['options'];
        $user     = $request['user'];
        $flag     = $request['flag'];

        $params = [''];
        $values = [];

        if(!isset($options['columns'][$table['id']]) || $options['columns'][$table['id']] == ''){
            return error_msg('011');
        }
        foreach($table['columns'] as $column){
            if(isset($options['columns'][$column['name']])){
                if($column['name'] != $table['id']){
                    $values[] = '`'.$column['name'].'` = ?';
                    $params[0] .= $column['var'];
                    $params[] = &$options['columns'][$column['name']];
                }
            }
        }
        if(count($values) == 0){
            return error_msg('012');
        }

        $params[0] .= 'i';
        $params[] = &$options['columns'][$table['id']];

        $sql = "UPDATE `" . $table['name'] . "` SET " . implode(', ',$values) . " WHERE " . $table['id'] . " = ?;";
        
        $response = query($sql,$params,$database);
        if(isset($response['error'])){
            return $response;
        }else{
            set_services_log($user,$flag,json_encode(['table'=>$table,'options'=>$options]));
            return ['data'=>$response];
        }
    }
    function query_delete($request){
        $database = $request['database'];
        $table    = $request['table'];
        $options  = $request['options'];
        $user     = $request['user'];
        $flag     = $request['flag'];

        if(!isset($options['columns'][$table['id']]) || $options['columns'][$table['id']] == ''){
            return error_msg('011');
        }

        $params = ['i',&$options['columns'][$table['id']]];
        $sql = 'UPDATE `'.$table['name'].'` SET `active` = 0 WHERE '.$table['id'].' = ?;';

        $response = query($sql,$params,$database);
        if(isset($response['error'])){
            return $response;
        }else{
            set_services_log($user,$flag,json_encode(['table'=>$table,'options'=>$options]));
            return ['data'=>$response];
        }
    }
    function query_foreign($request){
        $database = $request['database'];
        $table    = $request['table'];
        $options  = $request['options'];
        // $user     = $request['user'];
        // $flag     = $request['flag'];

        $foreign  = $options['foreign'];

        $params = [''];

        $columns = isset($options['columns']) ? implode(', ',$options['columns']) : "t0.*";

        $join = "";
        $where_list = [];
        if(isset($options['where']) && is_array($options['where'])){
            foreach($options['where'] as &$element){
                $column = $element[0];
                $values = &$element[1];
                $operador = $element[2] ?? '=';
                $type = $element[3] ?? 's';
                if(!is_array($values)){
                    $where_list[] = $column." " . $operador . " ?";
                    $params[0] .= $type;
                    $params[] = &$values;
                }else{
                    $placeholder = array_fill(...[0, count($values), '?']);
                    foreach($values as &$value){
                        $params[0] .= $type;
                        $params[] = &$value;
                    }
                    $where_list[] = $column." IN(" . implode(', ',$placeholder) . ")";
                }
            }
        }
        $where = count($where_list) > 0 ? " WHERE " . implode(" AND ",$where_list) : "";
        $group = "";
        $order = "";
        $limit = "";
        $offset = "";

        $sql = "SELECT " . $columns . " FROM `" . $table['name'] . "` AS t0" . $join . $where . $group . $order . $limit . $offset . ";";

        $response = query($sql,$params,$database);
        if(isset($response['error'])){
            return $response;
        }else{
            $list = [];
            foreach($response as $element){
                $id_name = $foreign['id'] ?? $table['id'];
                $list[] = ['id'=>$element[$id_name],'name'=>$element[$foreign['column']]];
            }
            return ['data'=>$list];
        }
    }
?>