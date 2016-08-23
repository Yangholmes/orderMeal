<?php

require_once '../yang-mysql-lib/yang-mysql-class.php'; //

/**
 * this method is to login
 */
function login($username, $password){
	$login = new yangMysql();
	$password = sha1($password);
	$login->simpleSelect(null,"username='$username' and password='$password'", null, null);
	if($login->row==1)
		return true;
	else
		return false;
}

/**
 * for example
 */
// echo json_encode(login("yangholmes", "1001"));