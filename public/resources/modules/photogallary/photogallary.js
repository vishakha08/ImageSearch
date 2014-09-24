define(function(require) {
	"use strict"

	var PhotoParentView = require('./js/view/photoparentview');

	return {
		getInstance : function() {
			return {
				initialize : function(options) {
					this.view = new PhotoParentView(options);
				}
			};
		}
	};

});
