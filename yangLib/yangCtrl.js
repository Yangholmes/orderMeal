function yangImgInput( name, message, img ){
	this.name = name;
	this.message = message;
	this.img = img;
}

yangImgInput.prototype = {
	ctrlName: 'yang-img-input',
	id: '{yang-img-input-id}',
	selfDom: '',

	width: 'auto',
	height: 'auto',
	img: '',
	message: 'click here!',
	name: 'imgInput',

	html: 
			// '<div id="{yang-img-input-id}" class="yang-img-input">' + 
				'<div id="{yang-img-input-id}-touch-layout" class="yang-img-input-touch-layout">' + 
					'<div id="{yang-img-input-id}-mask" class="yang-img-input-mask"></div>' + 
					'<div id="{yang-img-input-id}-message" class="yang-img-input-message">{yang-img-input-id}-messageText</div>' + 
					'<img id="{yang-img-input-id}-preview" class="yang-img-input-preview" src="" alt="image preview here~">' + 
				'</div>' + 
				'<input type="file" id="{yang-img-input-id}-choose" class="yang-img-input-choose" name="{yang-img-input-id}-img" accept="image/*" />',/* + */
			// '</div>',
	style: {
				'yang-img-input': 'margin: 0; font-size: 2em; font-weight: bold',
				'yang-img-input-touch-layout': 'margin: 0; cursor: pointer;', 
				'yang-img-input-mask': 'position: absolute; transition: background-color .5s;', 
				'yang-img-input-message': 'color: rgba(220, 220, 220, 0); position: absolute; text-align: center; transition: color .5s;',  
				'yang-img-input-preview': 'width: auto; height: auto;', 
				'yang-img-input-choose': 'position: absolute; width: 0; visibility: hidden;',
				'yang-img-input-preview': 'min-width: 360px;',
				//pseudo class :hover
				'yang-img-input-touch-layout:hover .yang-img-input-mask': 'background-color: rgba(0,0,0,.5);',
				'yang-img-input-touch-layout:hover .yang-img-input-message': 'color: rgba(230, 230, 230, 1);',
			},
	mStyle: {
				'mask': 'background-color: rgba(0,0,0,0);',
				'message': '',
			},

	events: {},

	rendered: false,

	_instanceId: function(){	
		var allCongener = document.getElementsByClassName("yang-img-input"); //getElementsByClassName在IE8无此方法，最好做渐进增强
		if(!allCongener)
			this.id = 'yang-img-input-' + '0';
		else
			this.id = 'yang-img-input-' + (allCongener.length);
	},
	_createHTML: function(){
		var that = this,
			newImgInput = document.createElement('div'); //new div container
		if( !that.name )
			return false;
		that._instanceId(); //generate an id
		that.html = that._replace(that.html, '{yang-img-input-id}', that.id); //replaceId
		this.setName(that.name); this.setMessage(that.message); //set name and message
		newImgInput.id = this.id; newImgInput.className = 'yang-img-input'; //set property id and class
		newImgInput.innerHTML = that.html; //insert html into new div
		that.self = newImgInput; //set self object
	},
	_createStyle: function(){
		var that = this, 
		generalStyle = this.style, 
		maskStyle = this.maskStyle, 
		style = '',
		styleElt = document.createElement('style');
		for( selector in generalStyle ){
			style += '.' + selector + '{' + generalStyle[selector] +'}';
		}
		style +=  '#' + that.id + '-mask' + '{' + this.maskStyle + '}';

		styleElt.innerHTML = style;
		document.getElementsByTagName('head')[0].appendChild(styleElt);
	},
	_regEvents: function(){
		var touchLayout = this.self.getElementsByClassName('yang-img-input-touch-layout')[0],
			imgInput = touchLayout.nextElementSibling,
			mask = touchLayout.childNodes[0],
			message = touchLayout.childNodes[1],
			img = touchLayout.childNodes[2];

		touchLayout.onclick = function(){imgInput.click()};
		touchLayout.onmouseover = function(){
			var imgHeight = img.offsetHeight,
				imgWidth = img.offsetWidth;

				mask.style.height = imgHeight + 'px'; 
				mask.style.width = imgWidth + 'px';
				message.style.width = imgWidth + 'px';
				message.style.height = imgHeight + 'px'; 
				message.style.lineHeight = imgHeight + 'px';
		};
		touchLayout.onmouseout = function(){};
		imgInput.onchange = function(){
			if(!imgInput) return false;
			var file = imgInput.files[0];
			if(window.FileReader && file) {
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function(e){
					img.src = e.target.result;
				}
			}
		};
	},
	_update: function(){

	},
	_replace: function(string, substr, replacement){
		var regExp = new RegExp(substr, 'g');
		return string.replace(regExp, replacement);
	},

	render: function(e){
		if(!this.rendered){
			this._createHTML();
			this._createStyle();
			this._regEvents();
			this.rendered = true;
		}
		else
			_update();
		return this;
	},

	setName: function(name){
		if( name.constructor != String )
			return false;
		this.name = name;
		if(this.rendered){ //if rendered
			this.self.getElementsByTagName('input')[0].name = this.name;
		}
		else{ //haven rendered yet!
			this.html = this._replace(this.html, this.id+'-img', this.name);
		}
		return this;
	},
	getName: function(){
		return this.name;
	},

	setMessage: function(message){
		if( message.constructor != String )
			return false;
		this.message = message;
		if(this.rendered){ //if rendered
			this.self.getElementsByClassName('yang-img-input-message')[0].innerHTML = this.message;
		}
		else{ //haven rendered yet!
			this.html = this._replace(this.html, this.id+'-messageText', this.message);
		}
		return this;
	},
	getMessage: function(){
		return this.message;
	},

	setStyle: function(style){},
	setMaskStyle: function(style){},

	getImg: function(){},
	setImg: function(){},

	getValue: function(){
		this.getImg();
	},
	setValue: function(){
		this.setImg();
	},

	insert: function(e){
		this.render();
		e.innerHTML = ''; //remove all child elements(nodes)
		e.appendChild(this.self); //append self into e
	},
	insertBefore: function(e){
		this.render();
		e.parentNode.insertBefore(this.self, e);
	},
	insertAfter: function(e){
		this.render();
		e.parentNode.insertBefore(this.self, e.nextElementSibling());
	},
}