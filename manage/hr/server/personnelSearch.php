<?php	
	/**
	 * 获取前端content数据
	 */
	$cmd = $_POST['cmd'];

	/**
	 * 判断操作系统
	 * WINNT, Linux
	 */
	$OS = PHP_OS;

	/**
	 * 字符编码
	 * 1: utf8
	 * 0: other
	 */
	$charset = 'utf8'; //
	$chartype = 1;

	/**
	 * 返回前端数据格式
	 * type: 关联数组
	 */
	$response = array(
		'status'=>'success', 
		'total'=>0, 
		'records'=>[],
		'message'=>''
	);

/**
 * database parameter
 */
require_once("../../../config/mysqlConfig.php");
$url = "../../../config/config.xml";
$host = (string)xmlFileRead($url)->usrConfig->host;//"localhost"
$username = (string)xmlFileRead($url)->usrConfig->usrname;//"root"
$psw = (string)xmlFileRead($url)->usrConfig->password;//"1001"
$database = (string)xmlFileRead($url)->usrConfig->database;//

@ $orderMeal = new mysqli($host, $username, $psw, $database);

/**
 * 查询数据库编码
 * 默认编码是utf8
 */
$query = "SHOW VARIABLES LIKE 'character_set_connection'";
$charsetQuery = $orderMeal->query($query);
$charset = $charsetQuery->fetch_assoc()['Value'];
$chartype = ($charset == 'utf8') ? 1 : 0;

$table = "personnel";
$arrayResult = array();

$query = 	"select * 
			from personnel";

$personnel = $orderMeal->query($query);
$total = $personnel->num_rows;

for($i=0;$i<$total;$i++){
	$row = $personnel->fetch_assoc();
	$row = arryConvertEncoding($row, $charset); //转换编码，此函数在库中定义
	$arrayResult[$i] = $row;
}

$response['total'] = $total;
$response['records'] = $arrayResult;
$response['message'] = '中文测试';

//records format
	$records = [ 
		"0"=>[ "recid" => "1", "name" => "李大嘴", "engName" => "Dazui", "sex" =>"1", "age" => "25", "department" => "666" ] ,
		"1"=>[ "recid" => "2", "name" => "李二嘴", "engName" => "Erzui", "sex" =>"0", "age" => "25", "department" => "1" ] ,
		"2"=>[ "recid" => "3", "name" => "李三嘴", "engName" => "Sanzui", "sex" =>"1", "age" => "25", "department" => "1" ] ,
		"3"=>[ "recid" => "4", "name" => "李四嘴", "engName" => "Sizui", "sex" =>"0", "age" => "25", "department" => "1" ] ,
		"4"=>[ "recid" => "5", "name" => "李五嘴", "engName" => "Wuzui", "sex" =>"1", "age" => "25", "department" => "1" ] 
		];

echo json_encode($response);