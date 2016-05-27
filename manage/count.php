<?php

	/**
	 * 
	 */
	$content = $_POST['content'];

	/**
	 * 判断操作系统
	 * WINNT, Linux
	 */
	$OS = PHP_OS;
	
	/**
	 * 返回前端数据格式
	 * type: 关联数组
	 */
	$response = array(
		'queryType'=>0, 
		'content'=>'', 
		'status'=>0
	);



/**
 * database parameter
 */
require_once("../config/mysqlConfig.php");
$url = "../config/config.xml";
$host = (string)xmlFileRead($url)->usrConfig->host;//"localhost"
$username = (string)xmlFileRead($url)->usrConfig->usrname;//"root"
$psw = (string)xmlFileRead($url)->usrConfig->password;//"1001"
$database = (string)xmlFileRead($url)->usrConfig->database;//"orderMeal"

@ $orderMeal = new mysqli($host, $username, $psw, $database);
if ($orderMeal->connect_errno) {
	echo "数据库连接失败了，失败代号为："."(".$orderMeal->connect_errno .")</br> ".$orderMeal->connect_error ."<br/>";
	exit("Uable to access to database.");
}

$table = "order".date('ymd'); //今日点餐名单
switch($content){
	case 'count':
		//查询今日订单
		$array_count = array();
		$count_total = 0;
		$count_X = array( 'A'=>0, 'B'=>0, 'C'=>0, 'D'=>0, );

		//查询订单详情
		$query = "select personnel.name, $table.meal 
				 from personnel right join $table 
				 on personnel.personnelId = $table.personnelId";
		$personnel = $orderMeal->query($query);

		$count_total = $personnel->num_rows;

		for($i=0;$i<$count_total;$i++){
			$row = $personnel->fetch_assoc();
			$array_count[$i] = $row;
		}

		$response['content']=array('details'=>$array_count);
		$response['content']['count_total'] = $count_total;

		//查询各类订单数目
		while( list($X,$count) = each($count_X) ){
			$query = "select $table.meal 
					 from $table 
					 where $table.meal = '$X'";
			$personnel = $orderMeal->query($query);
			$count = $personnel->num_rows;
			$response['content']["count_".$X] = $count;
		}
		$response['queryType'] = 1; $response['status'] = 1;
		break;
	case 'mostused':
		//查询未点餐成员
		$query = "select personnel.name
				 from mostused, personnel 
				 where mostused.personnelId not in (
				 	select $table.personnelId 
				 	from $table, mostused 
				 	where $table.personnelId=mostused.personnelId )
				 and personnel.personnelId = mostused.personnelId";
		$mostused = $orderMeal->query($query);
		$array_count = array();
		$count_mostused = $mostused->num_rows;
		for($i=0;$i<$count_mostused;$i++){
			$row = $mostused->fetch_assoc();
			$array_count[$i] = $row;
		}
		$response['content']=array('details'=>$array_count);
		$response['content']['count_mostused'] = $count_mostused;
		$response['queryType'] = 1; $response['status'] = 1;
		break;
	default:
		break;
}
echo json_encode($response);