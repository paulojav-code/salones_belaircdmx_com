<?php
    $servername = "10.156.122.17";
    $username = "webmaster01";
    $password = "Sitraftp$";
    $dbname = "ba_planner_old";
    // Create connection
    $con = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }

    function get_connection(){
        $servername = "10.156.122.17";
        $username = "webmaster01";
        $password = "Sitraftp$";
        $database_name = "ba_planner_old";
        $con = new mysqli($servername,$username,$password,$database_name);
        if($con->connect_errno){
            die("Connection failed: " . $con->connect_error);
            exit;
        }
        $con->set_charset('utf8mb4');
        return $con;
    }
    function query($sql, $params = []){
        $response = [];
        $con = get_connection();
        try {
            $stmt = $con->prepare($sql);
            if (count($params) > 1) {
                call_user_func_array([$stmt, 'bind_param'], $params);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            if (isset($result->num_rows) && $result->num_rows > 0) {
                while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                    $response[] = $row;
                }
            }
            return $response;
        } catch (Throwable $th) {
            $error = error_msg('010');
            $error['error']['error_sql'] = $con->error;
            $error['error']['query'] = $sql;
            return $error;
        }
    }
