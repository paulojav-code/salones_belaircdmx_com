<?php
    function request_events($json,$token){
        $service = 1;
        return request_crud($json,$token,$service);
    }
?>