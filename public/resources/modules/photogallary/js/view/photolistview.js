define(function(require) {
	"use strict"

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var Bootstrap = require('bootstrap');

	var PhotoListTemplate = require('text!./../../template/photolisttemplate.html');
	var PhotoListCompiledTemplate = Handlebars.compile(PhotoListTemplate);

	var ModalTemplate = require('text!./../../template/modaltemplate.html');
	var ModalCompiledTemplate = Handlebars.compile(ModalTemplate);

	Handlebars.registerHelper("debug", function(optionalValue) {
		console.log("Current Context");
		console.log("====================");
		console.log(this);
		if (optionalValue) {
			console.log("Value");
			console.log("====================");
			console.log(optionalValue);
		}
	});

	Handlebars.registerHelper('with', function(context, options) {
		return options.fn(context);
	});

	Handlebars.registerHelper("createRow", function(imgNo, options) {
		if (imgNo % 4 === 0 || imgNo === 0) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});

	Handlebars.registerHelper("closeRow", function(imgNo, options) {
		if ((imgNo + 1) % 4 === 0) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});

	var PhotoListView = Backbone.View.extend({
		initialize : function() {
			this.render();
		},
		events : {
			'click .js-displayImg' : 'renderModalView',
		},
		render : function() {
			var responsePhotos = this.collection;
			console.log("PhotoList data", responsePhotos);
			this.$el.html(PhotoListCompiledTemplate({
				'PhotoCollection' : responsePhotos.toJSON()
			}));

		},
		renderModalView : function(e) {
			var self = this;
			var modalId = $(e.target).data('modelid');
			var photoModel=this.collection.get(modalId);
			
			var click_photoSrc = photoModel.get('photoSrc');
			var click_photoTitle = photoModel.get('photoTitle');
			var data = {
					photoId : modalId,
					photoSrc : click_photoSrc,
					photoTitle : click_photoTitle
			};

			this.$('.js-modalView').html(ModalCompiledTemplate({
				'viewPhoto' : data
			}));
			this.$('#myModal').modal({
				keyboard : true,
				backdrop : true,
				show : true
			})/*.on('hidden.bs.modal', function(e) {
					self.render();
			})*/;
		},
	});
	return PhotoListView;
});