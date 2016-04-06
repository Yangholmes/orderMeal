<?php

/**
 * form from front-end
 */
$name = trim( $_POST['name'] );
$meal = trim( $_POST['meal'] );

/**
 * check form data
 */


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
		 "update personnel, $table set $table.meal = '$meal' where $table.personnelId = personnel.personnelId and personnel.name = '$name'" 
		 : 
		 "insert into $table(meal, personnelId) values ('$meal', (select personnelId from personnel where personnel.name='$name'))";
$result = $orderMeal->query($query);

if( !$result ){
	exit("点餐失败！<br/>原因是：<br/>".$orderMeal->error);
}

echo "点餐成功，请于12:00就餐。";