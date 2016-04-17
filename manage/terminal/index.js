/**
 * 消息类
 * [Object]
 * 用关键字new声明
 * @param queryType 操作码
 * @param content 消息内容
 * @param status 状态
 */
function queryMsg(queryType, content, status){
	this.queryType = queryType;
	this.content = content;
	this.status = status;
}
queryMsg.prototype = {
	constructor: queryMsg,
	toString: function(){ return this; },
};

/**
 * mysql配置信息
 * [Object]
 * 变量含义一如其名
 */
function mysqlConfig(host, usrname, psw, database){
	this.host = host;
	this.usrname = usrname;
	this.psw = psw;
	this.database = database;
}
mysqlConfig.prototype = {
	constructor: mysqlConfig,
	toString: function(){ return this; },
};

/**
 * Use JSON decode to send a HTML POST request
 * @param callback: function that used to deal with request
 * @param data: original data to post
 */
function postJSON(url, data, callback){
	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.onreadystatechange = function(){
		if (request.readyState === 4 && callback)	// When response is complete
			callback(request);						// call the callback.
	};
	// request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Content-Type",	// Set Content-Type
						 "application/x-www-form-urlencoded");
	request.send( "data="+JSON.stringify(data) );
}

/**
 * Encode the properties of an object as if they were name/value pairs from
 * an HTML form, using application/x-www-form-urlencoded format
 * @param data: must be [Object]
 */
function encodeFormData(data) {
	if (!data) return "";	// Always return a string
	var pairs = [];			// To hold name=value pairs
	for(var name in data) {									// For each name
		if (!data.hasOwnProperty(name)) continue;			// Skip inherited
		if (typeof data[name] === "function") continue;		// Skip methods
		if (data[name] == null) continue;
		var value = data[name].toString();						// Value as string
		name = encodeURIComponent(name.replace(" ", "+"));		// Encode name
		value = encodeURIComponent(value.replace(" ", "+"));	// Encode value
		pairs.push(name + "=" + value);							// Remember name=value pair
	}
	return pairs.join('&');										// Return joined pairs separated with &
}
function postData(url, data, callback) {
	var request = new XMLHttpRequest();			
	request.open("POST", url);						// POST to the specified url
	request.onreadystatechange = function() {		// Simple event handler
		if (request.readyState === 4 && callback)	// When response is complete
			callback(request);						// call the callback.
	};
	request.setRequestHeader("Content-Type",	// Set Content-Type
							 "application/x-www-form-urlencoded");
	request.send(encodeFormData(data));			// Send form-encoded data
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function init(){
	eventInit();
}

function eventInit(){
	//
	var cmdInput = document.getElementById('terminal-input').getElementsByTagName('textarea')[0];
	cmdInput.onkeydown = function(){onCmdKeyDown(event, cmdInput);}
}
function onCmdKeyDown(event){
	var cmdInput = arguments[1];
	if(event.ctrlKey){
		if(event.keyCode == 13){
			sendCmdQuery( cmdInput.value );
		}
	}
}
function sendCmdQuery(cmd){
	var cmdQuery = new queryMsg();
	var usrInfo = myConfig.usrname + ":" + myConfig.psw + "@" + myConfig.host;
	cmdQuery.queryType = 1;
	cmdQuery.content = { 'connection': {'usr_info': usrInfo},
						 'database': myConfig.database, 
						 'cmd': cmd};
	cmdQuery.status = 1;
	console.log(cmdQuery);
	console.log(myConfig);
	postJSON("mysql-query.php", cmdQuery, function(request){
		var response = JSON.parse(request.responseText);
		var usr = response.content.connection.usr_info.split(/:|@/);//当mysql指令有误，或者用户名密码不匹配时，usr_info为空，此句会抛出错误。
		myConfig.usrname  = usr[0];
		myConfig.psw      = usr[1];
		myConfig.host     = usr[2];
		myConfig.database = response.content.database;
		console.log(myConfig);
	});
}

window.onload = init();
var myConfig = new mysqlConfig('', '', '', '');//全局变量，用于保持连接信息