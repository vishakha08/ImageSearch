var month= ["January","February","March","April","May","June","July","August","September","October","November","December"];

define(function(require) {
	"use strict";
	Handlebars.registerHelper("SafeString", function(string) {
		return new Handlebars.SafeString(string);
	});
	
	Handlebars.registerHelper("getDate", function(string) {
		return (new Date().getDate());
	});

	Handlebars.registerHelper("getTrimmedIfLarge", function(string,factor) {
		var modifiedIfLargeString = string;
		if(string.length > factor){
			modifiedIfLargeString = string.substr(0, (factor-3))+ "...";
		}
		return modifiedIfLargeString;
	});
	
	Handlebars.registerHelper("getMonth", function(string) {
		return (month[new Date().getMonth()]);
	});
	
	Handlebars.registerHelper("getYear", function(string) {
		return (new Date().getFullYear());
	});

	Handlebars.registerHelper("getAndFormatAMPM", function(string) {
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	});

	Handlebars.registerHelper("getMontFromValue", function(string) {
		return (month[parseInt(string)-1]);
	});

	Handlebars.registerHelper('select', function(string, compareString, options) {
		if(string.toUpperCase() === compareString.toUpperCase()){
			return "selected"; 
		}else{
			return "";
		}
	});

	Handlebars.registerHelper('radio', function(string, compareString, options) {
		if(string.toUpperCase() === compareString.toUpperCase()){
			return "checked='checked'"; 
		}else{
			return "";
		}
	});

	Handlebars.registerHelper("isEqual", function(string, compareString,options) {
		if(string.toUpperCase() === compareString.toUpperCase()){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	});
	
	Handlebars.registerHelper('isUndefined', function (value, options) {
		if(value !== undefined){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	});
});
