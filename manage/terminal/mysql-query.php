<?php

error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE );//don't echo warnning & notice

require_once('yangLib.php');

$json = $_POST['data'];

$data = json_decode($json);//String -> Object
$cmd = $data->content->cmd;//获取指令
$usrInfo = $data->content->connection->usr_info;//获取用户信息 user:password@host

$pattern = "/^mysql -h|^mysql -u/";//mysql登陆表达式

if( preg_match( $pattern, $cmd) ){//判断是否需要登陆mysql
	$patterns = array( "/-h [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|-h [a-zA-Z0-9\-\.]+/", 
					  "/-u [a-zA-Z0-9_\-\.]+/", 
					  "/-p .*/");
	$matches = preg_match_patterns($patterns, $cmd);//字符串匹配多个条件，获取用户信息

	@ $mysqli = new mysqli("$matches[0]", "$matches[1]", "$matches[2]");
	// $content = array("connection"=>'');
	$connection = array("usr_info"=>'');
	if($mysqli->connect_errno){//connect mysql fail!
		$connection['connect_errno'] = $mysqli->connect_errno;
		$connection['connect_error'] = $mysqli->connect_error;
		$connection['host_info'] = $mysqli->host_info;
		$content = array("connection"=>$connection,
						 "queryResult"=>"Unable to connect Mysql!");
		$connectMsg = new mysqlMsg( 0, $content, 1 );
	}
	else{//connect mysql success!
		$connection['host_info'] = $mysqli->host_info;
		$connection['usr_info'] =  "$matches[1]:$matches[2]@$matches[0]";
		$content = array("connection"=>$connection,
						 "queryResult"=>"Mysql Connected!");
		$connectMsg = new mysqlMsg( 1, $content, 1 );
	}
	@ $mysqli->close();

	echo json_encode($connectMsg);
}
else{
	$matches = preg_split("/:|@/", $usrInfo);//分解用户信息

	if( $matches[0] != '' && $matches[0] != null ){//usrname can't null!
		@ $mysqli = new mysqli("$matches[2]", "$matches[0]", "$matches[1]");//connect to mysql
		//组织查询结果消息格式
		$connection['host_info'] = $mysqli->host_info;
		$connection['usr_info'] =  "$matches[0]:$matches[1]@$matches[2]";
		$content = array("connection"=>$connection);

		if($mysqli->connect_errno){//connect mysql fail!
			$connection['connect_errno'] = $mysqli->connect_errno;
			$connection['connect_error'] = $mysqli->connect_error;
			$connection['usr_info'] = null;
			$content = array("connection"=>$connection,
						 "queryResult"=>"Unable to connect Mysql!");
			$connectMsg = new mysqlMsg( 0, $content, 1 );
		}
		else{//connect mysql success!
			$database = $data->content->database;//取出database
			// $result = $mysqli->query($cmd);//执行指令
			$content["database"] = $database;//若不更换数据库，则使用上一次的数据库

			//judge cmd type
			$keyWord = preg_match( '/^ *[a-zA-Z]+ +/', $cmd, $keyWords) ? $keyWords[0] : null;//提取指令
			$keyWord = trim($keyWord);
			switch($keyWord){//判断DDL、DML、DCL、DQL
				case ('USE'|'use'):
					$database = preg_match( '/ *[a-zA-Z]+$/', $cmd, $databases) ? $databases[0] : null ;
					$database = trim($database);
					$content["queryResult"] = "Database changed";
					break;
				case ('CREAT'|'creat'):
					$content["queryResult"] = "Query OK, 1 rows affected";
					break;
				case ('DROP'|'drop'):
					$content["queryResult"] = "Query OK, 0 rows affected";
					break;
				case ('ALTER'|'alter'):
					$content["queryResult"] = "Query OK, 1 rows affected";
					break;
				default://DQL cmd
					if($database!='' && $database!=null){//database exit!
						$mysqli->select_db($database);
						if($mysqli->errno){}//数据库选择失败
						else{
							$result = $mysqli->query($cmd);//执行mysql指令
							/*$content["queryResult"] = $result;
							$connectMsg = new mysqlMsg( 1, $content, 1 );
							echo json_encode($connectMsg);*/
						}
					}
					else{}//database haven selected yet!
					break;
			}//判断DDL、DML、DCL、DQL

			$result = $mysqli->query($cmd);//
			//判断指令执行情况
			if($mysqli->errno/* == 1046*/){//No database selected
				$content["queryResult"] = $mysqli->error;
			}
			else{
				$content["database"] = $database;
				$content["queryResult"] = //将查询结构返回到窗口
					is_object($result) ? $result->fetch_all(MYSQLI_ASSOC) : $result;
			}
			
			if(is_object($result)) $result->free();
			@ $mysqli->close();
			$connectMsg = new mysqlMsg( 1, $content, 1 );
			echo json_encode($connectMsg);
		}
	}
}


/**
 * 消息类
 * @param $content: Array   -> connection -> 
 * 							-> database
 * 							-> queryResult
 */
class mysqlMsg
{
	public $query = 0;								//表示指令执行有无错误
	public $content = array("queryResult"=>'');		//remote返回消息
	public $status = 0;								//通信状态

	function __construct($query, $content, $status){
		$this->query   = $query;
		$this->content = $content;
		$this->status  = $status;
	}

	function __destruct(){

	}
}