var require = {
	baseUrl : '/assets/resources',
	paths : {
		jquery : 'libraries/jquery/jquery-loader',
/*		facadeCore : 'libraries/core/facade',
		facade : 'libraries/core/facade-extended',
		mediator : 'libraries/core/mediator',
		piwik : ['//lab.verchaska.com/analytics/piwik'],
		trackerhelper : 'libraries/core/trackerhelper',
		tracker : 'libraries/core/tracker-loader',
*/		ajaxutilityCore : 'libraries/ajaxutility/ajaxutility',
		ajaxutility : 'libraries/ajaxutility/ajaxutility-extended',
		underscore : [ '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min', 'libraries/underscore/underscore' ],
		backbone : [ '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min', 'libraries/backbone/backbone' ],
		handlebars : ['libraries/handlebars/handlebars' ],
		handlebarshelpers : 'libraries/handlebars/handlebarshelpers',
		bootstrap : [ '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/js/bootstrap.min', '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min',
				'libraries/bootstrap/js/bootstrap.min' ],
		css : 'libraries/require/css',
		"css-builder" : 'libraries/require/css-builder',
		text : 'libraries/require/text',
		normalize : "libraries/require/normalize",
		debugmode : 'libraries/debugmode/debugmode',
		debugbackbone : 'libraries/debugmode/debugbackbone',
		debugcss : 'libraries/debugmode/debugcss',
		jqueryui : [ "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min", "http://code.jquery.com/ui/1.10.2/jquery-ui.min", "libraries/jquery-ui/js/jquery-ui-1.9.2.custom.min" ],
/*		jqueryvalidate : [ '//cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.11.1/jquery.validate.min','libraries/jquery-validation-1.11.1/dist/jquery.validate.min' ],
		formvalidation : 'libraries/jquery-validation-1.11.1/dist/formvalidation',
		jqueryvalidatemethods : 'libraries/jquery-validation-1.11.1/dist/additional-methods.min',
		select2js : [ '//cdnjs.cloudflare.com/ajax/libs/select2/3.4.6/select2.min', 'libraries/select2-3.4.6/select2.min' ],
		select2css : 'libraries/select2-3.4.6/select2-extended',
		numeral : [ '//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.5.2/numeral.min', 'libraries/numeraljs/numeral'],
*/		//raphael : "libraries/raphael/raphael",
		//raphaelextended : "libraries/raphael/raphael-extended",
		//graphael : "libraries/raphael/g.raphael-min",
/*		graphaelextended : 'libraries/raphael/g.raphael-extended',
		gpie : 'libraries/raphael/g.pie-customize',
		customizegbar : 'libraries/raphael/g.bar-customize',
		gbar : 'libraries/raphael/g.bar-min-customize',
		gline : 'libraries/raphael/g.line-customize',
		gdumbbell : 'libraries/raphael/g.dumbbell-extended',
		gdoughnut : 'libraries/raphael/g.doughnut-extended',
		gdoughnutv2 : 'libraries/raphael/g.pie-v2',
		gbardumbbell : 'libraries/raphael/g.bardumbbell-extended',
		datatables : 'libraries/datatables/jquery.dataTables-extended',
		datepicker : 'libraries/datepicker/datepicker'
*/		ajaxfileupload : 'libraries/ajaxfileupload/ajaxfileupload',
		},
	shim : {
		'underscore' : {
			exports : '_',
			init : function() {
				// TODO Enable noConflict() when all modules use the local reference to _
				return this._/*.noConflict()*/;
			}
		},
		'backbone' : {
			deps : [ 'jquery', 'underscore' ],
			exports : 'Backbone',
			init : function(_) {
				// TODO Enable noConflict() when all modules use the local reference to Backbone
				return this.Backbone/*.noConflict()*/;
			}
		},
		'datejs' : {
			exports : 'Date'
		},
		'handlebars' : {
			exports : 'Handlebars'
		},
		'handlebarshelpers' : {
			deps : [ 'handlebars' ]
		},
		'trackerhelper' : {
			exports : 'tracker'
		},
		'select2js' : {
			deps : [ 'select2css' ]
		},
		/*'raphael' : {
			exports : 'Raphael'
		},
		'raphaelextended' : {
			deps : [ 'raphael']
		},
		'graphael' : {
			deps : [ 'raphael']
		},
		'graphaelextended' : {
			deps : [ 'graphael']
		},*/
		'gpie' : {
			deps : [ 'graphaelextended' ]
		},
		'gbar' : {
			deps : [ 'graphaelextended' ]
		},
		'customizegbar' : {
			deps : [ 'graphaelextended' ]
		},
		'gline' : {
			deps : [ 'graphaelextended' ]
		},
		'gdumbbell' : {
			deps : [ 'graphaelextended' ]
		},
		'gdoughnut' : {
			deps : [ 'graphaelextended', 'gpie' ]
		},
		'gdoughnutv2' : {
			deps : [ 'graphaelextended' ]
		},
		'gbardumbbell' : {
			deps : [ 'graphaelextended' ]
		},
		'jqueryvalidatemethods' : {
			deps : ['jqueryvalidate']
		}
	},
	waitSeconds : 120
};

(function(){
	try{
		if(document.domain === "www.veanalyze.com"){
			require.paths.piwik = ['//www.veanalyze.com/piwik/piwik'];
		}
	}catch(e){}
	
})();