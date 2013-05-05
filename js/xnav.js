(function() {
	
	$('html').addClass('js');
	
	var currentID,
		currentPosition,
		currentDistance,
		currentLink,

		xNav = {
		
		config: {
			effect: 'toggle',
			speed:undefined,
			menuItems: undefined,
			contentContainer: undefined,
			content: undefined,
			navHelper: false
		},
		
		init: function(config) {
			var cf = xNav.config;
			
			$.extend(this.config, config);
		
			xNav.setData(xNav.config.menuItems.eq(0));
			cf.contentContainer.show();
			cf.content.eq(0).show();
			xNav.setHelper();
			
			(this.config.menuItems).on('click', 'a', this.checkStatus); 
		},
		
		setData: function(a) {
			currentLink = a,
			currentPosition = currentLink.offset(),
			currentDistance = currentLink.width();
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
			
			xNav.setHelper();
		},
		
		setHelper: function() {
			if (xNav.config.navHelper === true ) $('#indicator')
				.css('left', currentPosition.left + (currentDistance / 2.5))
				.show();
		}
		
	};
	
	xNav.init({
		effect: 'fadeToggle',
		menuItems:$('#menu li'),
		contentContainer: $('#content-pages'),
		content: $('#content-pages div'),
		navHelper: false
	});
	
})();