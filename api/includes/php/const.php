<?php
    define('IN_PRODUCTION',($_SERVER['SERVER_NAME'] != 'localhost'));
    define('IN_DEVELOPMENT', !IN_PRODUCTION);
    define('SECRET_JWT', 'secret');

    define('DATABASE_USER','webmasterbelair');
    define('DATABASE_PASS','Wbmstr11_');
    define('DATABASE_HOST',IN_PRODUCTION ? 'localhost:3306' : '52.9.201.245:3306');
    // define('DATABASE_USER','root');
    // define('DATABASE_PASS','');
    // define('DATABASE_HOST','localhost:3306');

    define('URL_FILES',IN_PRODUCTION ? 'C:/inetpub/wwwroot/itrip_mx/services/_v2_1/files/' : 'C:/xampp/htdocs/web/ba_services/files/');

    define('DATABASE_SERVICES','admin_ba_services_t');
    define('SERVICES_INFO',json_decode(file_get_contents('./includes/json/services_info.json'),1));

    define('DATABASE_BOOKERS','admin_ba_tokens_t');
    define('DATABASE_TEMPLATES','admin_ba_templates_t');
?>