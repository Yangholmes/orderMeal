<?php

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
$host = "localhost";
$username = "root";//
$psw = "1001";//
$database = "orderMeal";

@ $orderMeal = new mysqli($host, $username, $psw, $database);
if ($orderMeal->connect_errno) {
	echo "数据库连接失败了，失败代号为："."(".$orderMeal->connect_errno .")</br> ".$orderMeal->connect_error ."<br/>";
	exit("Uable to access to database.");
}

/**
 * 查询今日订单
 */
$table = "order".date('ymd');//

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


echo json_encode($response);
