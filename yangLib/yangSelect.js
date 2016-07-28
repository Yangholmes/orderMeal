function yangSelectInput( name, options  ){
	this.name = name;
	this.message = message;

	this.render();
}
yangSelectInput.prototype = {
	constructor: yangSelectInput,
	ctrlName: 'yang-select',
	id: '{yang-select-id}',
	name: '{yang-select-id}-select',

	fontSize: '1.5em',

	_stillIn: false, //whether the cursor is still in this ctrl
	rendered: false,
	self: {},

	value: [], //the value of options
	textContent: [] //display values in <li>

	html: 	'<div id="{yang-select-id}" class="yang-select">'
				'<div id="{yang-select-id}-layout" class="yang-select-layout">' +
					'<div id="{yang-select-id}-text-border" class="yang-select-text-border">' +
						'<input type="text" id="{yang-select-id}-text" class="yang-select-text">' +
					'</div>' +
					'<div id="{yang-select-id}-button class="yang-select-button">' +
						'<label for="{yang-select-id}-button-bind">▼</label>' +
						'<input type="button" id="{yang-select-id}-button-bind" class="yang-select-button-bind">' +
					'</div>' +
				'</div>' +
				'<div id="{yang-select-id}-option class="yang-select-option">' +
					'<ul>' +
					'<li></li>' + 
					'</ul>' +
				'</div>' +
				'<select class="yang-select-select" name="{yang-select-name}></select>' +
			'</div>', 

	style: {
				'yang-select-layout': 'width: 11em; height: 1.5em; font-family: "Microsoft YaHei"',
					'yang-select *': 'height: 1.5em; font-family: "Microsoft YaHei"',
						'yang-select-text-border': 'width: 8.5em; border: solid 1px gray; display: inline-block;',
							'yang-select-text': '	width: 100%; border: none; font-size: 1em; padding: 0;',
						'yang-select-button':  'width: 1.5em; height: 1.5em; display: inline-block; position: absolute; text-align: center; border: solid 1px gray;',
							'yang-select-button input[type="button"]': 'visibility: hidden; font-family: "Microsoft YaHei"',
							'yang-select-button label': 'cursor: pointer; display: inline-block; width: 1.5em; height: 1.5em; line-height: 1.5em;',
							'yang-select-button label:hover': 'background-color: gray;',
					'yang-select-option': 'border: solid 2px #0014FF; width: 10em; position: absolute; background-color: white;',
						'yang-select-option ul': 'list-style: none; padding: 0; margin: 0;',
						'yang-select-option li:hover': 'background-color: gray; cursor: pointer;',
					'yang-select-layout select': 'visibility: hidden; margin: 5em 0; position: absolute;',
			},

	/**
	 * replace
	 * @param string: string being to replace
	 * @param substr: The match is replaced by the return value of parameter #3
	 * @param replacement: The String that replaces the substring received from parameter #2
	 */
	_replace: function(string, substr, replacement){
		var regExp = new RegExp(substr, 'g');
		return string.replace(regExp, replacement);
	},
	/**
	 * set id
	 */
	_instanceId: function(){	
		var allCongener = document.getElementsByClassName("yang-select"); //getElementsByClassName在IE8无此方法，最好做渐进增强
		if(!allCongener)
			this.id = 'yang-select-' + '0';
		else
			this.id = 'yang-select-' + (allCongener.length);
	},
	/**
	 * create html
	 */
	_createHTML: function(){
		var that = this,
			newSelect = document.createElement('div'); //new div container
		if( !that.name )
			return false;
		that.html = that._replace(that.html, '{yang-select-name}', that.name); //set name
		that._instanceId(); //generate an id
		that.html = that._replace(that.html, '{yang-select-id}', that.id); //set id
		newSelect.id = this.id; newSelect.className = 'yang-img-input'; //set property id and class
		newSelect.innerHTML = that.html; //insert html into new div
		that.self = newSelect; //set self object
	},
	/**
	 * create style
	 */
	_createStyle: function(){
		var that = this, 
			generalStyle = this.style, 
			maskStyle = this.maskStyle, 
			style = '',
			styleElt = document.createElement('style');
		/**
		 * @param selector
		 * @param generalStyle[selector]
		 */
		for( selector in generalStyle ){
			style += '.' + selector + '{' + generalStyle[selector] +'}';
		}
		style +=  '#' + that.id + '-mask' + '{' + this.maskStyle + '}';
		styleElt.innerHTML = style;
		document.getElementsByTagName('head')[0].appendChild(styleElt);
	},
	/**
	 * target.addEventListener(type, listener[, options]);
	 */
	 _regEvents: function(){
	 	var textInput = this.self.getElementsByClassName('yang-select-text')[0],
	 		button = this.self.getElementsByClassName('yang-select-button-bind')[0],
	 		option = this.self.getElementsByClassName('yang-select-option')[0],
	 		optionUl = option.getElementsByTagName('ul'),
	 		optionLi = option.getElementsByTagName('li'),
	 		select = this.self.getElementsByTagName('select')[0];

	 	textInput.addEventListener('focusin', search.call(this), false); //focuns on the control
	 	textInput.addEventListener('blur', getOut, false); //blur
	 	textInput.addEventListener('keyup', search, false);

	 	button.addEventListener('click', , false);

	 	option.addEventListener('mouseenter', keep, false);
		option.addEventListener('mouseout', release, false);

		for(var i=0;i<optionLi.length;i++){
			optionLi[i].addEventListener('click', pick, false);
		}
	 },
	 /**
	  * 
	  */
	 listener: {
	 	search: function(){

	 	}
	 },
}