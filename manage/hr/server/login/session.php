<?php

session_start();

if(isset($_SESSION['valid_usr'])){
	echo "you have already in!";
	echo "you are ".$_SESSION['valid_usr'];
}
else{
	$_SESSION['valid_usr'] = "yang";
	echo "you are going in!";
}