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
 * Use JSON decode to send a HTML POST request
 * @param callback: function that used to deal with request
 * @param data: original data to post
 */
function postJSON(url, data, callback){
	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.onreadystatechange = function(){
		callback(request);
	};
	request.setRequestHeader("Content-Type", "application/json");
	request.send( JSON.stringify(data) );
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

function init(){
	checkOrder();
}
function loadMenu(remark){
	var remarkCtrl = document.getElementById('remarks');
	remarkCtrl.innerHTML = remark;
}
function checkOrder(){
	var checkQuery = new queryMsg(0, "init", 1);
	postData("init.php", checkQuery, function(request){
		var response = JSON.parse(request.responseText);
		if( response.status == 0 ){
			if(response.content.orderEnable == 0){
				alert("饿了吗？\n\n点餐时间还未到哦~");
			}
			else{
				alert("不知道什么原因点不了餐了~\n找管理员问问情况吧~");
			}
			return false;
		}
		loadName(response.content.personnel);
		loadMenu(response.content.remark);
	});
}
function loadName(personnel){
	var nameSelect = document.getElementById('name');
	var optionsHTML = "";
	for(var i=0;i<personnel.length;i++){
		optionsHTML = optionsHTML + 
			"<option value=\""+personnel[i]+"\">"+personnel[i]+"</option>";
	}
	nameSelect.innerHTML = optionsHTML;
}

init();