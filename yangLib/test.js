/**
 * 
 */

/*var img = new yangImgInput( 'test', '单击这里选择图片', '');
img.insert(document.getElementsByClassName('test')[0]);*/

var mySelect = document.getElementsByClassName('yangSelect')[0],
	input = mySelect.getElementsByClassName('yangSelectTextInput')[0], //IE10 don't support~
	btn = mySelect.getElementsByClassName('yangSelectButton')[0],
	option = mySelect.getElementsByClassName('yangSelectOption')[0],

	oSelect = mySelect.getElementsByTagName('select')[0],
	oOption = oSelect.options;

console.log(input);

var optionArray =[],
	optionHTML = '<ul>';

for(var i=0;i<oSelect.length;i++){
	optionArray[i] = oOption[i].text;
}
/*for(var i=0;i<oSelect.length;i++){
	optionHTML += '<li>' + oOption[i].text + '</li>';
	optionArray[i] = oOption[i].text;
}
optionHTML += '</ul>';

option.innerHTML = optionHTML;*/

input.addEventListener('focusin', search, false); //focuns on the control
// mySelect.addEventListener('click', search, false);
input.addEventListener('blur', getOut, false);  //blur


function search(e){
	var inputText = e.target.value;
	// if(!inputText) return false;
	for(var i=0;i<optionArray.length;i++){
		if( optionArray[i].indexOf(inputText) != -1){
			// console.log(i);
			optionHTML += '<li>' + oOption[i].text + '</li>';
		}
	}
	optionHTML += '</ul>';
	option.innerHTML = optionHTML;
	optionHTML = '<ul>';

	var optionLi = option.getElementsByTagName('li');
	for(var i=0;i<optionLi.length;i++){
		optionLi[i].addEventListener('click', pick, false);
		optionLi[i].addEventListener('mouseover', keep, false);
	}
}

var stillIn = false;
function getOut(e){
	if(!stillIn){
		optionHTML += '</ul>';
		option.innerHTML = optionHTML;
		optionHTML = '<ul>';
	}
}

function keep(e){
	stillIn =true;
}

function pick(e){
	console.log(e);
	var value = e.target.textContent;
	var index = optionArray.indexOf(value);

	oSelect.selectedIndex = index;
	input.value = value;

	optionHTML += '</ul>';
	option.innerHTML = optionHTML;
	optionHTML = '<ul>';

	stillIn = false;
}



/**
 * MASK
 */
var body = document.getElementsByTagName('body')[0];

var mask = document.createElement('div');
mask.className = "mask";
body.insertBefore(mask,body.firstChild);

var innerMask = '<div class="inner-mask"></div>';

mask.innerHTML = innerMask;

mask.addEventListener('click', destroy, false);

function destroy(e){
	var target = e.target;
	
	if(target.className == 'mask')
		target.remove();
}