<?php

/**
 * 从xml文件中读取xml数据
 * example: $host = (string)xmlFileRead($url)->usrConfig->host; //"localhost"
 */
function xmlFileRead($url = "config.xml"){
	if( !file_exists($url) ){
		$xmlObj = "File didn't exit!";
	}
	else{
		$xmlObj = simpleXmlRead($url, true);
	}
	return $xmlObj;
}

/**
 * 简化SimpleXMLElement类的使用
 */
function simpleXmlRead( $data, $isUrl = false ){
	if( is_string($data) && is_bool($isUrl) ){
		return new SimpleXMLElement($data, null, $isUrl);
	}
	else{
		return false;
	}
}

/**
 * 其他编码转换成utf8
 * @param $array: data being convert
 * @param $charset: current encoding
 */
function arryConvertEncoding($array, $charset){
	$chartype = ($charset == 'utf8') ? 1 : 0; //if $array encoding is utf8, do not convert
	while(list($i,$element) = each($array)){
		$array[$i] = $chartype ? $array[$i] : iconv( $charset,"utf-8", $array[$i] );
	}
	return $array;
}