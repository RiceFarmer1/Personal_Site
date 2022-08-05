/* ----------------------------------
jQuery Timelinr 0.9.54
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
https://www.opensource.org/licenses/mit-license.php
---------------------------------- */

$(function(){
	$().timelinr({
	arrowKeys: 'true'
	})
});

jQuery.fn.timelinr = function(options){
	settings = jQuery.extend({
		orientation: 				'horizontal',	
		containerDiv: 				'#timeline',		
		datesDiv: 					'#dates',		
		datesSelectedClass: 		'selected',			
		datesSpeed: 				'normal',			
		yearsDiv: 					'#years',		
		yearsSelectedClass: 		'selected',			
		yearsSpeed: 				'fast',				
		yearsTransparency: 		0.2,				
		yearsTransparencySpeed: 	500,				
		prevButton: 				'#prev',			
		nextButton: 				'#next',			
		arrowKeys: 					'false',	
		startAt: 					1,					
		autoPlay: 					'false',		
		autoPlayDirection: 			'forward',			
		autoPlayPause: 				2000			
	}, options);

	$(function(){
		var howManyDates = $(settings.datesDiv+' li').length;
		var howManyyears = $(settings.yearsDiv+' li').length;
		var widthContainer = $(settings.containerDiv).width();
		var heightContainer = $(settings.containerDiv).height();
		var widthIssue = $(settings.yearsDiv+' li').width();
		var heightIssue = $(settings.yearsDiv+' li').height();
		var widthDate = $(settings.datesDiv+' li').width();
		var heightDate = $(settings.datesDiv+' li').height();

		if(settings.orientation == 'horizontal') {	
			$(settings.yearsDiv).width(widthIssue*howManyyears);
			$(settings.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
			var defaultPositionDates = "";
			defaultPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
		} else if(settings.orientation == 'vertical') {
			$(settings.yearsDiv).height(heightIssue*howManyyears);
			$(settings.datesDiv).height(heightDate*howManyDates).css('marginTop',heightContainer/2-heightDate/2);
			var defaultPositionDates = "";
			defaultPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
		}
		
		$(settings.datesDiv+' a').click(function(event){

			event.preventDefault();
			var currentIndex = $(this).parent().prevAll().length;
			if(settings.orientation == 'horizontal') {
				$(settings.yearsDiv).animate({'marginLeft':-widthIssue*currentIndex},{queue:false, duration:settings.yearsSpeed});
			} else if(settings.orientation == 'vertical') {
				$(settings.yearsDiv).animate({'marginTop':-heightIssue*currentIndex},{queue:false, duration:settings.yearsSpeed});
			}
			$(settings.yearsDiv+' li').animate({'opacity':settings.yearsTransparency},{queue:false, duration:settings.yearsSpeed}).removeClass(settings.yearsSelectedClass).eq(currentIndex).addClass(settings.yearsSelectedClass).fadeTo(settings.yearsTransparencySpeed,1);
		
			if(howManyDates == 1) {
				$(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if($(settings.yearsDiv+' li:first-child').hasClass(settings.yearsSelectedClass)) {
					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');
				} 
				else if($(settings.yearsDiv+' li:last-child').hasClass(settings.yearsSelectedClass)) {
					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( $(settings.yearsDiv+' li:first-child').hasClass(settings.yearsSelectedClass) ) {
					$(settings.nextButton).fadeIn('fast');
					$(settings.prevButton).fadeOut('fast');
				} 
				else if( $(settings.yearsDiv+' li:last-child').hasClass(settings.yearsSelectedClass) ) {
					$(settings.prevButton).fadeIn('fast');
					$(settings.nextButton).fadeOut('fast');
				}
				else {
					$(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}

			$(settings.datesDiv+' a').removeClass(settings.datesSelectedClass);
			$(this).addClass(settings.datesSelectedClass);
			if(settings.orientation == 'horizontal') {
				$(settings.datesDiv).animate({'marginLeft':defaultPositionDates-(widthDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
			} else if(settings.orientation == 'vertical') {
				$(settings.datesDiv).animate({'marginTop':defaultPositionDates-(heightDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
			}
		});

		$(settings.nextButton).bind('click', function(event){
			event.preventDefault();
			var currentIndex = $(settings.yearsDiv).find('li.'+settings.yearsSelectedClass).index();
			if(settings.orientation == 'horizontal') {
				var currentPositionyears = parseInt($(settings.yearsDiv).css('marginLeft').substring(0,$(settings.yearsDiv).css('marginLeft').indexOf('px')));
				if(currentPositionyears <= -(widthIssue*howManyyears-(widthIssue))) {
					$(settings.yearsDiv).stop();
					$(settings.datesDiv+' li:last-child a').click();
				} else {
					if (!$(settings.yearsDiv).is(':animated')) {
						$(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionyears = parseInt($(settings.yearsDiv).css('marginTop').substring(0,$(settings.yearsDiv).css('marginTop').indexOf('px')));
				if(currentPositionyears <= -(heightIssue*howManyyears-(heightIssue))) {
					$(settings.yearsDiv).stop();
					$(settings.datesDiv+' li:last-child a').click();
				} else {
					if (!$(settings.yearsDiv).is(':animated')) {
						$(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
					}
				}
			}

			if(howManyDates == 1) {
				$(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if($(settings.yearsDiv+' li:first-child').hasClass(settings.yearsSelectedClass)) {
					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');
				} 
				else if($(settings.yearsDiv+' li:last-child').hasClass(settings.yearsSelectedClass)) {
					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( $(settings.yearsDiv+' li:first-child').hasClass(settings.yearsSelectedClass) ) {
					$(settings.prevButton).fadeOut('fast');
				} 
				else if( $(settings.yearsDiv+' li:last-child').hasClass(settings.yearsSelectedClass) ) {
					$(settings.nextButton).fadeOut('fast');
				}
				else {
					$(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}
		});

		$(settings.prevButton).click(function(event){
			event.preventDefault();
			var currentIndex = $(settings.yearsDiv).find('li.'+settings.yearsSelectedClass).index();
			if(settings.orientation == 'horizontal') {
				var currentPositionyears = parseInt($(settings.yearsDiv).css('marginLeft').substring(0,$(settings.yearsDiv).css('marginLeft').indexOf('px')));
				if(currentPositionyears >= 0) {
					$(settings.yearsDiv).stop();
					$(settings.datesDiv+' li:first-child a').click();
				} else {
					if (!$(settings.yearsDiv).is(':animated')) {
						$(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionyears = parseInt($(settings.yearsDiv).css('marginTop').substring(0,$(settings.yearsDiv).css('marginTop').indexOf('px')));
				if(currentPositionyears >= 0) {
					$(settings.yearsDiv).stop();
					$(settings.datesDiv+' li:first-child a').click();
				} else {
					if (!$(settings.yearsDiv).is(':animated')) {
						$(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
					}
				}
			}

			if(howManyDates == 1) {
				$(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if($(settings.yearsDiv+' li:first-child').hasClass(settings.yearsSelectedClass)) {
					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');
				} 
				else if($(settings.yearsDiv+' li:last-child').hasClass(settings.yearsSelectedClass)) {
					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( $(settings.yearsDiv+' li:first-child').hasClass(settings.yearsSelectedClass) ) {
					$(settings.prevButton).fadeOut('fast');
				} 
				else if( $(settings.yearsDiv+' li:last-child').hasClass(settings.yearsSelectedClass) ) {
					$(settings.nextButton).fadeOut('fast');
				}
				else {
					$(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}
		});

		if(settings.arrowKeys=='true') {
			if(settings.orientation=='horizontal') {
				$(document).keydown(function(event){
					if (event.keyCode == 39) { 
				       $(settings.nextButton).click();
				    }
					if (event.keyCode == 37) { 
				       $(settings.prevButton).click();
				    }
				});
			} else if(settings.orientation=='vertical') {
				$(document).keydown(function(event){
					if (event.keyCode == 40) { 
				       $(settings.nextButton).click();
				    }
					if (event.keyCode == 38) { 
				       $(settings.prevButton).click();
				    }
				});
			}
		}

		$(settings.datesDiv+' li').eq(settings.startAt-1).find('a').trigger('click');
		if(settings.autoPlay == 'true') { 
			setInterval("autoPlay()", settings.autoPlayPause);
		}
	});
};

function autoPlay(){
	var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
	if(settings.autoPlayDirection == 'forward') {
		if(currentDate.parent().is('li:last-child')) {
			$(settings.datesDiv+' li:first-child').find('a').trigger('click');
		} else {
			currentDate.parent().next().find('a').trigger('click');
		}
	} else if(settings.autoPlayDirection == 'backward') {
		if(currentDate.parent().is('li:first-child')) {
			$(settings.datesDiv+' li:last-child').find('a').trigger('click');
		} else {
			currentDate.parent().prev().find('a').trigger('click');
		}
	}
}