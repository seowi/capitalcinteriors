var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

$(function () {

	$.scrollUp({topDistance: '1000'});

	if(isMobile && window.screen.height<=768){
	  	var windowHeight = window.screen.height;
	}else{
	  	var windowHeight = $(window).height();
	}
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
		// Loop through each image to resize it
		if(!isNaN(wrapperRatio)){
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
			})
		}
	}
	resizePortfolioImages("press");
	resizePortfolioImages("project");
	$( window ).on( "orientationchange", function( event ) {
		$('body').css("opacity",0);
		window.setTimeout(function() {
			resizePortfolioImages("press");
			resizePortfolioImages("project");
			$('body').css("opacity",1);
		}, 400);
	});
	$(document).on("click", "#press a" , function() {
		resizePortfolioImages("press");
	});
	$(document).on("click", "#projects a" , function() {
		resizePortfolioImages("project");
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
			   	if(pressPosition>-40 && pressPosition<40){
			   		pressScroll = +$("#press .wrapper").css("margin-left").replace("px","");
					pressScrollNew = pressScroll + (delta * 1.5);
			    	if(delta>0){
			    		if(currentMousePos.y>(pressTop-pressOverlap)){
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
    $("#press .container.init").addClass("init");
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
			if(isMobile){
				pressTrigger = pressOffset-windowHeight;
			}else{
				pressTrigger = pressOffset-(0.8*windowHeight);
			}
			if(topscroll>pressTrigger)
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