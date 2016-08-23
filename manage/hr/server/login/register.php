<?php

require_once '../yang-mysql-lib/yang-mysql-class.php'; //

/**
 * this method is to regist a user
 */
function register($username, $password, $email, $protection=null){
	$registration = new yangMysql();
	$registration->simpleSelect(null,"username = '$username'", null, null);
	if($registration->row!=0)
		return false;
	$registration->insert([	"username"=>$username, 
							"password"=>sha1($password), // encryption
							"email"=>$email, 
							"protection"=>$protection ]);
	return true;
}

/**
 * for example
 */
register("yangholmes", "1001", "yangholmes@126.com", null);