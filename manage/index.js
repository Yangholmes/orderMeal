window.onload = init();
/**
 * 
 */
function init(){
	generateImgPicker();
	registEvents();
}

function generateImgPicker(){
	var img = new yangImgInput( 'test', '单击这里选择图片', 'img.png'); // 加载图片上传控件
	img.insert(document.getElementById('menu')); img.setName('menu') //插入文档 自定义名称
}
function registEvents(){
	var menuForm = document.getElementById('menu-form'), //表单确认事件
		bookedBtn = document.getElementById('statistic-booked'), //统计订单
		unbookBtn = document.getElementById('statistic-unbook'); //统计未点餐人员

	menuForm.onsubmit = function(){return onSubmitMenu(menuForm)};
	bookedBtn.onclick = function(){onBookedCount(bookedBtn)};
	unbookBtn.onclick = function(){onUnbookCount(unbookBtn)};
}

/**
 * 
 */
function onSubmitMenu(menuForm){
	postForm("submitMenu.php", menuForm, function(request){
		var response = JSON.parse(request.responseText);
		if(response.status == 1) alert('启动成功！');
	});
	return false;
}
/**
 * 
 */
function onBookedCount(bookedBtn){
	if(!bookedBtn) return false;

	var countQuery = new queryMsg(1, "count", 1);
	postData("count.php", countQuery, function(request){
		var response = JSON.parse(request.responseText);
		var bookedTable = document.getElementById('booked-table'),
			bookedCount = document.getElementById('booked-count');
		bookedCount.innerHTML = count(response);
		bookedTable.innerHTML = generateTable(response);;
	});
}
/**
 * 
 */
function onUnbookCount(unbookBtn){
	if(!unbookBtn) return false;

	var countQuery = new queryMsg(1, "mostused", 1);
	postData("count.php", countQuery, function(request){
		var response = JSON.parse(request.responseText);
		var unbookTable = document.getElementById('unbook-table');
		unbookTable.innerHTML = generateTable(response);;
	});
}

function count(data){
	var rows = data.content,
		columns = ['总计', 'A', 'B', 'C', 'D'];

	var thead = '<thead><tr>';
	for(i in columns)
		thead = thead + '<th scope="col">' + columns[i] + '</th>';
	thead = thead + '</tr></thead>';

	var tbody = '<tbody>';
	tbody = tbody + 
					"<td>"+ data.content.count_total +"</td>" + 
					"<td>"+ data.content.count_A +"</td>" + 
					"<td>"+ data.content.count_B +"</td>" + 
					"<td>"+ data.content.count_C +"</td>" + 
					"<td>"+ data.content.count_D +"</td>";
	tbody = tbody + '</tbody>';
	var table = '<table>' + thead + tbody + '</table>';

	return table;
}
function generateTable(data){
	var rows = data.content.details,
		columns = ['姓名', '餐'];

	var thead = '<thead><tr>';
	for(i in columns)
		thead = thead + '<th scope="col">' + columns[i] + '</th>';
	thead = thead + '</tr></thead>';

	var tbody = '<tbody>';
	for(i in rows){
		tbody = tbody + '<tr>';
		for(p in rows[i]){
			tbody = tbody + '<td>' + rows[i][p] + '</td>';
		}
		tbody = tbody + '</tr>';
	}
	tbody = tbody + '</tbody>';

	var table = '<table>' + thead + tbody + '</table>';

	return table;
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
