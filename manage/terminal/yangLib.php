<?php

/**
 * yangLib.php
 * 用来存放自己开发的一些常用函数
 * 2016/04/14
 */

/**
 * 对象转换成为数组
 * @param object $obj: the object converted
 */
function obj2Array( $obj ){
	if( is_array($obj) ){
		return $obj;
	}
	$varsArray = is_object($obj) ? get_object_vars($obj) : array();
	foreach ($obj as $key => $value){
		$value = ( is_array($value) || is_object($value) ) ? obj2Array($value) : $value;
		$array[$key] = $value;
	}

	return $array;
}

/**
 * 一个字符串匹配多个模式
 * @param array $patterns: several patterns, the pattern to search for, as a string.
 * @param string $input: The input string.
 * @return: array, results of search.
 */
function preg_match_patterns(array $patterns , string $input){
	$returns = array();													//保存匹配项
	while(list($i, $pattern) = each($patterns)){						//若匹配
		if( preg_match( $pattern, $input, $matches) )
			array_push( $returns, substr($matches[0], 3) );				//去除-h、-u、-p 建议另起一锅
		else															//若不匹配
			array_push( $returns, null );
	}
	return $returns;
}