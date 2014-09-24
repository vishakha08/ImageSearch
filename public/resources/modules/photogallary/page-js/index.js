define(function(require) {
	"use strict"

	var Photogallary = require('modules/photogallary/photogallary');

	var photogallary = Photogallary.getInstance();

	photogallary.initialize({
		el : $('.js-photogallary')

	});
});