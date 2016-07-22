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