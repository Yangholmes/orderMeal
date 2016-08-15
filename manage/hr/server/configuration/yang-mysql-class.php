<? php

class yangMysql{
	require_once("xml-lib.php");
	private $db_host = (string)xmlFileRead($url)->mysqlConfig->devhost;
	// private $db_host = (string)xmlFileRead($url)->mysqlConfig->host;
	private $db_usr = (string)xmlFileRead($url)->usrConfig->usr;
	private $db_password = (string)xmlFileRead($url)->usrConfig->password;

	private $connection
}