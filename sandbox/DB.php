<?php
    include_once('../api/config/conection.php');
    
    $salon = [];
    $sql = "SELECT * FROM cal_items ORDER BY last_updated";
    $result = $con->query($sql);

    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        // echo "id: " . $row["id"]. " - Date: " . date("Y-m-d H:i:s",$row["date"]). "- caption: " . $row["caption"]. "-Description".$row["description"]."<br>";
        $c = trim(strtolower($row['caption']));
        if(!in_array($c,$salon)){
            array_push($salon,$c);
        }
    }
    foreach ($salon as $s){
        echo $s . "<br>";
    }

} else {
    echo "0 results";
}
    $con->close();
?>