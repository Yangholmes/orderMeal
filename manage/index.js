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
	//注册图片上传按键事件
	var chooseFile = document.getElementById('choose-file');
	chooseFile.onchange = function(){showPreview(chooseFile)};
	//注册鼠标进入、移出预览容器事件
	var menuPreviewTouch = document.getElementById('menu-preview-touch');
	menuPreviewTouch.onmouseover = function(){onMouseOver(menuPreviewTouch)};
	menuPreviewTouch.onmouseout = function(){onMouseOut(menuPreviewTouch)};
	//注册图片预览控件点击事件
	// var menuPreview = document.getElementById('menu-preview');
	// menuPreview.onclick = function(){onFireFileinput(chooseFile)};
	menuPreviewTouch.onclick = function(){onFireFileinput(chooseFile)};
	//注册统计按键事件
	var countButton = document.getElementById('count-button');
	countButton.onclick = function(){onClick(countButton)};
	//注册提交菜单按键事件
	var menuForm = document.getElementById('menu-form');
	menuForm.onsubmit = function(){return onSubmit(menuForm)};
}
function onFireFileinput(handle){
	// var event = document.createEvent('MouseEvents');
	// event.initMouseEvent('click');// Deprecated
	// handle.dispatchEvent(event);
	handle.click();
}
function onMouseOver(handle){
	var mask = handle.getElementsByTagName('div')[0];
	var message = handle.getElementsByTagName('div')[1];
	var img = handle.getElementsByTagName('img')[0];
	//获取菜单图片的大小
	var imgHeight = img.offsetHeight;
	var imgWidth = img.offsetWidth;
	//设置mask的大小
	mask.style.height = imgHeight + 'px';
	mask.style.width = imgWidth + 'px';
	//设置message的位置
	var messageMarginTop = (imgHeight - message.offsetHeight)/2;
	var messageMarginLeft = (imgWidth - message.offsetWidth)/2;
	message.style.marginTop = messageMarginTop + 'px';
	message.style.marginLeft = messageMarginLeft + 'px';
}
function onMouseOut(handle){
	
}
function showPreview(handle){
	if( !handle ){
		alert("这张菜单是假的，\n请检查一下重发！");
		return false;
	}
	var img = document.getElementById('menu-preview');
	var file = handle.files[0];
	if( !/image\/png/.test(file.type) ){
		alert("请选择png格式图片~");
		handle;
		return false;
	}
	if(window.FileReader && file) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function(e){
			img.src = e.target.result;
		}
	}
}
function onClick(handle){
	if(!handle){
		return false;
	}
	var countQuery = new queryMsg(1, "count", 1);
	postData("count.php", countQuery, function(request){
		var response = JSON.parse(request.responseText);
		insertTable(response);
	});
}
function onSubmit(form){
	if( form.menu.value == null || form.menu.value == "" ){
		alert("请上传菜单！");
		return false;
	}
	else
		return true;
}
function insertTable(data){
	var countTd = document.getElementById('count-td');
	var detailsTb = document.getElementById('details-tb');
	var details = data.content.details;
	
	countTd.innerHTML = "<td>"+ data.content.count_total +"</td>" + 
						"<td>"+ data.content.count_A +"</td>" + 
						"<td>"+ data.content.count_B +"</td>" + 
						"<td>"+ data.content.count_C +"</td>" + 
						"<td>"+ data.content.count_D +"</td>" ;
	
	var eachRow = "";
	for(var i=0;i<details.length;i++){
		eachRow = eachRow + "<tr>" +
					"<td>" + details[i].name + "</td>" +
					"<td>" + details[i].meal + "</td>" +
					"</tr>";
	}
	detailsTb.innerHTML = eachRow;
}

window.onload = init();
