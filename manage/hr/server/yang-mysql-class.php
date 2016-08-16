<?php

class yangMysql{
	private $configUrl = "configuration/";
	private $logUrl = "log/";

	private $db_host;
	private $db_usr;
	private $db_password;
	private $db_database;
	private $db_table;

	private $charset; //

	private $connection; //mySQL connection
	private $query; //mySQL query

	private $row;
	private $result = array();

	private $logEnable = true;

	private $errorInfo = array("errno" => "", "error" => "");

	/**
	 * yangMysql constructor
	 */
	public function __construct(){
		require_once($this->configUrl."xml-lib.php"); //
		$configXmlUrl = $this->configUrl."yang-mysql-config.xml"; //
		$this->db_host = (string)xmlFileRead($configXmlUrl)->mysqlConfig->devhost;
		// $this->db_host = (string)xmlFileRead($url)->mysqlConfig->host;
		$this->db_usr = (string)xmlFileRead($configXmlUrl)->mysqlConfig->usr;
		$this->db_password = (string)xmlFileRead($configXmlUrl)->mysqlConfig->password;
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
			$this->errorHandle();
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
			$this->errorHandle();
			return false;
		}
		$this->row = $this->result->num_rows;
		$this->result = $this->result->fetch_all(MYSQLI_ASSOC); //PHP 5 >= 5.3.0, PHP 7, MYSQL_ASSOC means return an association array
		return $this->result;
	}

	/**
	 * deal with errors
	 */
	public function errorHandle(){
		$this->errorInfo["errno"] = $this->connection->connect_errno; 
		$this->errorInfo["error"] = $this->connection->connect_error; 
		$this->log(); //log the error
	}
	/**
	 * log
	 */
	public function log(){
		include_once $this->logUrl."log.php";
		$logging = "\n\t##errno ".$this->errorInfo["errno"]."\n\t##error ".$this->errorInfo["error"];
		logFileIO($logging);
	}

	/**
	 * get MySQL charset
	 */
	public function getCharset(){
		$queryCharset = "SHOW VARIABLES LIKE 'character_set_connection'";
		$this->charset = $this->query($queryCharset)[0]["Value"];
		echo $this->charset;
	}

	/**
	 * select database
	 */
	public function selectDb($database){
		$this->connection->select_db($database);
		if($this->connection->connect_error){
			$this->errorHandle();
			return flase;
		}
		$this->db_database = $database;
	}

	/**
	 * show all tables from the database
	 */
	public function showTables(){
		$query = "show tables";
		$tables = $this->query($query);
		echo json_encode($tables);
		return $tables; //[{}]
	}
	/**
	 * select a table
	 */
	public function selectTable($table){
		//remind: here must have some methods to check the table
		$this->db_table = $table;
	}

	/**
	 * basic single table method
	 */
}


/**
 * test
 */
$yangsql = new yangMysql(); //instantiation
$yangsql->getCharset(); //test queryCharset()
$yangsql->selectDb("ordermeal"); //
$yangsql->showTables(); //