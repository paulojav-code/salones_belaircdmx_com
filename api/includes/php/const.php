<?php
    define('IN_PRODUCTION',($_SERVER['SERVER_NAME'] != 'localhost'));
    const IN_TEST_MODE = true;
    const SECRET_JWT = 'secret';
?>