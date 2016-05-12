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
			'<div id="{yang-img-input-id}" class="yang-img-input">' + 
				'<div id="{yang-img-input-id}-touch-layout" class="yang-img-input-touch-layout">' + 
					'<div id="{yang-img-input-id}-mask" class="yang-img-input-mask"></div>' + 
					'<div id="{yang-img-input-id}-message" class="yang-img-input-message">' + this.message + '</div>' + 
					'<img id="{yang-img-input-id}-preview" class="yang-img-input-preview" src="" />' + 
				'</div>' + 
				'<input type="file" id="{yang-img-input-id}-choose" class="yang-img-input-choose" name="' + this.name + '" accept="image/*" />' + 
			'</div>',
	style: {
				'yang-img-input': 'margin: 0; width: auto; height: aoto;',
				'yang-img-input-touch-layout': 'margin: 0;', 
				'yang-img-input-mask': 'position: absolute;', 
				'yang-img-input-message': 'color: rgba(220, 220, 220, 0); position: absolute; text-align: center;', 
				'yang-img-input-preview': 'width:100%; height: 100%;', 
				'yang-img-input-choose': 'position: absolute; width: 0; visibility: hidden;'
			},
	maskStyle: 'background-color: rgba(0,0,0,0);',

	rendered: false,

	_instanceId: function(){	
		var allCongener = document.getElementsByClassName("yang-img-input"); //getElementsByClassName可能会无此方法，最好做渐进增强
		if(!allCongener)
			this.id = 'yang-img-input-' + '0';
		else
			this.id = 'yang-img-input-' + (allCongener.length);
	},
	_createHTML: function(){
		var that = this;
		if( !that.name )
			return false;
		that._instanceId(); //generate an id
		that.html = _replaceId(that.html); //replaceId
		return that.html;
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
			_createStyle();
			_createHTML();
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

	insert: function(e){},
	insertBefore: function(e){},
	insertAfter: function(e){},
}