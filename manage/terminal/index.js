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
	update: function(){
		var args = arguments;//
		var that = this;//
		var i = 0;
		for(p in that){
			if(typeof this[p] === "function") continue;//避开方法 //!应避开非继承的属性，还未做
			if(args[i] == null || args[i] == undefined) continue;//避开空值
			that[p] = args[i];
			i++
		}
		return that;//支持链式调用
	},
	toString: function(){ return this; },
};

/**
 * 信息显示模块类
 * [Object]
 * constructor: initial msgDisplay node
 */
function msgDisplay( nodeId ){
	if( nodeId == null || nodeId == '' || nodeId == undefined ){
		this.disObj = document.getElementsByClassName('msgDisplay')[0];
	}
	else{
		this.disObj = document.getElementById(nodeId);
	}
}
msgDisplay.prototype = {
	constructor: msgDisplay,
	toString: function(){ return this.exportAllLines(); },

	maxRowsNum: 40, 	//最多可以显示几行，可以通过setRowsNum()更改
	rowsNum: 0, 		//现在一共有几行
	lineArray: [], 		//用于保存正在显示的所有行，每一行为一个数组元素

	//从尾部插入一行，lineType指明了插入一行的类型
	insertLine: function( newLine, lineType ){
		var newHTML = '';//new html
		switch(lineType){
			case 0: 	//输入指令显示
				newHTML = '<span class="input">' + newLine + '</span>';
				break;
			case 1: 	//输出结果(无错误)
				newHTML = '<span class="output">' + newLine + '</span>';
				break;
			case 2: 	//输出结果(有错误)
				newHTML = '<span class="output error">' + newLine + '</span>';
				break;
			default: 	//默认以case1处理
				newHTML = '<span class="output">' + newLine + '</span>';
				break;
		}
		if( this.lineArray.push(newHTML) > this.maxRowsNum )
			this.lineArray.shift();
		this.disObj.innerHTML = this.exportAllLines();
	},
	//设置最多可以显示几行
	setRowsNum: function( maxRowsNum ){
		this.maxRowsNum = maxRowsNum;
		return this;
	},
	//计算现在到第几行
	countRowsNum: function(){
		this.rowsNum = this.disObj.getElementsByTagName('span').length;
		return this.rowsNum;
	},
	//导出内容，字符串格式
	exportAllLines: function(){
		var allLines = this.lineArray.join('');
		return allLines;
	},
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
			cmdInput.value = null;
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
	postJSON("mysql-query.php", cmdQuery, function(request){
		var response = JSON.parse(request.responseText);
		var usr = response.content.connection.usr_info.split(/:|@/);//当mysql指令有误，或者用户名密码不匹配时，usr_info为空，此句会抛出错误。
		var queryResult = response.content.queryResult;
		var query = response.query;

		myConfig.update(usr[2], usr[0], usr[1], response.content.database);//写配置，记录mysql配置信息

		//显示信息
		queryResult = flatResultObj(queryResult);
		myMsgDis.insertLine(cmd,0);
		query!=0 ? myMsgDis.insertLine(queryResult,1) : myMsgDis.insertLine(queryResult,2);
	});
}

window.onload = init();
var myConfig = new mysqlConfig('', '', '', '');//全局变量，用于保持连接信息
var myMsgDis = new msgDisplay('msgDisplay');//全局变量，显示区域

function flatResultObj(queryResult){
	var table = '';//
	var th = '';//
	var td = '';//
	var trh = ''; var trb = '';

	if(queryResult.constructor === Array){
		if(queryResult[0].constructor === Object){
			for( p in queryResult[0]){//
				th = th + "<th>" + p + "</th>"//
			}
			trh = "<tr>" + th + "</tr>";//
			for(var i=0;i<queryResult.length;i++){//
				for(p in queryResult[i]){
					td = td + "<td>" + queryResult[i][p] + "</td>";//
				}
				trb = trb + "<tr>" + td + "</tr>";//
				td = '';
			}
		table = "<table>" + trh + trb + "</table>" ;//
		}
		return table;
	}
	else{
		return queryResult;
	}
}