define(function(require) {
	"use strict"
	
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var Bootstrap = require('bootstrap');
	
	var PhotoThumbTemplate = require('text!./../../template/photothumbtemplate.html');
	var PhotoThumbCompiledTemplate = Handlebars.compile(PhotoThumbTemplate);
	
	Handlebars.registerHelper("ifFirstElement", function(options) {
		if(options.data.index===0){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	});
	
	
	var PhotoThumbView = Backbone.View.extend({
		initialize:function(){
			this.render();
		},
		
		render:function(){
			var responsePhotos = this.collection;
			console.log("PhotoThumb data",responsePhotos);
			if(responsePhotos.length !== 0){
			this.$el.html(PhotoThumbCompiledTemplate({'PhotoCollection':responsePhotos.toJSON()}));
			this.initCarousel();
			}
		},
		initCarousel:function(){
			this.$('#myCarousel').carousel({
				interval: 2000,
				pause : "hover",
			});
		}
	});
	
	return PhotoThumbView;
});