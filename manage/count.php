<?php

	/**
	 * �жϲ���ϵͳ
	 * WINNT, Linux
	 */
	$OS = PHP_OS;
	
	/**
	 * ����ǰ�����ݸ�ʽ
	 * type: ��������
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
	echo "���ݿ�����ʧ���ˣ�ʧ�ܴ���Ϊ��"."(".$orderMeal->connect_errno .")</br> ".$orderMeal->connect_error ."<br/>";
	exit("Uable to access to database.");
}

/**
 * ��ѯ���ն���
 */
$table = "order".date('ymd');//

$array_count = array();
$count_total = 0;
$count_X = array( 'A'=>0, 'B'=>0, 'C'=>0, 'D'=>0, );

//��ѯ��������
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

//��ѯ���ඩ����Ŀ
while( list($X,$count) = each($count_X) ){
	$query = "select $table.meal 
			 from $table 
			 where $table.meal = '$X'";
	$personnel = $orderMeal->query($query);
	$count = $personnel->num_rows;
	$response['content']["count_".$X] = $count;
}


echo json_encode($response);
