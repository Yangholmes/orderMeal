function yangSelectInput( name, options ){
	this.name = name;
	this.value = options.value;
	this.textContent = options.textContent;

	this._render();
}
yangSelectInput.prototype = {
	constructor: yangSelectInput,
	ctrlName: 'yang-select',
	id: '{yang-select-id}',
	name: '{yang-select-id}-select',

	fontSize: '1.5em',

	_stillIn: false, //whether the cursor is still in this ctrl
	rendered: false, //whether this ctrl is rendered~
	self: {}, //represent itself

	value: [], //the value of options. value 属性规定在表单被提交时被发送到服务器的值
	textContent: [], //display values in <li>. textContent 属性用来显示

	html: 		'<div id="{yang-select-id}-layout" class="yang-select-layout">' +
					'<div id="{yang-select-id}-text-border" class="yang-select-text-border">' +
						'<input type="text" id="{yang-select-id}-text" class="yang-select-text" placeholder="Enter keywords and search">' +
					'</div>' +
					'<div id="{yang-select-id}-button" class="yang-select-button">' +
						'<label for="{yang-select-id}-button-bind">▼</label>' +
						'<input type="button" id="{yang-select-id}-button-bind" class="yang-select-button-bind">' +
					'</div>' +
				'</div>' +
				'<div id="{yang-select-id}-option" class="yang-select-option">' +
					'<ul>' +
					'</ul>' +
				'</div>' +
				'<select id="{yang-select-id}-select" class="yang-select-select" name="{yang-select-name}"></select>', 

	style: {
				'yang-select': 'width: 200px; height: 1.5em; font-family: "Microsoft YaHei"', 
					'yang-select-layout': 'width: 100%; height: 1.5em; font-family: "Microsoft YaHei"',
							'yang-select-text-border': 'width: 99%; height: 1.5em; border: solid 1px gray; display: inline-block;',
								'yang-select-text': '	width: 100%; border: none; font-size: 1em; padding: 0;',
							'yang-select-button':  'width: 1.5em; height: 1.5em; display: inline-block; position: absolute; text-align: center; border: solid 1px gray;',
								'yang-select-button input[type="button"]': 'visibility: hidden; font-family: "Microsoft YaHei"',
								'yang-select-button label': 'cursor: pointer; display: inline-block; width: 1.5em; height: 1.5em; line-height: 1.5em;',
								'yang-select-button label:hover': 'background-color: gray;',
						'yang-select-option': 'width: 100%; height: auto; max-height: 9.5em; position: relative; background-color: white; overflow-y: auto',
							'yang-select-option ul': 'list-style: none; padding: 0; margin: 0;',
							'yang-select-option li:hover': 'width: 100%; background-color: gray; cursor: pointer;',
						'yang-select-select': 'visibility: hidden; margin: 0; position: absolute;',
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
		newSelect.id = this.id; newSelect.className = 'yang-select'; //set property id and class
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
		var that = this,
			textInput = this.self.getElementsByClassName('yang-select-text')[0],
			button = this.self.getElementsByClassName('yang-select-button-bind')[0],
			option = this.self.getElementsByClassName('yang-select-option')[0],
			optionUl = option.getElementsByTagName('ul')[0],
			// optionUl = this.self.getElementsByTagName('ul')[0],
			optionLi = option.getElementsByTagName('li'), // The returned list is live, meaning that it updates itself with the DOM tree automatically. 
			// optionLi = this.self.getElementsByTagName('li'),
			select = this.self.getElementsByTagName('select')[0];

		textInput.addEventListener('focus', search, false); textInput.addEventListener('touchstart', search, false); //focuns on the control or touch the control
		textInput.addEventListener('blur', leave, false); //blur
		textInput.addEventListener('keyup', search, false);

		button.addEventListener('click', search, false);

		// option.addEventListener('mouseenter', keep, false);
		// option.addEventListener('mouseout', release, false);

		function search(e){
			var inputText = e.target.value,
				optionHTML = '',
				liHTML = ''; 
			for(var  i=0;i<that.textContent.length;i++){
				if( that.textContent[i].indexOf(inputText) != -1){
					liHTML += 	'<li value="' + that.value[i] + '">' +
									that.textContent[i] + '</li>';
				}
			}

			optionUl.innerHTML = liHTML;
			option.style.border = 'solid 1px gray';

			for(var i=0;i<optionLi.length;i++){
				optionLi[i].addEventListener('click', pick, false); 
				optionLi[i].addEventListener('mouseenter', keep, false); optionLi[i].addEventListener('touchstart', keep, false); //cellphone ontouchstart event
				optionLi[i].addEventListener('mouseout', release, false);

			}
		}

		function leave(e){
			console.log(that._stillIn);
			if(!that._stillIn){
				optionUl.innerHTML = null;	
				option.style.border = '';
			}

		}

		function keep(e){
			that._stillIn = true;
		}
		function release(e){
			that._stillIn = false;
		}

		function pick(e){
			var liTextContent = e.target.textContent, //textContent of <li>
				index = that.textContent.indexOf(liTextContent);

			select.selectedIndex = index;
			textInput.value = liTextContent;

			optionUl.innerHTML = null;
			that._stillIn = false;
			option.style.border = '';
		}
	},
	/**
	 * 
	 */
	_render: function(){
		if(!this.rendered){
			this._createHTML();
			this._createStyle();
			this._regEvents();
			this.setOption({value: this.value, textContent: this.textContent});
			this.rendered = true;
		}
		else{

		}
		return this;
	},

	/**
	 * css setter getter
	 */
	set width(value){
		this.self.style.width = value;
	},
	get width(){
		return this.self.width;
	},

	set placeholder(text){
		this.self.getElementsByClassName('yang-select-text')[0].placeholder = text;
	},
	get placeholder(){
		return this.self.getElementsByClassName('yang-select-text')[0].placeholder;
	},


	/**
	 * value 属性规定在表单被提交时被发送到服务器的值
	 * textContent 属性用来显示
	 */
	setOption: function(options){
		var select = this.self.getElementsByTagName('select')[0],
			optionHTML = '';
		this.value = options.value;
		this.textContent = options.textContent;

		for(var i=0;i<this.textContent.length;i++){
			optionHTML += '<option value="' + this.value[i] + '">' +
							this.textContent[i] + '</option>';
		}
		select.innerHTML = optionHTML;
	},
	getOption: function(){
		return {
			value: this.value,
			textContent: this.textContent,
		};
	},

	/**
	 * 
	 */
	getSelectedIndex: function(){
		var select = this.self.getElementsByTagName('select')[0];
		return select.selectedIndex;
	},
	setSelectedIndex: function(index){
		var select = this.self.getElementsByTagName('select')[0],
			textInput = this.self.getElementsByClassName('yang-select-text')[0];
		select.selectedIndex = index;
		textInput.value = select.options[index].textContent;
		return this;
	},

	/**
	 * methos that be used to insert self into document
	 */
	insert: function(e){
		e.innerHTML = ''; //remove all child elements(nodes)
		e.appendChild(this.self); //append self into e
	},
	insertBefore: function(e){
		e.parentNode.insertBefore(this.self, e);
	},
	insertAfter: function(e){
		e.parentNode.insertBefore(this.self, e.nextElementSibling());
	},
}