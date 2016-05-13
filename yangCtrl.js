function yangImgInput( name, message, img ){
	this.name = name;
	this.message = message;
	this.img = img;
}

yangImgInput.prototype = {
	ctrlName: 'yang-img-input',
	id: '',
	selfDom: '',

	width: 'auto',
	height: 'auto';
	img: '',
	message: 'click here!',
	name: 'imgInput',

	html: 
			// '<div id="{yang-img-input-id}" class="yang-img-input">' + 
				'<div id="{yang-img-input-id}-touch-layout" class="yang-img-input-touch-layout">' + 
					'<div id="{yang-img-input-id}-mask" class="yang-img-input-mask"></div>' + 
					'<div id="{yang-img-input-id}-message" class="yang-img-input-message">' + this.message + '</div>' + 
					'<img id="{yang-img-input-id}-preview" class="yang-img-input-preview" src="" />' + 
				'</div>' + 
				'<input type="file" id="{yang-img-input-id}-choose" class="yang-img-input-choose" name="' + this.name + '" accept="image/*" />',/* + */
			// '</div>',
	style: {
				'yang-img-input': 'margin: 0; width: auto; height: aoto;',
				'yang-img-input-touch-layout': 'margin: 0; cursor: pointer;', 
				'yang-img-input-mask': 'position: absolute; transition: background-color .5s;', 
				'yang-img-input-message': 'color: rgba(220, 220, 220, 0); position: absolute; text-align: center; transition: color .5s;',  
				'yang-img-input-preview': 'width:100%; height: 100%;', 
				'yang-img-input-choose': 'position: absolute; width: 0; visibility: hidden;',
				//pseudo class :hover
				'yang-img-input-touch-layout:hover .yang-img-input-mask': 'background-color: rgba(0,0,0,.5);',
				'yang-img-input-touch-layout:hover .yang-img-input-message': 'color: rgba(230, 230, 230, 1);',
			},
	maskStyle: 'background-color: rgba(0,0,0,0);',

	rendered: false,

	_instanceId: function(){	
		var allCongener = document.getElementsByClassName("yang-img-input"); //getElementsByClassName在IE8无此方法，最好做渐进增强
		if(!allCongener)
			this.id = 'yang-img-input-' + '0';
		else
			this.id = 'yang-img-input-' + (allCongener.length);
	},
	_createHTML: function(){
		if( !that.name )
			return false;
		var that = this,
			newImgInput = document.createElement('div'); //new div container
		that._instanceId(); //generate an id
		that.html = _replaceId(that.html); //replaceId
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
	_update: function(){

	},
	_replaceId: function(text){
		var instanceIdRegExp = '/' + this.id + '/g';
		return text.replace(instanceIdRegExp, '{yang-img-input-id}');
	},

	render: function(e){
		if(!rendered){
			this._createHTML();
			this._createStyle();
			this.rendered = true;
		}
	},

	setName: function(name){
		if( !name || typeof name != "String" )
			return false;
		this.name = name;
		return this;
	},
	getName: function(){
		return this.name;
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
		e.innerHTML = ''; //remove all child elements(nodes)
		e.appendChild(this.self); //append self into e
	},
	insertBefore: function(e){
		e.nextElementSibling().insertBefore(this.self);
	},
	insertAfter: function(e){
		e.insertBefore(this.self);

	},
}