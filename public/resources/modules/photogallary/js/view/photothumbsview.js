define(function(require) {
	"use strict"

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var HandlebarsHelpers = require('handlebarshelpers');
	var Bootstrap = require('bootstrap');

	var ThumbsCollection = require('../collection/thumbcollection');
	var ThumbsModel = require('../model/thumbmodel');

	var PhotoCollectionTemplate = require('text!./../../template/photocollection.html');
	var PhotoCollectionViewCompiledTemplate = Handlebars
			.compile(PhotoCollectionTemplate);

	var ThumbView = Backbone.View
			.extend({

				el : "#container",

				initialize : function(options) {
					// debugger;
					console.log("view-initialized : " + options);
					
					var collection = {
						ThumbCollection : [
								{
									url : "http://farm7.static.flickr.com/6089/6059010802_436cefa521_z.jpg",
									txt : "img1"
								},
								{
									url : "http://farm7.static.flickr.com/6088/6065742147_3d62b32deb_z.jpg",
									txt : "img2"
								},
								{
									url : "http://farm7.static.flickr.com/6197/6065590914_ab1acccf87_z.jpg",
									txt : "img3"
								},
								{
									url : "http://farm7.static.flickr.com/6081/6066708246_e1d9a812ed.jpg",
									txt : "img4"
								},
								{
									url : "http://farm7.static.flickr.com/6066/6063442584_feb03a88d8.jpg",
									txt : "img5"
								},
								{
									url : "http://farm7.static.flickr.com/6089/6059010802_436cefa521_z.jpg",
									txt : "img1"
								},
								{
									url : "http://farm7.static.flickr.com/6088/6065742147_3d62b32deb_z.jpg",
									txt : "img2"
								},
								{
									url : "http://farm7.static.flickr.com/6197/6065590914_ab1acccf87_z.jpg",
									txt : "img3"
								},
								{
									url : "http://farm7.static.flickr.com/6081/6066708246_e1d9a812ed.jpg",
									txt : "img4"
								},
								{
									url : "http://farm7.static.flickr.com/6066/6063442584_feb03a88d8.jpg",
									txt : "img5"
								} ]
					};

					this.ThumbsCollection = new ThumbsCollection(collection.ThumbCollection);
					//this.ThumbsCollection.add(collection.ThumbCollection);
					// this.listenTo(this.ThumbsCollection, 'add', this.render);
					this.render();
				},
				events : {
					'click .js-photo-list' : 'viewThumbnail',
					'click .js-searchButton' : 'getPhotoCollection'

				},
				render : function(searchText) {
					// debugger;
					var data = this.ThumbsCollection.toJSON();
					this.$el.html(PhotoCollectionViewCompiledTemplate({
						'searchTxt' : searchText,
						'ThumbsCollection' : data,
						'preview' : data[0]
					}));
				},
				viewThumbnail : function(e, searchText) {
					// debugger;
					var data = this.ThumbsCollection.toJSON();

					var modelSrc = e.currentTarget.getAttribute('src');
					var modelName = e.currentTarget.getAttribute('name');
					var previewImg = {
						url : modelSrc,
						txt : modelName
					};

					this.$el.html(PhotoCollectionViewCompiledTemplate({
						'searchTxt' : searchText,
						'ThumbsCollection' : data,
						'preview' : previewImg
					}));

				},

				getPhotoCollection : function() {
					var self = this;

					self.ThumbsCollection.reset();
					self.ThumbsCollection = new ThumbsCollection();
					var searchText = this.$('#searchBox').val();
					var apiKey = "d62ff19a2268a81f2dba339baa635b80";
					// var apiKey = "f4032167f903270fcddf40510f1bf851";

					var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="
							+ apiKey
							+ "&tags="
							+ searchText
							+ "&tag_mode=any&format=json&nojsoncallback=1";

					var allPhotos = $.getJSON(url,
							function(responseCollection) {
								console.log("successFul" + responseCollection);
								if (responseCollection.stat == "ok") {
									$.each(responseCollection.photos.photo,
											function(key, img) {
												var src = "http://farm"
														+ img.farm
														+ ".staticflickr.com/"
														+ img.server + "/"
														+ img.id + "_"
														+ img.secret + "_t.jpg";
												var title = img.title;
												console.log(src);
												var model = new ThumbsModel();
												model.set({
													url : src,
													text : title
												});
												self.ThumbsCollection
														.add(model);
											});
									self.render(searchText);
								}
							}).done(function() {
								console.log( "success" );
							})
							.fail(function() {
							console.log( "error" );
							})
							.always(function() {
							console.log( "complete" )});
				},
			});

	console.log("thumbview");
	return ThumbView;
});