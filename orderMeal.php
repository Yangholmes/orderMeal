<?php

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
 * form from front-end
 */
$name = trim( $_POST['name'] );
$meal = trim( $_POST['meal'] );

/**
 * check form data
 */

/**
 * 返回信息格式化
 */
$success = "<h1 style=\"font-size: 2em; margin: 2em 0;\">点餐成功，请于12:00就餐。<br/></h1>";
$fail = "<h1 style=\"font-size: 2em; margin: 2em 0;\">点餐失败！<br/>中午没饭吃了！T.T<br/>";
 
/**
 * database parameter
 */
require_once("config/mysqlConfig.php");
$url = "config/config.xml";
$host = (string)xmlFileRead($url)->usrConfig->host;//"localhost"
$username = (string)xmlFileRead($url)->usrConfig->usrname;//"root"
$psw = (string)xmlFileRead($url)->usrConfig->password;//"1001"
$database = (string)xmlFileRead($url)->usrConfig->database;//"orderMeal"

@ $orderMeal = new mysqli($host, $username, $psw, $database);
if ($orderMeal->connect_errno) {
	echo "数据库连接失败了，失败代号为：($orderMeal->connect_errno)</br> $orderMeal->connect_error <br/>";
	exit("Uable to access to database.");
}

/**
 * 点餐
 */
//防止重复，判断是否点过餐
$table = "order".date('ymd');//生成今日订单表
$query = "select $table.orderId 
		 from personnel, $table 
		 where 
		 $table.personnelId = personnel.personnelId 
		 and 
		 personnel.name = '$name';";
$result = $orderMeal->query($query);
$repeat = $result->num_rows;

//如果$repeat==0，说明还未点过餐，则新增一条记录；
//如果$repeat!=0，说明还已点过餐，则修改一条记录。
$query = ($repeat != 0)? 
		 "update personnel, $table 
		 set $table.meal = '$meal' 
		 where $table.personnelId = personnel.personnelId 
		 and personnel.name = '$name'" 
		 : 
		 "insert into $table(meal, personnelId) values ('$meal', (select personnelId from personnel where personnel.name='$name'))";
$result = $orderMeal->query($query);

if( !$result ){
	$response['status'] = 0;
	$response['content']= array('error'=>$orderMeal->error);
	echo json_encode($response);
	exit($fail."原因是：<br/>".$orderMeal->error);
}

/**
 * 更新常点餐名单
 */
$table = "mostused";
$query =	"select $table.*
			from personnel, $table
			where $table.personnelId = personnel.personnelId
			and personnel.name = '$name'";
$result = $orderMeal->query($query);
if($result->num_rows === 1){ //常点餐名单中已经存在的人
	$useInfo = $result->fetch_assoc(); //读取查询结果
	$frequency = ($useInfo['frequency'])+1; //使用频率
	$mealCount = ($useInfo[$meal])+1; //统计点餐次数
	$query =	"update $table, personnel
				set $table.frequency = $frequency, $table.$meal = $mealCount
				where $table.personnelId = personnel.personnelId 
				and personnel.name = '$name'";
	$result = $orderMeal->query($query); //写入数据库
	// echo json_encode($result);
}
else if($result->num_rows === 0){ //常点餐名单中还未有记录的人
	$query =	"insert into $table(personnelId, frequency, $meal)
				values ((select personnelId from personnel where personnel.name = '$name'), 1, 1)";
	$result = $orderMeal->query($query);
	// echo json_encode($result);
}

$response['status'] = 1;
$response['content'] = array('success'=>$success);
echo json_encode($response);
/*echo $success;*/