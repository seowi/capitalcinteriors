$(function () {

	$.scrollUp({topDistance: '1000'});

  	var windowHeight = $(window).height();
  	var windowWidth = $(window).width();
	function resizeAdjustments(){
		// Resize header
			// If portrait
			if( (windowWidth>=768 && windowHeight/windowWidth>1.3) || windowHeight/windowWidth>2 ){
				windowHeight = 0.75*windowHeight;
			}
		    $("header .wrapper").height(windowHeight);
	    	if(windowWidth>=768){
			    textHeight = $("header .wrapper .intro-text").height();
			    textMargin = (windowHeight - textHeight)/4;
			    $("header .wrapper .intro-text").css("margin",textMargin + "px 0");
			    $("header .wrapper .intro-text .intro-lead-in").css("margin",(textMargin) + "px 0");
			}else{
		    	$("header .intro-heading").height(windowWidth*0.2364924712);
		    	if(windowWidth>=700){
				    textHeight = $("header .wrapper .intro-text").height();
				    textMargin = (windowHeight - textHeight)/4;
				    $("header .wrapper .intro-text").css("margin",textMargin + "px 0");
				    $("header .wrapper .intro-text .intro-lead-in").css("margin",textMargin + "px 0");
		    	}else if(windowWidth>=600){
				    textHeight = $("header .wrapper .intro-text").height();
				    textMargin = (windowHeight - textHeight)/4;
				    $("header .wrapper .intro-text").css("margin",textMargin + "px 0");
				    $("header .wrapper .intro-text .intro-lead-in").css("margin",(textMargin+40) + "px 0");
		    	}
	    	}
	    // Resize contact
	    	contactHeight = windowHeight-170;
		    if($("section#contact").height()<contactHeight){
		    	$("section#contact").height(contactHeight);
		    }
	}
	resizeAdjustments();
	$( window ).resize(function() {
		resizeAdjustments();
	});


    $("body").css('visibility', 'visible');

    // Resize larger portfolio items
    // itemWidth = $("#projects .portfolio-item.col-md-4 .portfolio-link").width();
    // itemHeight = itemWidth * (3/5);
    // $("#projects .portfolio-item .portfolio-link").height(itemHeight);

	// MAINTAIN PORTFOLIO ASPECT RATIO
	function resizePortfolioImages(modalClass){
		// Open modal in background and take measurements
			$(".modal").addClass("init");
			wrapper = $(".portfolio-modal." + modalClass + " .modal-image");
			wrapperHeight = wrapper.height();
			wrapperWidth = wrapper.width();
			wrapperRatio = wrapperWidth/wrapperHeight;
			$(".modal").removeClass("init");
			console.log("wrapperWidth " + wrapperWidth);
		// Loop through each image to resize it
		if(!isNaN(wrapperRatio)){
			console.log("resize portfolio images");
			$('body').find('.portfolio-modal.' + modalClass + ' .modal-image .images img').each(function(){

				// Reset
					$(this).removeClass("wide tall");
					$(this).css("top","");
				// Establish if the image should be stretched tall or wide
					if(this.width/this.height < 1){
						// Portrait Image
							$(this).attr("data-orientation","portrait");
							// Calculate width, if height was set to 100%
							calcHeight = wrapperHeight;
							calcWidth = calcHeight * (this.width/this.height);
							if(calcWidth<=wrapperWidth){
								imgClass = "tall";
							}else{
								imgClass = "wide";
								calcHeight = wrapperWidth * (this.height/this.width)
							}
					}else{
						// Landscape Image
							$(this).attr("data-orientation","landscape");
							// Calculate height, if width was set to 100%
							calcWidth = wrapperWidth;
							calcHeight = calcWidth * (this.height/this.width);
							$(this).attr("data-calcHeight",calcHeight);
							$(this).attr("data-wrapperHeight",wrapperHeight);
							if(calcHeight<=wrapperHeight){
								imgClass = "wide";
							}else{
								imgClass = "tall";
								calcWith = wrapperHeight * (this.width/this.height);
							}
					}
				// If wide, vertically center
					// if( (wrapperRatio>1 && imgClass=="tall") || (wrapperRatio<1 && imgClass=="wide") ){
					if(imgClass=="wide"){
						topOffset = wrapperHeight/2 - calcHeight/2;
						$(this).css("top",topOffset + "px");
					}
				// Update class
					$(this).addClass(imgClass);
				console.log("resize image");
			})
		}
	}
	resizePortfolioImages("press");
	resizePortfolioImages("project");
	$( window ).on( "orientationchange", function( event ) {
		console.log("rotated");
		$('body').css("opacity",0);
		window.setTimeout(function() {
			resizePortfolioImages("press");
			resizePortfolioImages("project");
			$('body').css("opacity",1);
		}, 400);
	});




    // MOVE BETWEEN PORTFOLIO IMAGES
    function portfolioCarousel(direction){
    	// Determine which modal is visible
    	wrapper = $(".portfolio-modal .modal-image .images:visible");
    	if(wrapper.length==1){
    		// Count number of images
    		imgCount = wrapper.find("img").length;
    		// Get index of currently visible image
    		currentIndex = wrapper.find("img:visible").index() + 1;
    		// Progress index in whichever direction
			if(direction=="previous"){
				if(currentIndex==1){
					nextImg = imgCount;
				}else{
					nextImg = currentIndex - 1;
				}
				// Wiggle arrow icon
				backgroundPos = $(".portfolio-modal .modal-image:visible .nav-left").css("background-position");
				backgroundPosSplit = backgroundPos.split("px");
				backgroundPosSplit[0] = backgroundPosSplit[0] - 10;
				backgroundPosNew = backgroundPosSplit[0] + "px" + backgroundPosSplit[1];
				wrapper.parent().find(".nav-left").css("background-position",backgroundPosNew);
				setTimeout(function(){
					wrapper.parent().find(".nav-left").css("background-position","")
				}, 100);
			}else{
				if(currentIndex==imgCount){
					nextImg = 1;
				}else{
					nextImg = currentIndex + 1;
				}
				// Wiggle arrow icon
				backgroundPos = $(".portfolio-modal .modal-image:visible .nav-right").css("background-position");
				backgroundPosSplit = backgroundPos.split(/px|-/);
				backgroundPosSplit[1] = -backgroundPosSplit[1] + 10;
				backgroundPosNew = backgroundPosSplit[0] + backgroundPosSplit[1] + "px" + backgroundPosSplit[2];
				wrapper.parent().find(".nav-right").css("background-position",backgroundPosNew);
				setTimeout(function(){
					wrapper.parent().find(".nav-right").css("background-position","")
				}, 100);
			}
			// Hide this image and show the next/previous one
				wrapper.find("img").hide();
				wrapper.find("img:nth-of-type(" + nextImg + ")").show();
			// Update zoom link
				href = wrapper.find("img:nth-of-type(" + nextImg + ")").attr("src");
				console.log("link: " + href);
				wrapper.parent().find("a.image-zoom").attr("href",href);
    	}
    }
	$(document).on("click", ".portfolio-modal .modal-image .nav-right" , function() {
		portfolioCarousel("next");
	});
	$(document).on("click", ".portfolio-modal .modal-image .nav-left" , function() {
		portfolioCarousel("previous");
	});
	$(document).keydown(function(e) {
		if($(".portfolio-modal .modal-image:visible").length==1){
		    switch(e.which) {
		        case 37: // left
		        	portfolioCarousel("previous");
		        break;

		        case 38: // up
		        	portfolioCarousel("next");
		        break;

		        case 39: // right
		        	portfolioCarousel("next");
		        break;

		        case 40: // down
		        	portfolioCarousel("previous");
		        break;

		        default: return;
		    }
		    e.preventDefault();
		}
	});

    // SCROLL REVEAL
	    window.sr = ScrollReveal();
	    sr.reveal("header .intro-heading", {origin: 'left'});
	    sr.reveal("header .intro-lead-in", {origin: 'left', delay: 100});
	    sr.reveal("#headerButton", {origin: 'left', delay: 200});
	    sr.reveal('#quote .container', {delay: 0, duration: 1000});
	    // sr.reveal('#projects .portfolio-item');

    // HORIZONTAL SCROLL WHEN WE REACH PRESS 
	    var currentMousePos = { x: -1, y: -1 };
	    $(document).mousemove(function(event) {
	        currentMousePos.x = event.pageX;
	        currentMousePos.y = event.pageY;
	    });
		$("body").mousewheel(function(event, delta) {
	    	if($(window).width()>800){
			    pressTop = $('#press .wrapper').offset().top;
			    pressBottom = pressTop + $('#press').height();
			    pressOverlap = (windowHeight - $('#press').height())/6;
			   	pressPosition = pressTop - $(window).scrollTop();
			   	pressPosition += $('#press .wrapper').height()/2;
			   	pressPosition -= $(window).height()/2;
				// console.log("pressPosition: " + pressPosition);
			   	if(pressPosition>-40 && pressPosition<40){
			   		pressScroll = +$("#press .wrapper").css("margin-left").replace("px","");
					pressScrollNew = pressScroll + (delta * 1.5);
			    	if(delta>0){
			    		if(currentMousePos.y>(pressTop-pressOverlap)){
				    		console.log("scroll up");
				    		if(pressScroll<0){
						    	$("#press .wrapper").css("margin-left",pressScrollNew);
								event.preventDefault();
				    		}
			    		}
					   	if(pressScroll>0){
					   		$("#press .wrapper").css("margin-left",0);
					   	}
			    	}else{
			    		lastElementPosition = $("#press .portfolio-item:last-child").position().left + 25;
			    		desiredPosition = $(window).width()-$("#press .portfolio-item:last-child").width();
			    		if(currentMousePos.y<(pressBottom+pressOverlap)){
				    		if(lastElementPosition>desiredPosition){
						    	$("#press .wrapper").css("margin-left",pressScrollNew);
								event.preventDefault();
				    		}
			    		}
			    		if(lastElementPosition<desiredPosition){
			    			overshoot = desiredPosition - lastElementPosition;
			    			correction = pressScroll + overshoot;
					    	$("#press .wrapper").css("margin-left",correction);
			    		}
			    	}
			   	}
			}
		});

    // SCROLL
	$(window).scroll(function (e) { 
		topscroll = $(this).scrollTop();
		// Header parallax
			$('header .wrapper').css({
			  'top' : (topscroll/10)+"px"
			}); 
			$('header .wrapper .container').css({
			  'top' : -(topscroll/6)+"px"
			}); 
			$('header .wrapper .intro-heading').css({
			  'top' : -(topscroll/5)+"px"
			}); 
		// Show nav bar & logo
			if(topscroll>120){
				$("nav#mainNav").fadeIn();
				$("nav#mainNav .navbar-brand").fadeIn();
			}else{
				if($(window).width()<768) $("nav#mainNav").fadeOut();
				$("nav#mainNav .navbar-brand").hide();
			}
		// Reveal press
			pressOffset = $("#press").offset().top;
			if(topscroll>(pressOffset-(0.8*windowHeight)))
				$("#press .container.init").removeClass("init");
	});
	// Show elements if page is loaded pre-scrolled
		topscroll = $(window).scrollTop();
		if(topscroll>120)
			$("nav#mainNav .navbar-brand").fadeIn();
		pressOffset = $("#press").offset().top;
		if(topscroll>(pressOffset-windowHeight))
			$("#press .container.init").removeClass("init");



});