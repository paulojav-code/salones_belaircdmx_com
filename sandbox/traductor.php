<?php
    $data = file_get_contents("salones_new.json");
    $salones = json_decode($data);
    // echo json_encode($salones);
    $traductor = [];
    $xy = [];
    foreach($salones as $s){
        $name = explode(' ',$s)[0];
        $t[$name.' completo'][] = $s;
    }
    echo json_encode($t);
?>