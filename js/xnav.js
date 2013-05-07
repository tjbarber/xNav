(function( $, window, document, undefined ) {
	
	$('html').addClass('js');
	
	var currentID,
		currentPosition,
		currentDistance,
		currentLink,
		currentDirection,
	
		xNav = {
		
			init: function(config) {
				
				this.config = $.extend({}, config);
				
				var cf = xNav.config,
					defaultLinkNumber = cf.defaultLink - 1,
				 	defaultLink = cf.menuItems.eq(defaultLinkNumber).find('a');
			
				// Displaying the container of the content and the default set of data.
				cf.contentContainer.show();
				cf.contentContainer.find('div').eq(defaultLinkNumber).show();
				currentID = defaultLink.attr('href');
				defaultLink.css('cursor','default');
				
				// Checking to see if the navHelper is on and setting the direction.
				if (cf.navHelper === true) {
					cf.isVertical === true ? currentDirection = 'top' : currentDirection = 'left';
				
					// Setting the data of the default set of data so the navHelper knows where it needs to go upon initialization. 
					xNav.setData(xNav.config.menuItems.eq(defaultLinkNumber));
					xNav.helper.set();
				}
			
				(this.config.menuItems).on('click', 'a', this.checkStatus); 
			},
		
			setData: function(a) {
				currentLink = a;
				currentPosition = currentLink.offset();
				// Checks whether this is a horizontal or vertical menu and then assigns currentDistance either the height or the width of the element.
				currentDirection === 'top' ? currentDistance = currentLink.height() : currentDistance = currentLink.width();
			},
		
			checkStatus: function(e) {
				// Keeps the Address Bar from showing "#contentid" everytime we click a link in the menu.
				e.preventDefault();
								
				xNav.setData($(this));
			
				// Check used to see if we're clicking the same link twice. If we are, don't reload. 
				if ( currentID === undefined || currentID !==  currentLink.attr('href') ) {
					xNav.newContentRequest();
				}; 
			},
		
			newContentRequest: function() {
				var cf = xNav.config,
					speed = cf.speed,
					effect = cf.effect;
			
				// We use the ID of the corresponding content set in the link's href attribute so we can use single page sites with JavaScript disabled (always build your sites with JS disabled first). 	
				currentID = currentLink.attr('href');
				currentLink.closest('li').siblings().find('a').css('cursor','auto');
				currentLink.css('cursor','default');
				
				cf.contentContainer.children('div')
					.siblings()
					.hide();
			
				cf.contentContainer
					.children('div' + currentID)[effect](speed);
			
				if (xNav.config.navHelper === true) {
					xNav.helper.control();
				}
			
			},
		
			helper: {
			
				set: function() {
					$('<div id="indicator"></div>')
						.insertBefore(xNav.config.contentContainer)
							.show().css(currentDirection, currentPosition[currentDirection] + (currentDistance / 2.5));
				},
				
				control: function() {
					if ( xNav.config.animatedNavHelper === true ) {
						if ( currentDirection === 'top' ) {
							$('#indicator')
								.animate({
									top: currentPosition[currentDirection] + (currentDistance / 2.5)
								}, [xNav.config.animatedNavHelper]);
							} else {
							$('#indicator')
								.animate({
									left: currentPosition[currentDirection] + (currentDistance / 2.5)
								}, [xNav.config.animatedNavHelper]);
							}
						} else {
						$('#indicator')
							.css(currentDirection, currentPosition[currentDirection] + (currentDistance / 2.5));
						}
					}
				}
			};

	$.fn.xNav = function( userConfig ) {
		var settings = $.extend({
			effect: 'toggle',
			speed:undefined,
			menuItems: undefined,
			contentContainer: undefined,
			navHelper: false,
			defaultLink: 1,
			animatedNavHelper: false,
			animatedNavHelperSpeed: 500,
			isVertical: false
		}, userConfig)
		xNav.init(settings)
	}

})( jQuery, window, document, undefined );