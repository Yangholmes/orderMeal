function yangImgInput( name, message, img ){
	this.name = name;
	this.message = message;
	this.img = img;

/*	var allCongener = document.getElementsByClassName("yang-img-input"); //getElementsByClassName可能会无此方法，最好做渐进增强
	if(!allCongener)
		this.id = 'yang-img-input-' + '0';
	else
		this.id = 'yang-img-input-' + (allCongener.length);*/
}

yangImgInput.prototype = {
	ctrlName: 'yang-img-input',

	width: 'auto',
	height: 'auto';
	style: '',
	maskStyle: '',
	img: '',
	message: 'click here!',
	name: 'imgInput',

	html: 
			'<div id="{yang-img-input-id}" class="yang-img-input">' + 
				'<div id="{yang-img-input-id}-touch-layout">' + 
					'<div id="{yang-img-input-id}-mask"></div>' + 
					'<div id="{yang-img-input-id}-message">' + this.message + '</div>' + 
					'<img id="{yang-img-input-id}-preview" src="" />' + 
				'</div>' + 
				'<input type="file" id="{yang-img-input-id}-choose" name="' + this.name + '" accept="image/*" />' + 
			'</div>',
	id: '',

	_createHTML: function(){
		var that = this;
		if( !that.name )
			return false;
		instanceId(that.html); //实例化id
		return that.html;
	},
	_createStyle: function(){
		var that = this;
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

	insert: function(){},
	insertBefore: function(){},
	insertAfter: function(){},
}