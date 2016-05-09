<?php

/**
 * 从xml文件中读取xml数据
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

// echo xmlFileRead()->usrConfig->usrname;