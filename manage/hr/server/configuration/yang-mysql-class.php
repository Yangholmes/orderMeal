<?php

class yangMysql{
	private $configUrl;

	private $db_host;
	private $db_usr;
	private $db_password;
	private $table;

	private $charset; //

	private $connection; //mySQL connection
	private $query; //mySQL query

	private $row;
	private $result = array();

	private $logEnable = true;
	private $devMode = true;

	private $errorInfo = array("errno" => "", "error" => "");

	/**
	 * yangMysql constructor
	 */
	public function __construct(){
		require_once("xml-lib.php");
		$this->db_host = (string)xmlFileRead()->mysqlConfig->devhost;
		// $this->db_host = (string)xmlFileRead($url)->mysqlConfig->host;
		$this->db_usr = (string)xmlFileRead()->mysqlConfig->usr;
		$this->db_password = (string)xmlFileRead()->mysqlConfig->password;
		$this->connect(); //connect to mysql
	}
	/**
	 * yangMysql destructor
	 */
	public function __destruct(){
		$this->connection->close();
	}

	/**
	 * connect to MySQL
	 */
	public function connect(){
		$this->connection = new mysqli($this->db_host, $this->db_usr, $this->db_password);
		if($this->connection->connect_error){
			$this->errorInfo["errno"] = $this->connection->connect_errno; 
			$this->errorInfo["error"] = $this->connection->connect_error; 
			$this->log(); //log the error
			$this->connection = null; //if error occur, set connection null
		}
	}

	/**
	 * MySQL query
	 */
	public function query($query){
		$this->query = $query;
		$this->result = $this->connection->query($this->query);
		if(!$this->result){
			$this->errorInfo["errno"] = $this->connection->connect_errno; 
			$this->errorInfo["error"] = $this->connection->connect_error; 
			$this->log(); //log the error
			return false;
		}
		$this->row = $this->result->num_rows;
		$this->result = $this->result->fetch_all(MYSQLI_ASSOC); //PHP 5 >= 5.3.0, PHP 7, MYSQL_ASSOC means return an association array
		return $this->result;
	}

	/**
	 * log
	 */
	public function log(){
		
	}

	/**
	 * get MySQL charset
	 */
	public function getCharset(){
		$queryCharset = "SHOW VARIABLES LIKE 'character_set_connection'";
		$this->charset = $this->query($queryCharset)[0]["Value"];
		echo $this->charset;
	}
}


/**
 * test
 */
$yangsql = new yangMysql(); //instantiation
$yangsql->getCharset(); //test queryCharset()