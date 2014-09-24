define(function(require) {
	"use strict"
	var Backbone = require('backbone');

	var ThumbModel = require('../model/thumbmodel');

	var ThumbsCollection = Backbone.Collection.extend({
		model : ThumbModel,

		parse : function(response) {
			var photoSrc = response.photoSrc;
			var photoTitle = response.photoTitle;
		}

	});

	console.log("thumbcollection");
	return ThumbsCollection;
});
