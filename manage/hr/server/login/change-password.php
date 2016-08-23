<?php

require_once '../yang-mysql-lib/yang-mysql-class.php'; //

/**
 * this method is to regist a user
 */
function change_password($username, $new_password){
	$change = new yangMysql();
	$change->update(["password"=>sha1($new_password)], "username='$username'", null, null);
	if($change->row!=0)
		return false;
	return true;
}

/**
 * for example
 */
// change_password("yangholmes", "1111");