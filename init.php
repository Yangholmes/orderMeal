<?php

/**
	 * ǰ������
	 * һ����Ϣ��
	 */
	$type    = $_POST['queryType'];			//������
	$content = $_POST['content'];			//����
	$status  = $_POST['status'];			//״̬
	
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
 * ��ѯ��Ա�б�
 */
$table = "personnel";//
$query = "select name from $table ";
$personnel = $orderMeal->query($query);

if( !$personnel ){
	exit("����ʧ�ܣ�<br/>ԭ���ǣ�<br/>".$orderMeal->error);
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
 * ��ѯ�Ƿ�ʼ����
 */
$table = "order".date('ymd');
$query = "show tables like '$table'";
$result = $orderMeal->query($query);

if( !$result ){
	exit("����ʧ�ܣ�<br/>ԭ���ǣ�<br/>".$orderMeal->error);
}

//if $orderEnale!=0, enable to order
$orderEnale = $result->num_rows;
$response['status'] = ($orderEnale!=0?1:0);
$response['content']['orderEnable'] = $orderEnale;

/**
 * �ر����ݿ�����
 */
$orderMeal->close();

/**
 * ��ȡ��ע
 */
@ $file = fopen("manage/remark.txt", "r");
$remark = fgets($file);
$response['content']['remark'] = $remark;

echo json_encode($response);