<?php

require_once('yangLib.php');

$json = $_POST['data'];

$data = json_decode($json);//Obj

$cmd = $data->content->cmd;//获取指令

$pattern = "/^mysql -h|^mysql -u/";//mysql登陆表达式

if( preg_match( $pattern, $cmd) ){//判断是否需要登陆mysql
	$patterns = array( "/-h [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|-h [a-zA-Z0-9\-\.]+/", 
					  "/-u [a-zA-Z0-9_\-\.]+/", 
					  "/-p .+/");
	$matches = preg_match_patterns($patterns, $cmd);

	@ $mysqli = new mysqli("$matches[0]", "$matches[1]", "$matches[2]");
	$content = array("queryResult"=>'');
	if($mysqli->connect_errno){
		$content['connect_errno'] = $mysqli->connect_errno;
		$content['connect_error'] = $mysqli->connect_error;
		$content['host_info'] = $mysqli->host_info;	
		$connectMsg = new mysqlMsg( 0, $content, 1 );
	}
	else{
		$content['host_info'] = $mysqli->host_info;
		$content['usr_info'] =  "$matches[1]:$matches[2]@$matches[0]";
		$connectMsg = new mysqlMsg( 1, $content, 1 );
	}
	// $result = $mysqli->query ( "use ordermeal" );
	// $result = $mysqli->query ( "select * from personnel" );
	// echo json_encode($result);
	echo json_encode($connectMsg);
}

class mysqlMsg
{
	public $query = 0;
	public $content = array("queryResult"=>'');
	public $status = 0;

	function __construct($query, $content, $status){
		$this->query   = $query;
		$this->content = $content;
		$this->status  = $status;
	}

	function __destruct(){

	}
}