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
	eventRegister();
	checkOrder();
}
function eventRegister(){
	//注册提交订单按键事件
	var orderForm = document.getElementById('order-form');
	orderForm.onsubmit = function(){return onSubmit(orderForm)};
	//注册随机点餐链接事件
	var aRandomMeal = document.getElementById('random-meal');
	aRandomMeal.onclick = function(){onRandomClick(aRandomMeal)};
	
	shake(aRandomMeal,'','',1000,100);
}
function onSubmit(handle){
	localStorage.nameSelectedIndex = handle.name.selectedIndex;
	//return false;
}
function onRandomClick(handle){
	var randomSelection = Math.round( Math.random()*3 );
	var mealSelector = handle.previousElementSibling;//获取上一个兄节点。
	//随机跳动动画
	var i=0;
	var randomAnimation = setInterval( function(){
			mealSelector.selectedIndex = Math.round( Math.random()*3 );
			i++;
			if(i==50){
				clearInterval(randomAnimation);
				alert("选个" + 
					mealSelector.options[mealSelector.selectedIndex].value + 
					"?");
			}
		},10);
	// mealSelector.selectedIndex = randomSelection;
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
			alert(response.content.orderEnable);
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
	
	loadLocalStorage(nameSelect);
}
function loadLocalStorage(handle){
	if( localStorage.nameSelectedIndex == null )
		return false;
	handle.selectedIndex = localStorage.nameSelectedIndex;
}

init();

/**
 * @param e: element object or id of the element
 * @param callback: function will be call at the end of shake
 * @param distance: shake density(default: 5px)
 * @param duration: unit is "ms"(default: 500ms)
 * @param frequency: how many times(default: )
 */
function shake( e, callback, distance, duration, frequency){
	if(typeof e === "string")
		e = document.getElementById(e);

	if(!duration) duration = 500;
	if(!distance) distance = 5;

	var originalStyle = e.style.cssText;

	e.style.position = "relative";
	var positions = calcPosi();
	var endTime = (new Date()).getTime() + duration;
	var shaking = setInterval(draw, 40);

	function calcPosi(){
		var f = frequency, d = distance, positions = [], i = 0;
		for(i=0;i<24*2*Math.PI/f;i++){
			positions[i] = d*Math.sin(f*i/24);
		}
		return positions;
	}

	function draw(){
		e.style.left = ( positions[0] + "px" );
		positions = loopQueue(positions);
		if( (new Date()).getTime() > endTime ){
			clearInterval(shaking);
			e.style.cssText = originalStyle;
			if(callback) callback(e);
		}
	}

	function loopQueue(arr){
		if( !arr.constructor === "Array" )
			return arr;
		var firstEle = arr.shift();
		arr.push(firstEle);
		return arr;
	}
}