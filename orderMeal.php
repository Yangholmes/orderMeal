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

$table = "order".date('ymd');//
$query = "insert into $table values ('', '$name', '$meal')";
$result = $orderMeal->query($query);

if( !$result ){
	exit("点餐失败！<br/>原因是：<br/>".$orderMeal->error);
}

echo "点餐成功，请于12:00就餐。";