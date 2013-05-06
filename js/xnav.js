(function() {
	
	$('html').addClass('js');
	
	var currentID,
		currentPosition,
		currentDistance,
		currentLink,
		currentDirection,

		xNav = {
		
			config: {
				effect: 'toggle',
				speed:undefined,
				menuItems: undefined,
				contentContainer: undefined,
				content: undefined,
				navHelper: false,
				isVertical: false
			},
		
			init: function(config) {
				var cf = xNav.config;
			
				$.extend(this.config, config);
			
				// Displaying the container of the content and the first set of data.
				cf.contentContainer.show();
				cf.content.eq(0).show();
			
				// Checking to see if the navHelper is on and setting the direction.
				if (cf.navHelper === true) {
					cf.isVertical === true ? currentDirection = 'top' : currentDirection = 'left';
				
					// Setting the data of the first set of data so the navHelper knows where it needs to go upon initialization. 
					xNav.setData(xNav.config.menuItems.eq(0));
					xNav.helper.set();
					xNav.helper.control();
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
				if ( currentID === undefined || currentID !==  currentLink.attr('href')) {
					xNav.newContentRequest();
				}; 
			},
		
			newContentRequest: function() {
				var cf = xNav.config,
					speed = cf.speed,
					effect = cf.effect;
			
				// We use the ID of the corresponding content set in the link's href attribute so we can use single page sites with JavaScript disabled (always build your sites with JS disabled first). 	
				currentID = currentLink.attr('href');
			
				cf.content
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
						.insertBefore(xNav.config.contentContainer);
				},
			
				control: function() {
					$('#indicator')
						.css(currentDirection, currentPosition[currentDirection] + (currentDistance / 2.5))
						.show();
					}
			}
		};
	
		xNav.init({
			effect: 'fadeToggle',
			menuItems:$('#menu li'),
			contentContainer: $('#content-pages'),
			content: $('#content-pages div'),
			navHelper: false,
			isVertical: false
		});
	
})();