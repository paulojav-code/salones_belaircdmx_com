<?php
    include_once('api/includes/php/functions.php');
    include_once('includes/php/connection.php');
    $sql = 'SELECT * FROM itinerario WHERE active = 1';
    $res = query($con,$sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salones</title>
    <script defer type="module" src="assets/js/main.js"></script>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/login.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="assets/css/modal.css">
    <link rel="stylesheet" href="assets/css/itinerario.css">
    <script src="https://kit.fontawesome.com/0b2028ec27.js" crossorigin="anonymous"></script>
</head>

<body>
    <section id="main" class="container">
        <header></header>
        <div class="content">
            <section id="tab_titles">
                
            </section>
        </div>
    </section>
</body>

</html>