define(function(require) {
	"use strict"

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var Bootstrap = require('bootstrap');
	require('ajaxfileupload');
	
	var PhotoListView = require('./photolistview');
	var PhotoThumbView = require('./photothumbview');
	
	var PhotoCollection = require('./../collection/photocollection');

	var PhotoParentTemplate = require('text!./../../template/photoparenttemplate.html');
	var PhotoParentCompiledTemplate = Handlebars.compile(PhotoParentTemplate);
	
	var UploadFormTemplate = require('text!./../../template/uploadFormModaltemplate.html');
	var UploadFormCompiledTemplate = Handlebars.compile(UploadFormTemplate);

	var PhotoParentView = Backbone.View.extend({
		initialize : function(options) {
			this.initCollection();
			this.render();
		},
		events : {
			'click .js-searchButton' : 'getPhotoCollection',
			'click .js-searchButton1' : 'getPhotoCollection',
			'click .js-logo' : 'refreshPage',
			'click .js-uploadFormBtn' : 'rederUploadForm',
			'click .js-uploadBtn' : 'uploadFormImage',
			
		},
		initCollection : function() {
			this.collection = new PhotoCollection();
			this.listenTo(this.collection, 'sync', this.renderChildren);
		},
		render : function() {
			this.$el.html(PhotoParentCompiledTemplate());
			this.PhotoListview = new PhotoListView({
				el : this.$('.js-photothumbview'),
				collection : this.collection
			});

			this.PhotoThumbview = new PhotoThumbView({
				el : this.$('.js-photolistview'),
				collection : this.collection
			});
			self.$('.js-resultText').hide();
			self.$('.js-tabContainer').hide();
		},
		totalTime : 0,
		getPhotoCollection : function(event) {
			var self = this;
			var searchText = self.$('.js-searchBox').val();
			var startTime = self.getTime();
			
			$.ajax({
				url : "http://192.168.35.105:9000/images/search?q=" + searchText,
				contentType : 'json',
				type : 'GET',
				secureuri : false,
				success : function(response) {
					self.collection = new PhotoCollection(response);
					self.PhotoListview.collection = self.collection;
					self.PhotoThumbview.collection = self.collection;
					self.totalTime = self.getTime() - startTime;
					self.$('.js-resultText').show();
					self.renderChildren();
				},
				done : function(response) {
					self.collection = response;
					self.$('.js-resultText').show();
				}
			});
			return false;
		},
		renderChildren : function() {
			if (this.collection.length === 0) {
				this.$('.js-resultText').removeClass("alert-success");
				this.$('.js-resultText').addClass("alert-warning");
				this.$('.js-displayResult').html("<strong>No Result !! </strong>Enter Text to Search");
				this.$('.js-tabContainer').hide();
			} else {
				this.$('.js-resultText').removeClass("alert-warning");
				this.$('.js-resultText').addClass("alert-success");
				this.$('.js-displayResult').html(
						"About " + this.collection.length + " Results ("
								+ (this.totalTime / 1000).toFixed(2)
								+ " seconds)");
				this.$('.js-tabContainer').show();
				this.PhotoListview.render();
				this.PhotoThumbview.render();
			}
		},
		refreshPage : function() {
			this.$('.js-searchBox').val("");
			location.reload(true);
		},

		getTime : function() {
			return new Date().getTime();
		},
		
		rederUploadForm : function(){
			this.$('.js-uploadModal').html(UploadFormCompiledTemplate());
			this.$('#uploadFormModal').modal({
				keyboard : true,
				backdrop : true,
				show : true
			});
		},
		
		uploadFormImage : function(){

			var self = this;
			if (this.checkValidation()) {
				$.ajaxFileUpload({
					url : "http://192.168.35.105:9000/UploadToServer/upload?title=" + this.$('.js-textDescption').val(),
					secureuri : false,
					type : 'POST',
					contentType : 'json',
					//data : this.getData(),
					fileElementId : 'uploadImage',
					success : function(response) {
						self.$('.js-uploadStatus').show();
						var response = JSON.parse($(
								response.getElementsByTagName('pre')).text());
						var status = response.status;
						var message = response.message;
						self.displayStatus(status,message);
					},
					error : function(response) {
						self.$('.js-uploadStatus').show();
						var response = JSON.parse($(
								response.getElementsByTagName('pre')).text());
						var status = response.status;
						var message = response.message;
						self.displayStatus(status,message);
					},
					complete : function(){
						self.$('.js-uploadStatus').show();
						self.$('.js-textDescption').val("");
						self.$('.js-textDescption').removeClass("unhighlight");
					}
				});
			}
		},
		
		checkValidation : function() {
			var titleNode = this.$el.find('.js-textDescption');
			var imageTitle = titleNode.val();
			if (imageTitle.length === 0) {
				titleNode.removeClass("unhighlight");
				titleNode.addClass("highlight");
				this.$('.js-errText').html("Enter Text");
				return false;
			} else {
				this.$('.js-errText').html("");
				titleNode.removeClass("highlight");
				titleNode.addClass("unhighlight");
				return true;
			}
		},
		
		displayStatus:function(status,message){
			var statusNode = self.$('.js-uploadStatus');
			var statusText = self.$('.js-statusText');
			statusNode.removeClass("hidden");
			if(status === "Upload Unsuccessful"){
				statusNode.removeClass("alert-success");
				statusNode.addClass("alert-danger");
				statusText.html("<strong>Unsuccessful</strong> Upload :["+message+"]");
			}
			else{
				statusNode.removeClass("alert-danger");
				statusNode.addClass("alert-success");
				statusText.html("<strong>Successful</strong> Upload :["+message+" <strong>save</strong>]");
			}
		},
	});
	return PhotoParentView;
});