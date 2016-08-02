window.onload = init();

function init(){
	generateYangCtrl();
	registEvents();
}

function generateYangCtrl(){
	var nameOptions = {value: ["null"], textContent: ["no data"]},
		mealOptions = {value: [], textContent: ["no data"]},
		nameSelect = new yangSelectInput( 'name', nameOptions ),
		mealSelect = new yangSelectInput( 'meal', mealOptions );

	nameSelect.insert(document.getElementById('name'));
}


function eventRegister(){
	//注册提交订单按键事件
	var orderForm = document.getElementById('order-form');
	orderForm.onsubmit = function(){return onSubmit(orderForm)};
	//注册随机点餐链接事件
	var aRandomMeal = document.getElementById('random-meal');
	aRandomMeal.onclick = function(){onRandomClick(aRandomMeal)};
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
	var submitOreder = document.getElementById('submit-order');
	postData("init.php", checkQuery, function(request){
		var response = JSON.parse(request.responseText);
		if( response.status == 0 ){
			alert(response.content.orderEnable);
			shake('name','',10,5000,10);
			submitOreder.disabled = true; submitOreder.style.backgroundColor = 'black';
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

/////////////////////////////////////////////////////////////////////////////////////

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

/**
 * @param e: element object or id of the element
 * @param callback: function will be call at the end of shake
 * @param distance: shake density(default: 5px)
 * @param duration: unit is "ms"(default: 1000ms)
 * @param frequency: how many times per second(default: 100Hz)
 * 2016/05/06 Yangholmes Guangzhou
 */
function shake( e, callback, distance, duration, frequency ){
	//if e is string, that meas an id, else e means an element object.
	if(typeof e === "string")
		e = document.getElementById(e);
	if(!e) return false; //if e is illegal, than return false

	if(!duration) duration = 1000; //default duration: 1000ms
	if(!distance) distance = 5; //default distance: 5px
	if(!frequency) frequency = 100; //default frequency: 100Hz
	var frame = 25; //frames in 1s, more than 24.

	var originalStyle = e.style.cssText; //save original style

	e.style.position = "relative";
	var positions = calcPosi(), //generate 1 period position
		endTime = (new Date()).getTime() + duration, //when stop
		shaking = setInterval( draw, (1000*1/frame) ); //1000*1/frame=40ms

	//calculate positions
	function calcPosi(){
		var f = frequency, 
			d = distance, 
			positions = [], 
			i = 0;
		for(i=0;i<frame*2*Math.PI/f;i++){
			positions[i] = d*Math.sin(f*i/frame); //sin function
		}
		return positions;
	}

	//draw(render)
	function draw(){
		e.style.left = ( positions[0] + "px" ); //set style
		positions = loopQueue(positions); //
		if( (new Date()).getTime() > endTime ){ //time is over
			clearInterval(shaking);	//stop shaking
			e.style.cssText = originalStyle; //recover original style
			if(callback) callback(e); //if callback exist, call callback function
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