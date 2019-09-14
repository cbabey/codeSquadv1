/*-----------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/

(function ($) {

	/*---------------------------------------------------- */
	/* Preloader
------------------------------------------------------ */
	$(window).load(function () {

		// will first fade out the loading animation 
		$("#status").fadeOut("slow");

		// will fade out the whole DIV that covers the website. 
		$("#preloader").delay(500).fadeOut("slow").remove();

		$('.js #hero .hero-image img').addClass("animated fadeInUpBig");
		$('.js #hero .buttons a.trial').addClass("animated shake");

	})


	/*---------------------------------------------------- */
	/* Mobile Menu
------------------------------------------------------ */
	var toggle_button = $("<a>", {
		id: "toggle-btn",
		html: "Menu",
		title: "Menu",
		href: "#"
	}
	);
	var nav_wrap = $('nav#nav-wrap')
	var nav = $("ul#nav");

	/* id JS is enabled, remove the two a.mobile-btns 
	and dynamically prepend a.toggle-btn to #nav-wrap */
	nav_wrap.find('a.mobile-btn').remove();
	nav_wrap.prepend(toggle_button);

	toggle_button.on("click", function (e) {
		e.preventDefault();
		nav.slideToggle("fast");
	});

	if (toggle_button.is(':visible')) nav.addClass('mobile');
	$(window).resize(function () {
		if (toggle_button.is(':visible')) nav.addClass('mobile');
		else nav.removeClass('mobile');
	});

	$('ul#nav li a').on("click", function () {
		if (nav.hasClass('mobile')) nav.fadeOut('fast');
	});


	/*----------------------------------------------------*/
	/* FitText Settings
	------------------------------------------------------ */
	setTimeout(function () {

		$('h1.responsive-headline').fitText(1.2, { minFontSize: '25px', maxFontSize: '40px' });

	}, 100);


	/*----------------------------------------------------*/
	/* Smooth Scrolling
	------------------------------------------------------ */
	$('.smoothscroll').on('click', function (e) {

		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});

	});


	/*----------------------------------------------------*/
	/* Highlight the current section in the navigation bar
	------------------------------------------------------*/
	var sections = $("section"),
		navigation_links = $("#nav-wrap a");

	sections.waypoint({

		handler: function (event, direction) {

			var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

			navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'
	});
	// c;ocl

	function getTimeRemaining(endtime) {
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		var days = Math.floor(t / (1000 * 60 * 60 * 24));
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function initializeClock(id, endtime) {
		var clock = document.getElementById(id);
		var daysSpan = clock.querySelector('.days');
		var hoursSpan = clock.querySelector('.hours');
		var minutesSpan = clock.querySelector('.minutes');
		var secondsSpan = clock.querySelector('.seconds');

		function updateClock() {
			var t = getTimeRemaining(endtime);

			daysSpan.innerHTML = t.days;
			hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

			if (t.total <= 0) {
				clearInterval(timeinterval);
			}
		}

		updateClock();
		var timeinterval = setInterval(updateClock, 1000);
	}

	var deadline = "september 20,2019 12:00:00"//new Date(Date.parse(new Date()) + 6 * 24 * 60 * 60 * 1000);
	initializeClock('clockdiv', deadline);

	/*----------------------------------------------------*/
	/* FitVids
	/*----------------------------------------------------*/
	$(".fluid-video-wrapper").fitVids();


	/*----------------------------------------------------*/
	/* Waypoints Animations
------------------------------------------------------ */
	$('.js .design').waypoint(function () {
		$('.js .design .feature-media').addClass('animated pulse');
	}, { offset: 'bottom-in-view' });

	$('.js .responsive').waypoint(function () {
		$('.js .responsive .feature-media').addClass('animated pulse');
	}, { offset: 'bottom-in-view' });

	$('.js .cross-browser').waypoint(function () {
		$('.js .cross-browser .feature-media').addClass('animated pulse');
	}, { offset: 'bottom-in-view' });

	$('.js .video').waypoint(function () {
		$('.js .video .feature-media').addClass('animated pulse');
	}, { offset: 'bottom-in-view' });

	$('.js #subscribe').waypoint(function () {
		$('.js #subscribe input[type="email"]').addClass('animated fadeInLeftBig show');
		$('.js #subscribe input[type="submit"]').addClass('animated fadeInRightBig show');
	}, { offset: 'bottom-in-view' });


	/*----------------------------------------------------*/
	/* Flexslider
	/*----------------------------------------------------*/
	$('.flexslider').flexslider({
		namespace: "flex-",
		controlsContainer: ".flex-container",
		animation: 'slide',
		controlNav: true,
		directionNav: false,
		smoothHeight: true,
		slideshowSpeed: 7000,
		animationSpeed: 600,
		randomize: false,
	});


	/*----------------------------------------------------*/
	/* ImageLightbox
	/*----------------------------------------------------*/

	if ($("html").hasClass('cssanimations')) {

		var activityIndicatorOn = function () {
			$('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
		},
			activityIndicatorOff = function () {
				$('#imagelightbox-loading').remove();
			},

			overlayOn = function () {
				$('<div id="imagelightbox-overlay"></div>').appendTo('body');
			},
			overlayOff = function () {
				$('#imagelightbox-overlay').remove();
			},

			closeButtonOn = function (instance) {
				$('<a href="#" id="imagelightbox-close" title="close"><i class="fa fa fa-times"></i></a>').appendTo('body').on('click touchend', function () { $(this).remove(); instance.quitImageLightbox(); return false; });
			},
			closeButtonOff = function () {
				$('#imagelightbox-close').remove();
			},

			captionOn = function () {
				var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
				if (description.length > 0)
					$('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
			},
			captionOff = function () {
				$('#imagelightbox-caption').remove();
			};

		var instanceA = $('a[data-imagelightbox="a"]').imageLightbox(
			{
				onStart: function () { overlayOn(); closeButtonOn(instanceA); },
				onEnd: function () { overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); },
				onLoadStart: function () { captionOff(); activityIndicatorOn(); },
				onLoadEnd: function () { captionOn(); activityIndicatorOff(); }

			});

	}
	else {

		/*----------------------------------------------------*/
		/* prettyPhoto for old IE
		/*----------------------------------------------------*/
		$("#screenshots").find(".item-wrap a").attr("rel", "prettyPhoto[pp_gal]");

		$("a[rel^='prettyPhoto']").prettyPhoto({

			animation_speed: 'fast', /* fast/slow/normal */
			slideshow: false, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			deeplinking: false,
			social_tools: false

		});

	}


})(jQuery);