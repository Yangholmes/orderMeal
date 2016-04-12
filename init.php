<?php

/**
	 * 前端数据
	 * 一个消息类
	 */
	$type    = $_POST['queryType'];			//操作码
	$content = $_POST['content'];			//内容
	$status  = $_POST['status'];			//状态
	
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
 * 判断是否超过接受订餐时间
 */
date_default_timezone_set("Asia/Shanghai");//set time zone
$now = date("H:i:s");//
if ( strtotime($now)>strtotime("10:10:00") ){
	$response['status'] = 0 ;
	$response['content']= array('orderEnable'=>"很遗憾，点餐已经截止。");
	echo json_encode($response);
	exit();
}

	
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
 * 查询人员列表
 */
$table = "personnel";//
$query = "select name from $table ";
$personnel = $orderMeal->query($query);

if( !$personnel ){
	exit("加载失败！<br/>原因是：<br/>".$orderMeal->error);
}

$num_personnel = $personnel->num_rows;
$array_personnel = array();
for($i=0;$i<$num_personnel;$i++){
	$row = $personnel->fetch_assoc();
	$array_personnel[$i] = $row['name'];
}
//
$response['content']=array('personnel'=>$array_personnel);

/**
 * 查询是否开始订餐
 */
$table = "order".date('ymd');
$query = "show tables like '$table'";
$result = $orderMeal->query($query);

if( !$result ){
	exit("加载失败！<br/>原因是：<br/>".$orderMeal->error);
}

//if $orderEnable!=0, enable to order
$orderEnable = $result->num_rows;
$response['status'] = ($orderEnable!=0?1:0);
$response['content']['orderEnable'] = "菜单还没准备好，\n订餐请稍后！";

/**
 * 关闭数据库连接
 */
$orderMeal->close();

/**
 * 读取备注
 */
@ $file = fopen("manage/remark.txt", "r");
$remark = fgets($file);
$response['content']['remark'] = $remark;
fclose($file);

echo json_encode($response);