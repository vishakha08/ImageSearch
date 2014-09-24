define(function(require) {
	"use strict"

	var Backbone = require('backbone');

	var ThumbModel = Backbone.Model.extend({
		idAttribute : 'id',
		defaults : {
			photoSrc : '',
			photoTitle : ''
		},

	});

	console.log("thumbmodel");
	return ThumbModel;
});