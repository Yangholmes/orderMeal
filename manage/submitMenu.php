<?php

$remarks = $_POST['remarks'];
$img = $_FILES['menu'];

/**
 * 上传菜单
 */
$imgType = substr( $img['name'], strrpos($img['name'],'.') );
copy($img['tmp_name'], 'img'.$imgType);//以指定名称保存到服务器

/**
 * 写入备注
 */
if( $remarks==null || $remarks=="" ){
	$remarks = "今天没有备注，全按菜单。";
}
@ $file = fopen("remark.txt", "w");
fwrite( $file, $remarks );
fclose($file);

/**
 * database parameter
 */
$host = "localhost";
$username = "root";//
$psw = "1001";//
$database = "ordermeal";

@ $orderMeal = new mysqli($host, $username, $psw, $database);
if ($orderMeal->connect_errno) {
	echo "数据库连接失败了，失败代号为："."(".$orderMeal->connect_errno .")</br> ".$orderMeal->connect_error ."<br/>";
	exit("Uable to access to database.");
}
/**
 * 生成本日订单
 */
$table = "order%";
$query = "show tables like '$table'";
$result = $orderMeal->query($query);

if( !$result ){
	exit("加载失败！<br/>原因是：<br/>".$orderMeal->error);
}

$orderEnale = $result->num_rows;
$table = $result->fetch_assoc()["Tables_in_$database ($table)"];

//
if( $orderEnale==0 ){
	creatOrder($orderMeal);
}
else{
	if( $table!= "order".date('ymd') ){
		$orderMeal->query("drop table $table");//删除旧表
		creatOrder($orderMeal);
	}
	else{
		//do nothing
	}
}
/**
 * 新增本日订单
 */
function creatOrder($db){
	$table = "order".date('ymd');
	$query = "create table $table(
			 orderId int unsigned not null auto_increment primary key,
			 personnelId int unsigned not null,
			 meal char(4) not null);";
	$result = $db->query($query);
	if( !$result ){
		exit("加载失败！<br/>原因是：<br/>".$orderMeal->error);
	}
}