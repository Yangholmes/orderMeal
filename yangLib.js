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
	var shaking = setInterval( draw, 40);

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