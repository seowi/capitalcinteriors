var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


function ChangeUrl(title, url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    }
}

$(function () {

	// Load instagram via ajax
	$.get( "instagram.php", function( data ) {
		$( "#instagram .ajax" ).html( data );
	});

	$.scrollUp({topDistance: '1000'});

	// Header background
	function progressHeaderPhoto(){
		// photos = ['bistro.jpg','blanco.jpg','sothebys.jpg','villasofia.jpg','chelseamodern.jpg'];
		photos = $("header").attr("data-background-images").split(",");
		currentIndex = $("header").attr("data-background");
		if(currentIndex==(photos.length-1)){
			nextIndex = 0;
		}else{
			nextIndex = +currentIndex + 1;
		}
		$("header").attr("data-background",nextIndex);
		nextPhoto = photos[nextIndex];

		var image = new Image();
		image.onload = function () {
			setTimeout(function(){ 
				$("header").css("background-image","url('img/projects/" + nextPhoto + "-p.jpg')");
	    	}, 1000);
		}
		image.src = 'img/projects/' + nextPhoto + '-p.jpg';

	}
	setInterval(function(){ progressHeaderPhoto() }, 7000);


	if(isMobile && window.screen.height<=768){
	  	var windowHeight = window.screen.height;
	}else{
	  	var windowHeight = $(window).height();
	}
  	var windowWidth = $(window).width();
	function resizeAdjustments(){
		// Resize header
			// If portrait
			if( (windowWidth>=768 && windowHeight/windowWidth>1.3) || windowHeight/windowWidth>1.75 ){
				windowHeight = 0.75*windowHeight;
			}
		    $("header .wrapper").height(windowHeight);
		    logoHeight = $("header .intro-logo").height();
		    // $("header .intro-logo").css("margin",(-logoHeight/3) + "px 0");
		    navHeight = $("#mainNav").outerHeight();
		    textHeight = $("header .wrapper .intro-text").height();
		    textMargin = (windowHeight - textHeight)/2;
		    // $("header .wrapper .intro-text").css("margin",(textMargin) + "px auto " + textMargin + "px auto");
		  //   	if(windowWidth>=768){
				//     textHeight = $("header .wrapper .intro-text").height();
				//     textMargin = (windowHeight - textHeight)/4;
				//     $("header .wrapper .intro-text").css("margin",textMargin + "px auto");
				//     $("header .wrapper .intro-text .intro-lead-in").css("margin",(textMargin) + "px auto");
				// }else{
			 //    	$("header .intro-heading").height(windowWidth*0.2364924712);
			 //    	if(windowWidth>=700){
				// 	    textHeight = $("header .wrapper .intro-text").height();
				// 	    textMargin = (windowHeight - textHeight)/4;
				// 	    $("header .wrapper .intro-text").css("margin",textMargin + "px auto");
				// 	    $("header .wrapper .intro-text .intro-lead-in").css("margin",textMargin + "px auto");
			 //    	}else if(windowWidth>=600){
				// 	    textHeight = $("header .wrapper .intro-text").height();
				// 	    textMargin = (windowHeight - textHeight)/4;
				// 	    $("header .wrapper .intro-text").css("margin",textMargin + "px auto");
				// 	    $("header .wrapper .intro-text .intro-lead-in").css("margin",(textMargin+40) + "px auto");
			 //    	}
		  //   	}
	    // Resize contact
	    	contactHeight = windowHeight-170;
		    if($("section#contact").height()<contactHeight){
		    	// $("section#contact").height(contactHeight);
		    }
	    // Resize in-progress
	    	if(windowWidth>991){
	    		setTimeout(function(){ 
		    		ipHeight = $("#projects a.portfolio-link:first").height();
			    	$("#in-progress a").height(ipHeight);
			    	$("#in-progress-img").css("margin-top",(-ipHeight/2)+"px");
		    	}, 1000);
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
	function resizePortfolioImages(modalID){
		// Open modal in background and take measurements
			$(modalID).addClass("init");
			$('body').find(modalID + ' .modal-image .images .img-wrapper').show();
			wrapper = $(modalID + " .modal-image");
			wrapperHeight = wrapper.height();
			wrapperWidth = wrapper.width();
			wrapperRatio = wrapperWidth/wrapperHeight;
		// Loop through each image to resize it
		if(!isNaN(wrapperRatio)){
			$('body').find(modalID + ' .modal-image .images .img-wrapper img.project-image').each(function(){
				element = $(this);
			    imgWidth = +element.data('width');
			    imgHeight = +element.data('height');
				if(imgWidth>0 && imgHeight>0){
				   console.log(imgWidth + " " + imgHeight);
					// Establish if the image should be stretched tall or wide
						if(imgWidth/imgHeight < 1){
							// Portrait Image
								element.attr("data-orientation","portrait");
								// Calculate width, if height was set to 100%
								calcHeight = wrapperHeight;
								calcWidth = calcHeight * (imgWidth/imgHeight);
								if(calcWidth<=wrapperWidth){
									imgClass = "tall";
								}else{
									imgClass = "wide";
									calcHeight = wrapperWidth * (imgHeight/imgWidth)
								}
						}else{
							// Landscape Image
								element.attr("data-orientation","landscape");
								// Calculate height, if width was set to 100%
								calcWidth = wrapperWidth;
								calcHeight = calcWidth * (imgHeight/imgWidth);
								element.attr("data-calcHeight",calcHeight);
								element.attr("data-wrapperHeight",wrapperHeight);
								if(calcHeight<=wrapperHeight){
									imgClass = "wide";
								}else{
									imgClass = "tall";
									calcWith = wrapperHeight * (imgWidth/imgHeight);
								}
						}
					// Reset
						element.removeClass("wide tall");
						element.css("top","");
					// If wide, vertically center
						// if( (wrapperRatio>1 && imgClass=="tall") || (wrapperRatio<1 && imgClass=="wide") ){
						if(imgClass=="wide"){
							topOffset = wrapperHeight/2 - calcHeight/2;
							element.css("top",topOffset + "px");
						}
					// Update class
						element.addClass(imgClass);
				}
			})
		}
		// Reset modal
		$('body').find(modalID + ' .modal-image .images .img-wrapper').hide();
		$('body').find(modalID + ' .modal-image .images .img-wrapper:first').show();
		$(".modal").removeClass("init").css("padding-right",0);
	}
	// resizePortfolioImages("press");
	// resizePortfolioImages("project");
	$( window ).on( "orientationchange", function( event ) {
		$('body').css("opacity",0);
		window.setTimeout(function() {
			resizePortfolioImages("press");
			resizePortfolioImages("project");
			$('body').css("opacity",1);
		}, 400);
	});
	$(document).on("mouseover", "#press a, #projects a" , function() {
		if($(".project.modal").length == 0 ){
			// Load modals via ajax
			$.get( "modals.php", function( data ) {
				$( "#modals-wrapper" ).html( data );
			});
		}
	});
	$(document).on("click", "#press a" , function() {
		modalID = $(this).attr("href");
		resizePortfolioImages(modalID);
		title = $(this).data("title");
		url = $(this).data("url");
		ChangeUrl('Capital C Interiors - ' + title,url);
	});
	$(document).on("click", "#projects a" , function() {
		modalID = $(this).attr("href");
		resizePortfolioImages(modalID);
		title = $(this).data("title");
		url = $(this).data("url");
		ChangeUrl('Capital C Interiors - ' + title,url);
	});
	$('.modal').on('hidden.bs.modal', function () {
		url = $("body").data("root");
		ChangeUrl('Capital C Interiors',url);
	})

	// Modal load/redirect
	if($("a[data-toggle='modal'][data-onLoad]").length==1){
		$("a[data-toggle='modal'][data-onLoad]:last").trigger("click");
	}
    $(window).on('popstate', function() {
    	path = window.location.pathname.replace(/\//g, '').replace("capitalcinteriors","");
    	if(path==''){
    		$(".modal:visible").modal("hide");
    	}else{
    		$(".modal[data-url='" + path + "']").modal("show");
    	}

    });



    // MOVE BETWEEN PORTFOLIO IMAGES
    function portfolioCarousel(direction){
    	// Determine which modal is visible
    	wrapper = $(".portfolio-modal .modal-image .images:visible");
    	if(wrapper.length==1){
    		// Count number of images
    		imgCount = wrapper.find(".img-wrapper").length;
    		// Get index of currently visible image
    		currentIndex = wrapper.find(".img-wrapper:visible").index() + 1;
    		// Progress index in whichever direction
			if(direction=="previous"){
				if(currentIndex==1){
					if($(".portfolio-modal[data-category='In-Progress']:visible").length>0){
						prev = $(".portfolio-modal[data-category='In-Progress']:visible").prevAll(".portfolio-modal[data-category='In-Progress']:first");
						if(prev.length==0){
							prev = $(".portfolio-modal[data-category='In-Progress']:visible").nextAll(".portfolio-modal[data-category='In-Progress']:last");
						}
						$(".portfolio-modal[data-category='In-Progress']:visible").removeClass('fade').modal('hide').addClass('fade');
						modalID = prev.data("id");
						prev.removeClass('fade');
						$("a.portfolio-link[href^='#" + modalID + "']:first").trigger("click");
						prev.addClass('fade');
						return;
					}
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
					if($(".portfolio-modal[data-category='In-Progress']:visible").length>0){
						next = $(".portfolio-modal[data-category='In-Progress']:visible").nextAll(".portfolio-modal[data-category='In-Progress']:first");
						if(next.length==0){
							next = $(".portfolio-modal[data-category='In-Progress']:visible").prevAll(".portfolio-modal[data-category='In-Progress']:last");
						}
						$(".portfolio-modal[data-category='In-Progress']:visible").removeClass('fade').modal('hide').addClass('fade');
						modalID = next.data("id");
						next.removeClass('fade');
						$("a.portfolio-link[href^='#" + modalID + "']:first").trigger("click");
						next.addClass('fade');
						return;
					}
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
				wrapper.find(".img-wrapper").hide();
				wrapper.find(".img-wrapper:nth-of-type(" + nextImg + ")").show();
			// Update zoom link
				href = wrapper.find("img:nth-of-type(" + nextImg + ")").attr("src");
				wrapper.parent().find("a.image-zoom").attr("href",href);
    	}
    }
	$(document).on("click", ".portfolio-modal .modal-image .nav-right" , function() {
		portfolioCarousel("next");
	});
	$(document).on("swipeleft", ".portfolio-modal .modal-image" , function() {
		portfolioCarousel("next");
	});
	$(document).on("click", ".portfolio-modal .modal-image .nav-left" , function() {
		portfolioCarousel("previous");
	});
	$(document).on("swiperight", ".portfolio-modal .modal-image" , function() {
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
		$("#press .container").mousewheel(function(event, delta) {
	    	if($(window).width()>800){
			    pressTop = $('#press .wrapper').offset().top;
			    pressBottom = pressTop + $('#press').height();
			    pressOverlap = (windowHeight - $('#press').height())/6;
			   	pressPosition = pressTop - $(window).scrollTop();
			   	pressPosition += $('#press .wrapper').height()/2;
			   	pressPosition -= $(window).height()/2;
			   	if(pressPosition>-100 && pressPosition<100){
			   		pressScroll = +$("#press .wrapper").css("margin-left").replace("px","");
					pressScrollNew = pressScroll + (delta * 1.5);
			    	if(delta>0){
			    		if(currentMousePos.y>(pressTop-pressOverlap)){
				    		if(pressScroll<0){
				    			$('.press_nav_left').fadeIn();
				    			$('.press_nav_right').fadeIn();
						    	$("#press .wrapper").css("margin-left",pressScrollNew);
								event.preventDefault();
				    		}
			    		}
					   	if(pressScroll>0){
			    			$('.press_nav_left').fadeOut();
			    			$('.press_nav_right').fadeIn();
					   		$("#press .wrapper").css("margin-left",0);
					   	}
			    	}else{
			    		lastElementPosition = $("#press .portfolio-item:last-child").position().left + 25;
			    		desiredPosition = $(window).width()-$("#press .portfolio-item:last-child").width();
			    		if(currentMousePos.y<(pressBottom+pressOverlap)){
				    		if(lastElementPosition>desiredPosition){
				    			$('.press_nav_right').fadeIn();
				    			$('.press_nav_left').fadeIn();
						    	$("#press .wrapper").css("margin-left",pressScrollNew);
								event.preventDefault();
				    		}
			    		}
			    		if(lastElementPosition<desiredPosition){
			    			$('.press_nav_right').fadeOut();
			    			overshoot = desiredPosition - lastElementPosition;
			    			correction = pressScroll + overshoot;
					    	$("#press .wrapper").css("margin-left",correction);
			    		}
			    	}
			   	}
			}
		});

	// MANUALLY SCROLL PRESS
	$('.press_nav_left').each(function () {
		var hovered = false;
		var loop = window.setInterval(function () {
			if (hovered && $(window).width()>800) {
		   		pressScroll = +$("#press .wrapper").css("margin-left").replace("px","");
	    		if(pressScroll<0){
	    			newMargin = pressScroll+60;
	    			newMargin = Math.min(newMargin,0);
					$("#press .wrapper").animate({ marginLeft: newMargin}, 80);
	    			$('.press_nav_right').fadeIn();
	    		}else{
	    			$('.press_nav_left').fadeOut();
	    		}
			}
		}, 100);
		$(this).hover(
			function () {
				hovered = true;
			},
			function () {
				hovered = false;
			}
		);
	});
	$('.press_nav_right').each(function () {
		var hovered = false;
		var loop = window.setInterval(function () {
			if (hovered && $(window).width()>800) {
	    		lastElementPosition = $("#press .portfolio-item:last-child").position().left + 25;
	    		desiredPosition = $(window).width()-$("#press .portfolio-item:last-child").width();
	    		if(lastElementPosition>desiredPosition){
	    			pressScroll = +$("#press .wrapper").css("margin-left").replace("px","");
	    			newMargin = pressScroll-60;
	    			maxMargin = pressScroll + (desiredPosition - lastElementPosition);
	    			newMargin = Math.max(newMargin,maxMargin);
					$("#press .wrapper").animate({ marginLeft: newMargin}, 80);
	    			$('.press_nav_left').fadeIn();
	    		}else{
	    			$('.press_nav_right').fadeOut();
	    		}
			}
		}, 100);
		$(this).hover(
			function () {
				hovered = true;
			},
			function () {
				hovered = false;
			}
		);
	});

    // SCROLL
    $("#press .container").addClass("init");
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
				$("nav#mainNav .navbar-links").css("width","auto");
			}else{
				if($(window).width()<768) $("nav#mainNav").fadeOut();
				$("nav#mainNav .navbar-brand").hide();
				$("nav#mainNav .navbar-links").css("width","100%");
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

	// CONTACT FORM
	$(document).on("keydown", "#emailForm input" , function(e) {
		$("#emailForm .recaptcha").show();
	});
	$(document).on("submit", "#emailForm" , function(e) {
		captcha = grecaptcha.getResponse();
		console.log("captcha: " + captcha);
		if(captcha==""){
			alert("Please complete the 'reCAPTCHA' check so we know you're not a robot.");
			return false;
		}
		$("#captchaInput").val(1);
		$("#emailForm button[type='submit']").html("Sending...");
		$.ajax({
			type: "GET",
			url: "",
			data: $("#emailForm").serialize(),
			success: function(data){
				console.log(data);
				if(data==""){
					$("#emailForm").trigger("reset");
					$("#emailForm button[type='submit']").html("Sent, thank you!");
		    		setTimeout(function(){ 
			    		$("#emailForm button[type='submit']").html("Send Message");
			    	}, 5000);
				}else{
					alert(data);
					$("#emailForm button[type='submit']").html("Send Message");
				}
			}
		});
		e.preventDefault();
		return false;
	});


});