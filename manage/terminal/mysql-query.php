<?php

$json = $_POST['data'];

$data = json_decode($json);//Obj

$cmd = $data->content->cmd;//获取指令

$pattern = "/^mysql -h|^mysql -u/";//mysql登陆表达式

if( preg_match( $pattern, $cmd) ){//判断是否需要登陆mysql
	$patterns = array( "/-h [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|-h [a-zA-Z0-9\-\.]+/", 
					  "/-u [a-zA-Z0-9_\-\.]+/", 
					  "/-p .+/");
	$matches = preg_match_patterns($patterns, $cmd);

	@ $mysqli = new mysqli("$matches[0]", "$matches[1]", "$matches[2]");
	
	echo(json_encode());
}


/**
 * 一个字符串匹配多个模式
 * @param array $patterns: several patterns, the pattern to search for, as a string.
 * @param string $input: The input string.
 * @return: array, results of search.
 */
function preg_match_patterns(array $patterns , string $input){
	$returns = array();
	while(list($i, $pattern) = each($patterns)){
		if( preg_match( $pattern, $input, $matches) )//匹配出hostname、username、password
			array_push( $returns, substr($matches[0], 3) );
		else
			array_push( $returns, null );
	}
	return $returns;
}