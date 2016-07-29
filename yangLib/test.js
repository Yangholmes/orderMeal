/**
 * 
 */

// var img = new yangImgInput( 'test', '单击这里选择图片', '');
// img.insert(document.getElementsByClassName('test')[0]);

var options={	value:['一','二','三', '1', '2', '3'],
				textContent:['一','二','三', '1', '2', '3']};
var select = new yangSelectInput( 'mySelect', options );
document.getElementsByTagName('body')[0].appendChild(select.self);


// var mySelect = document.getElementsByClassName('yangSelect')[0],
// 	input = mySelect.getElementsByClassName('yangSelectTextInput')[0], //IE10 don't support~
// 	btn = mySelect.getElementsByClassName('yangSelectButton')[0],
// 	option = mySelect.getElementsByClassName('yangSelectOption')[0],
// 	optionUl = option.getElementsByTagName('ul'),
// 	optionLi = option.getElementsByTagName('li'),
	
// 	oSelect = mySelect.getElementsByTagName('select')[0],
// 	oOption = oSelect.options;

// console.log(input);

// var optionArray =[],
// 	optionHTML = '<ul>';

// for(var i=0;i<oSelect.length;i++){
// 	optionArray[i] = oOption[i].text;
// }
// /*for(var i=0;i<oSelect.length;i++){
// 	optionHTML += '<li>' + oOption[i].text + '</li>';
// 	optionArray[i] = oOption[i].text;
// }
// optionHTML += '</ul>';

// option.innerHTML = optionHTML;*/

// input.addEventListener('focusin', function(e){return search.call(input, e)}, false); //focuns on the control
// input.addEventListener('keyup', search, false);
// // mySelect.addEventListener('click', search, false);
// input.addEventListener('blur', getOut, false);  //blur

// function search(e){
// 	var inputText = e.target.value;
// 	// var inputText = e.value;
// 	// if(!inputText) return false;
// 	for(var  i=0;i<optionArray.length;i++){
// 		if( optionArray[i].indexOf(inputText) != -1){
// 			// console.log(i);
// 			optionHTML += '<li>' + oOption[i].text + '</li>';
// 		}
// 	}
// 	optionHTML += '</ul>';
// 	option.innerHTML = optionHTML;
// 	optionHTML = '<ul>';

// 	option.style.border = 'solid 2px #0014FF';

// 	var optionLi = option.getElementsByTagName('li');
// 	for(var i=0;i<optionLi.length;i++){
// 		optionLi[i].addEventListener('click', pick, false);
// 		optionLi[i].addEventListener('mouseenter', keep, false);
// 		optionLi[i].addEventListener('mouseout', release, false);
// 	}
// }

// var stillIn = false;
// function getOut(e){
// 	if(!stillIn){
// 		option.style.border = null;
// 		optionHTML += '</ul>';
// 		option.innerHTML = optionHTML;
// 		optionHTML = '<ul>';
// 	}
// }

// function keep(e){
// 	stillIn = true;
// }
// function release(e){
// 	stillIn = false;
// }

// function pick(e){
// 	console.log(e);
// 	var value = e.target.textContent;
// 	var index = optionArray.indexOf(value);

// 	oSelect.selectedIndex = index;
// 	input.value = value;

// 	optionHTML += '</ul>';
// 	option.innerHTML = optionHTML;
// 	optionHTML = '<ul>';

// 	stillIn = false;
// }



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