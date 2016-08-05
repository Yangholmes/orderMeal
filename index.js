window.onload = init();

function init(){
	// generateYangCtrl();
	loadEverything();
	registEvents();
}

function loadEverything(){
	var checkQuery = new queryMsg(0, "init", 1),
		submitOreder = document.getElementById('submit-order'),
		nameOptions = {value: [], textContent: []};

	postData("init.php", checkQuery, function(request){
		var response = JSON.parse(request.responseText),
			remark = '', personnel = [];
		if( response.status == 1 ){
			personnel = response.content.personnel;
			nameOptions.value = personnel; nameOptions.textContent = personnel;
			generateYangCtrl(nameOptions);

			remark = response.content.remark;
			generateBroadcast(remark);
		}
		else{
			alert(response.content.orderEnable);
			// shake('name','',10,5000,10);
			return false;
		}	
	});
}
function generateYangCtrl(nameOptions){
	var mealOptions = {value: ['A', 'B', 'C', 'D'], textContent: ['A', 'B', 'C', 'D']};
		
	var nameSelect = new yangSelectInput( 'name', nameOptions );
	nameSelect.width = '93%'; nameSelect.insert(document.getElementById('name'));
	// 加载 缓存
	if(localStorage.nameSelectedIndex != null) nameSelect.setSelectedIndex(localStorage.nameSelectedIndex);
	else nameSelect.setSelectedIndex(0);

	var mealSelect = new yangSelectInput( 'meal', mealOptions );
	mealSelect.width = '93%'; mealSelect.insert(document.getElementById('meal'));
	mealSelect.setSelectedIndex(0);
}
function generateBroadcast(remark){
	var broadcast = document.getElementById('broadcast'),
		width = remark.length + 'em';

	var style = document.createElement('style');
	style.innerHTML = '@-webkit-keyframes broadcast{' +
						'0% {left: 100%;}' +
						'100% {left: -' + width + ';}' +
					'}' + 
					'@keyframes broadcast{' +
						'0% {left: 100%;}' +
						'100% {left: -' + width + ';}' +
					'}';
	document.getElementsByTagName('head')[0].appendChild(style);

	broadcast.style.width = width;

	broadcast.innerHTML = remark;
}
function registEvents(){
	var orderForm = document.getElementById('order-form'), //表单确认事件
		randomMealBtn = document.getElementById('random-meal'); //随机点餐

	orderForm.onsubmit = function(){return onSubmitOrder(orderForm)};
	randomMealBtn.onclick = onRandomClick;
}

function onSubmitOrder(orderForm){
	localStorage.nameSelectedIndex = orderForm.name.selectedIndex; // 缓存
	postForm("orderMeal.php", orderForm, function(request){
		var response = JSON.parse(request.responseText);
		if(response.status == 1)
			alert('成功点餐！中午12点开饭！');
		else
			alert('遗憾，点餐失败了！');
	});
	return false;
}

function onRandomClick(handle){
	alert('抱歉啊~故障了~暂停使用~');
/*	var randomSelection = Math.round( Math.random()*3 ),
		mealSelector = document.getElementById('meal').getElementsByTagName('select')[0],
		
		//随机跳动动画
		i=0,
		randomAnimation = setInterval( function(){
			mealSelector.selectedIndex = Math.round( Math.random()*3 );
			i++;
			if(i==50){
				clearInterval(randomAnimation);
				alert("选个" + 
					mealSelector.options[mealSelector.selectedIndex].value + 
					"?");
			}
		},10);*/
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
 * 
 */
function postForm(url, form, callback){
	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.onreadystatechange = function(){
		if (request.readyState === 4 && callback)	// When response is complete
			callback(request);
	};
	// request.setRequestHeader("Content-Type", "multipart/form-data");
	request.send(new FormData(form));
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