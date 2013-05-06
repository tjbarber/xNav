/*(function() {*/
	
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
			navAnimation: undefined,
			isVertical: false
		},
		
		init: function(config) {
			var cf = xNav.config;
			
			$.extend(this.config, config);
			xNav.setData(xNav.config.menuItems.eq(0));
			cf.contentContainer.show();
			cf.content.eq(0).show();
			
			if (cf.navHelper === true) {
				cf.isVertical === true ? currentDirection = 'top' : currentDirection = 'left';
				xNav.setData(xNav.config.menuItems.eq(0));
				xNav.helper.set();
				xNav.helper.control();
			}
			
			(this.config.menuItems).on('click', 'a', this.checkStatus); 
		},
		
		setData: function(a) {
			currentLink = a;
			currentPosition = currentLink.offset();
			currentDirection === 'top' ? currentDistance = currentLink.height() : currentDistance = currentLink.width();
		},
		
		checkStatus: function(e) {
			e.preventDefault();
			xNav.setData($(this));
			
			if ( currentID === undefined || currentID !==  currentLink.attr('href')) {
				xNav.newContentRequest();
			}; 
		},
		
		newContentRequest: function() {
			var cf = xNav.config,
				speed = cf.speed,
				effect = cf.effect;
				
			currentID = currentLink.attr('href');
			
			cf.contentContainer.show();
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
					console.log("What is should be is: " + (currentPosition[currentDirection] + (currentDistance / 2.5)) + ". If this is not in the 70 range, something is wrong with me.");
					console.log("Something is wrong with me. Here's the data you need:");
					console.log("Current position: " + currentPosition);
					console.log("currentPosition[currentDirection]: " + currentPosition[currentDirection]);
					console.log(currentDirection);
					console.log("currentDistance: " + currentDistance);
					console.log("currentDistance / 2.5: " + currentDistance / 2.5);
					
				}
		}
	};
	
	xNav.init({
		effect: 'fadeToggle',
		menuItems:$('#menu li'),
		contentContainer: $('#content-pages'),
		content: $('#content-pages div'),
		navHelper: true,
		isVertical: true
	});
	
	/*})();*/