<?php

function obj2Array( $obj ){
	is_array($obj) ? return $obj : ;
	$varsArray = is_object($obj) ? get_object_vars($obj) : array();

	foreach ($obj as $key => $value) {
		$value = (is_array($value) || is_object($value)) ? obj2Array($value) : $value;
		$array[$key] = $value;
	}

	return $array;
}