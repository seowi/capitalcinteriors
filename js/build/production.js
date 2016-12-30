// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    var scrollOffsetDefault = $(window).height()/3;
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        if($($anchor.attr('href')).is("#press")){
            console.log("custom scroll offset");
            scrollOffset = $(window).height()/2 - $('#press .wrapper').height()/2;
        }else{
            var scrollOffset = 70;
        }
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - scrollOffset)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    var navOffset = $(window).height()/2;
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: navOffset
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 120
        }
    })

})(jQuery); // End of use strict
// Contact Form Scripts

$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

function isElementVisible(el) {
    var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || doc.documentElement.clientWidth,
        vHeight  = window.innerHeight || doc.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };     

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 
            || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
          el.contains(efp(rect.left,  rect.top))
      ||  el.contains(efp(rect.right, rect.top))
      ||  el.contains(efp(rect.right, rect.bottom))
      ||  el.contains(efp(rect.left,  rect.bottom))
    );
}

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

	// Reviews
	function progressReviews(){
		el = $("#reviews")[0];
		if ( isElementVisible(el) ) {
			console.log("review update");
			index = $("#reviews .quote:visible").index();
			count = $("#reviews .quote").length;
			$("#reviews .quote").eq(index).fadeOut( 400, function() {
				if(index==count-1) index = -1;
				$("#reviews .quote").eq(index+1).fadeIn();
			});
		}
	}
	reviewInterval = setInterval(function(){ progressReviews() }, 5500);
	$(document).on("click", "#reviews a" , function() {
		clearInterval(reviewInterval);
		$("#reviews .quote hr").fadeIn();
		$("#reviews .quote").fadeIn();
		$(this).fadeOut();
		return false;
	});

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
		    	}, 2000);
	    	}
	}
	resizeAdjustments();
	$( window ).resize(function() {
		resizeAdjustments();
	});


	// Add facebook
	setTimeout(function(){ 
		$("iframe[src*='facebook']").parent().remove();
		fullHeight = $("#projects div.portfolio-item:first").height();
		ipWidth = $("#projects a.portfolio-link:first").width();
    	facebook = "<div class='col-md-4 col-sm-6 portfolio-item'> <iframe src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcapitalcinteriors%2F&tabs=timeline&width=" + ipWidth + "&height=" + fullHeight + "&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=454088521298355' width='" + ipWidth + "' height='" + fullHeight + "' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe> </div>";
    	$("#in-progress").after(facebook);
	}, 2000);


    $("body").css('visibility', 'visible');

    // Resize larger portfolio items
    // itemWidth = $("#projects .portfolio-item.col-md-4 .portfolio-link").width();
    // itemHeight = itemWidth * (3/5);
    // $("#projects .portfolio-item .portfolio-link").height(itemHeight);

	function loadModals() {
		if($(".project.modal").length == 0 ){
			// Load modals via ajax
			$.get( "modals.php", function( data ) {
				$( "#modals-wrapper" ).html( data );
			});
		}
	}

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
		loadModals();
	});
	$(document).on("click", "#press a" , function() {
		loadModals();
		modalID = $(this).attr("href");
		resizePortfolioImages(modalID);
		title = $(this).data("title");
		url = $(this).data("url");
		ChangeUrl('Capital C Interiors - ' + title,url);
	});
	$(document).on("click", "#projects a" , function() {
		loadModals();
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
	    sr.reveal('#process .col-md-2', {origin: 'left', delay: 200, duration: 1000});
	    sr.reveal('#process .col-md-10', {origin: 'right', delay: 200, duration: 1000});
	    // sr.reveal('#quote .container', {delay: 0, duration: 1000});
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
/* jqBootstrapValidation
 * A plugin for automating validation on Twitter Bootstrap formatted forms.
 *
 * v1.3.6
 *
 * License: MIT <http://opensource.org/licenses/mit-license.php> - see LICENSE file
 *
 * http://ReactiveRaven.github.com/jqBootstrapValidation/
 */

(function( $ ){

	var createdElements = [];

	var defaults = {
		options: {
			prependExistingHelpBlock: false,
			sniffHtml: true, // sniff for 'required', 'maxlength', etc
			preventSubmit: true, // stop the form submit event from firing if validation fails
			submitError: false, // function called if there is an error when trying to submit
			submitSuccess: false, // function called just before a successful submit event is sent to the server
            semanticallyStrict: false, // set to true to tidy up generated HTML output
			autoAdd: {
				helpBlocks: true
			},
            filter: function () {
                // return $(this).is(":visible"); // only validate elements you can see
                return true; // validate everything
            }
		},
    methods: {
      init : function( options ) {

        var settings = $.extend(true, {}, defaults);

        settings.options = $.extend(true, settings.options, options);

        var $siblingElements = this;

        var uniqueForms = $.unique(
          $siblingElements.map( function () {
            return $(this).parents("form")[0];
          }).toArray()
        );

        $(uniqueForms).bind("submit", function (e) {
          var $form = $(this);
          var warningsFound = 0;
          var $inputs = $form.find("input,textarea,select").not("[type=submit],[type=image]").filter(settings.options.filter);
          $inputs.trigger("submit.validation").trigger("validationLostFocus.validation");

          $inputs.each(function (i, el) {
            var $this = $(el),
              $controlGroup = $this.parents(".form-group").first();
            if (
              $controlGroup.hasClass("warning")
            ) {
              $controlGroup.removeClass("warning").addClass("error");
              warningsFound++;
            }
          });

          $inputs.trigger("validationLostFocus.validation");

          if (warningsFound) {
            if (settings.options.preventSubmit) {
              e.preventDefault();
            }
            $form.addClass("error");
            if ($.isFunction(settings.options.submitError)) {
              settings.options.submitError($form, e, $inputs.jqBootstrapValidation("collectErrors", true));
            }
          } else {
            $form.removeClass("error");
            if ($.isFunction(settings.options.submitSuccess)) {
              settings.options.submitSuccess($form, e);
            }
          }
        });

        return this.each(function(){

          // Get references to everything we're interested in
          var $this = $(this),
            $controlGroup = $this.parents(".form-group").first(),
            $helpBlock = $controlGroup.find(".help-block").first(),
            $form = $this.parents("form").first(),
            validatorNames = [];

          // create message container if not exists
          if (!$helpBlock.length && settings.options.autoAdd && settings.options.autoAdd.helpBlocks) {
              $helpBlock = $('<div class="help-block" />');
              $controlGroup.find('.controls').append($helpBlock);
							createdElements.push($helpBlock[0]);
          }

          // =============================================================
          //                                     SNIFF HTML FOR VALIDATORS
          // =============================================================

          // *snort sniff snuffle*

          if (settings.options.sniffHtml) {
            var message = "";
            // ---------------------------------------------------------
            //                                                   PATTERN
            // ---------------------------------------------------------
            if ($this.attr("pattern") !== undefined) {
              message = "Not in the expected format<!-- data-validation-pattern-message to override -->";
              if ($this.data("validationPatternMessage")) {
                message = $this.data("validationPatternMessage");
              }
              $this.data("validationPatternMessage", message);
              $this.data("validationPatternRegex", $this.attr("pattern"));
            }
            // ---------------------------------------------------------
            //                                                       MAX
            // ---------------------------------------------------------
            if ($this.attr("max") !== undefined || $this.attr("aria-valuemax") !== undefined) {
              var max = ($this.attr("max") !== undefined ? $this.attr("max") : $this.attr("aria-valuemax"));
              message = "Too high: Maximum of '" + max + "'<!-- data-validation-max-message to override -->";
              if ($this.data("validationMaxMessage")) {
                message = $this.data("validationMaxMessage");
              }
              $this.data("validationMaxMessage", message);
              $this.data("validationMaxMax", max);
            }
            // ---------------------------------------------------------
            //                                                       MIN
            // ---------------------------------------------------------
            if ($this.attr("min") !== undefined || $this.attr("aria-valuemin") !== undefined) {
              var min = ($this.attr("min") !== undefined ? $this.attr("min") : $this.attr("aria-valuemin"));
              message = "Too low: Minimum of '" + min + "'<!-- data-validation-min-message to override -->";
              if ($this.data("validationMinMessage")) {
                message = $this.data("validationMinMessage");
              }
              $this.data("validationMinMessage", message);
              $this.data("validationMinMin", min);
            }
            // ---------------------------------------------------------
            //                                                 MAXLENGTH
            // ---------------------------------------------------------
            if ($this.attr("maxlength") !== undefined) {
              message = "Too long: Maximum of '" + $this.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->";
              if ($this.data("validationMaxlengthMessage")) {
                message = $this.data("validationMaxlengthMessage");
              }
              $this.data("validationMaxlengthMessage", message);
              $this.data("validationMaxlengthMaxlength", $this.attr("maxlength"));
            }
            // ---------------------------------------------------------
            //                                                 MINLENGTH
            // ---------------------------------------------------------
            if ($this.attr("minlength") !== undefined) {
              message = "Too short: Minimum of '" + $this.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->";
              if ($this.data("validationMinlengthMessage")) {
                message = $this.data("validationMinlengthMessage");
              }
              $this.data("validationMinlengthMessage", message);
              $this.data("validationMinlengthMinlength", $this.attr("minlength"));
            }
            // ---------------------------------------------------------
            //                                                  REQUIRED
            // ---------------------------------------------------------
            if ($this.attr("required") !== undefined || $this.attr("aria-required") !== undefined) {
              message = settings.builtInValidators.required.message;
              if ($this.data("validationRequiredMessage")) {
                message = $this.data("validationRequiredMessage");
              }
              $this.data("validationRequiredMessage", message);
            }
            // ---------------------------------------------------------
            //                                                    NUMBER
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "number") {
              message = settings.builtInValidators.number.message;
              if ($this.data("validationNumberMessage")) {
                message = $this.data("validationNumberMessage");
              }
              $this.data("validationNumberMessage", message);
            }
            // ---------------------------------------------------------
            //                                                     EMAIL
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "email") {
              message = "Not a valid email address<!-- data-validator-validemail-message to override -->";
              if ($this.data("validationValidemailMessage")) {
                message = $this.data("validationValidemailMessage");
              } else if ($this.data("validationEmailMessage")) {
                message = $this.data("validationEmailMessage");
              }
              $this.data("validationValidemailMessage", message);
            }
            // ---------------------------------------------------------
            //                                                MINCHECKED
            // ---------------------------------------------------------
            if ($this.attr("minchecked") !== undefined) {
              message = "Not enough options checked; Minimum of '" + $this.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->";
              if ($this.data("validationMincheckedMessage")) {
                message = $this.data("validationMincheckedMessage");
              }
              $this.data("validationMincheckedMessage", message);
              $this.data("validationMincheckedMinchecked", $this.attr("minchecked"));
            }
            // ---------------------------------------------------------
            //                                                MAXCHECKED
            // ---------------------------------------------------------
            if ($this.attr("maxchecked") !== undefined) {
              message = "Too many options checked; Maximum of '" + $this.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->";
              if ($this.data("validationMaxcheckedMessage")) {
                message = $this.data("validationMaxcheckedMessage");
              }
              $this.data("validationMaxcheckedMessage", message);
              $this.data("validationMaxcheckedMaxchecked", $this.attr("maxchecked"));
            }
          }

          // =============================================================
          //                                       COLLECT VALIDATOR NAMES
          // =============================================================

          // Get named validators
          if ($this.data("validation") !== undefined) {
            validatorNames = $this.data("validation").split(",");
          }

          // Get extra ones defined on the element's data attributes
          $.each($this.data(), function (i, el) {
            var parts = i.replace(/([A-Z])/g, ",$1").split(",");
            if (parts[0] === "validation" && parts[1]) {
              validatorNames.push(parts[1]);
            }
          });

          // =============================================================
          //                                     NORMALISE VALIDATOR NAMES
          // =============================================================

          var validatorNamesToInspect = validatorNames;
          var newValidatorNamesToInspect = [];

          do // repeatedly expand 'shortcut' validators into their real validators
          {
            // Uppercase only the first letter of each name
            $.each(validatorNames, function (i, el) {
              validatorNames[i] = formatValidatorName(el);
            });

            // Remove duplicate validator names
            validatorNames = $.unique(validatorNames);

            // Pull out the new validator names from each shortcut
            newValidatorNamesToInspect = [];
            $.each(validatorNamesToInspect, function(i, el) {
              if ($this.data("validation" + el + "Shortcut") !== undefined) {
                // Are these custom validators?
                // Pull them out!
                $.each($this.data("validation" + el + "Shortcut").split(","), function(i2, el2) {
                  newValidatorNamesToInspect.push(el2);
                });
              } else if (settings.builtInValidators[el.toLowerCase()]) {
                // Is this a recognised built-in?
                // Pull it out!
                var validator = settings.builtInValidators[el.toLowerCase()];
                if (validator.type.toLowerCase() === "shortcut") {
                  $.each(validator.shortcut.split(","), function (i, el) {
                    el = formatValidatorName(el);
                    newValidatorNamesToInspect.push(el);
                    validatorNames.push(el);
                  });
                }
              }
            });

            validatorNamesToInspect = newValidatorNamesToInspect;

          } while (validatorNamesToInspect.length > 0)

          // =============================================================
          //                                       SET UP VALIDATOR ARRAYS
          // =============================================================

          var validators = {};

          $.each(validatorNames, function (i, el) {
            // Set up the 'override' message
            var message = $this.data("validation" + el + "Message");
            var hasOverrideMessage = (message !== undefined);
            var foundValidator = false;
            message =
              (
                message
                  ? message
                  : "'" + el + "' validation failed <!-- Add attribute 'data-validation-" + el.toLowerCase() + "-message' to input to change this message -->"
              )
            ;

            $.each(
              settings.validatorTypes,
              function (validatorType, validatorTemplate) {
                if (validators[validatorType] === undefined) {
                  validators[validatorType] = [];
                }
                if (!foundValidator && $this.data("validation" + el + formatValidatorName(validatorTemplate.name)) !== undefined) {
                  validators[validatorType].push(
                    $.extend(
                      true,
                      {
                        name: formatValidatorName(validatorTemplate.name),
                        message: message
                      },
                      validatorTemplate.init($this, el)
                    )
                  );
                  foundValidator = true;
                }
              }
            );

            if (!foundValidator && settings.builtInValidators[el.toLowerCase()]) {

              var validator = $.extend(true, {}, settings.builtInValidators[el.toLowerCase()]);
              if (hasOverrideMessage) {
                validator.message = message;
              }
              var validatorType = validator.type.toLowerCase();

              if (validatorType === "shortcut") {
                foundValidator = true;
              } else {
                $.each(
                  settings.validatorTypes,
                  function (validatorTemplateType, validatorTemplate) {
                    if (validators[validatorTemplateType] === undefined) {
                      validators[validatorTemplateType] = [];
                    }
                    if (!foundValidator && validatorType === validatorTemplateType.toLowerCase()) {
                      $this.data("validation" + el + formatValidatorName(validatorTemplate.name), validator[validatorTemplate.name.toLowerCase()]);
                      validators[validatorType].push(
                        $.extend(
                          validator,
                          validatorTemplate.init($this, el)
                        )
                      );
                      foundValidator = true;
                    }
                  }
                );
              }
            }

            if (! foundValidator) {
              $.error("Cannot find validation info for '" + el + "'");
            }
          });

          // =============================================================
          //                                         STORE FALLBACK VALUES
          // =============================================================

          $helpBlock.data(
            "original-contents",
            (
              $helpBlock.data("original-contents")
                ? $helpBlock.data("original-contents")
                : $helpBlock.html()
            )
          );

          $helpBlock.data(
            "original-role",
            (
              $helpBlock.data("original-role")
                ? $helpBlock.data("original-role")
                : $helpBlock.attr("role")
            )
          );

          $controlGroup.data(
            "original-classes",
            (
              $controlGroup.data("original-clases")
                ? $controlGroup.data("original-classes")
                : $controlGroup.attr("class")
            )
          );

          $this.data(
            "original-aria-invalid",
            (
              $this.data("original-aria-invalid")
                ? $this.data("original-aria-invalid")
                : $this.attr("aria-invalid")
            )
          );

          // =============================================================
          //                                                    VALIDATION
          // =============================================================

          $this.bind(
            "validation.validation",
            function (event, params) {

              var value = getValue($this);

              // Get a list of the errors to apply
              var errorsFound = [];

              $.each(validators, function (validatorType, validatorTypeArray) {
                if (value || value.length || (params && params.includeEmpty) || (!!settings.validatorTypes[validatorType].blockSubmit && params && !!params.submitting)) {
                  $.each(validatorTypeArray, function (i, validator) {
                    if (settings.validatorTypes[validatorType].validate($this, value, validator)) {
                      errorsFound.push(validator.message);
                    }
                  });
                }
              });

              return errorsFound;
            }
          );

          $this.bind(
            "getValidators.validation",
            function () {
              return validators;
            }
          );

          // =============================================================
          //                                             WATCH FOR CHANGES
          // =============================================================
          $this.bind(
            "submit.validation",
            function () {
              return $this.triggerHandler("change.validation", {submitting: true});
            }
          );
          $this.bind(
            [
              "keyup",
              "focus",
              "blur",
              "click",
              "keydown",
              "keypress",
              "change"
            ].join(".validation ") + ".validation",
            function (e, params) {

              var value = getValue($this);

              var errorsFound = [];

              $controlGroup.find("input,textarea,select").each(function (i, el) {
                var oldCount = errorsFound.length;
                $.each($(el).triggerHandler("validation.validation", params), function (j, message) {
                  errorsFound.push(message);
                });
                if (errorsFound.length > oldCount) {
                  $(el).attr("aria-invalid", "true");
                } else {
                  var original = $this.data("original-aria-invalid");
                  $(el).attr("aria-invalid", (original !== undefined ? original : false));
                }
              });

              $form.find("input,select,textarea").not($this).not("[name=\"" + $this.attr("name") + "\"]").trigger("validationLostFocus.validation");

              errorsFound = $.unique(errorsFound.sort());

              // Were there any errors?
              if (errorsFound.length) {
                // Better flag it up as a warning.
                $controlGroup.removeClass("success error").addClass("warning");

                // How many errors did we find?
                if (settings.options.semanticallyStrict && errorsFound.length === 1) {
                  // Only one? Being strict? Just output it.
                  $helpBlock.html(errorsFound[0] + 
                    ( settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : "" ));
                } else {
                  // Multiple? Being sloppy? Glue them together into an UL.
                  $helpBlock.html("<ul role=\"alert\"><li>" + errorsFound.join("</li><li>") + "</li></ul>" +
                    ( settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : "" ));
                }
              } else {
                $controlGroup.removeClass("warning error success");
                if (value.length > 0) {
                  $controlGroup.addClass("success");
                }
                $helpBlock.html($helpBlock.data("original-contents"));
              }

              if (e.type === "blur") {
                $controlGroup.removeClass("success");
              }
            }
          );
          $this.bind("validationLostFocus.validation", function () {
            $controlGroup.removeClass("success");
          });
        });
      },
      destroy : function( ) {

        return this.each(
          function() {

            var
              $this = $(this),
              $controlGroup = $this.parents(".form-group").first(),
              $helpBlock = $controlGroup.find(".help-block").first();

            // remove our events
            $this.unbind('.validation'); // events are namespaced.
            // reset help text
            $helpBlock.html($helpBlock.data("original-contents"));
            // reset classes
            $controlGroup.attr("class", $controlGroup.data("original-classes"));
            // reset aria
            $this.attr("aria-invalid", $this.data("original-aria-invalid"));
            // reset role
            $helpBlock.attr("role", $this.data("original-role"));
						// remove all elements we created
						if (createdElements.indexOf($helpBlock[0]) > -1) {
							$helpBlock.remove();
						}

          }
        );

      },
      collectErrors : function(includeEmpty) {

        var errorMessages = {};
        this.each(function (i, el) {
          var $el = $(el);
          var name = $el.attr("name");
          var errors = $el.triggerHandler("validation.validation", {includeEmpty: true});
          errorMessages[name] = $.extend(true, errors, errorMessages[name]);
        });

        $.each(errorMessages, function (i, el) {
          if (el.length === 0) {
            delete errorMessages[i];
          }
        });

        return errorMessages;

      },
      hasErrors: function() {

        var errorMessages = [];

        this.each(function (i, el) {
          errorMessages = errorMessages.concat(
            $(el).triggerHandler("getValidators.validation") ? $(el).triggerHandler("validation.validation", {submitting: true}) : []
          );
        });

        return (errorMessages.length > 0);
      },
      override : function (newDefaults) {
        defaults = $.extend(true, defaults, newDefaults);
      }
    },
		validatorTypes: {
      callback: {
        name: "callback",
        init: function ($this, name) {
          return {
            validatorName: name,
            callback: $this.data("validation" + name + "Callback"),
            lastValue: $this.val(),
            lastValid: true,
            lastFinished: true
          };
        },
        validate: function ($this, value, validator) {
          if (validator.lastValue === value && validator.lastFinished) {
            return !validator.lastValid;
          }

          if (validator.lastFinished === true)
          {
            validator.lastValue = value;
            validator.lastValid = true;
            validator.lastFinished = false;

            var rrjqbvValidator = validator;
            var rrjqbvThis = $this;
            executeFunctionByName(
              validator.callback,
              window,
              $this,
              value,
              function (data) {
                if (rrjqbvValidator.lastValue === data.value) {
                  rrjqbvValidator.lastValid = data.valid;
                  if (data.message) {
                    rrjqbvValidator.message = data.message;
                  }
                  rrjqbvValidator.lastFinished = true;
                  rrjqbvThis.data("validation" + rrjqbvValidator.validatorName + "Message", rrjqbvValidator.message);
                  // Timeout is set to avoid problems with the events being considered 'already fired'
                  setTimeout(function () {
                    rrjqbvThis.trigger("change.validation");
                  }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
                }
              }
            );
          }

          return false;

        }
      },
      ajax: {
        name: "ajax",
        init: function ($this, name) {
          return {
            validatorName: name,
            url: $this.data("validation" + name + "Ajax"),
            lastValue: $this.val(),
            lastValid: true,
            lastFinished: true
          };
        },
        validate: function ($this, value, validator) {
          if (""+validator.lastValue === ""+value && validator.lastFinished === true) {
            return validator.lastValid === false;
          }

          if (validator.lastFinished === true)
          {
            validator.lastValue = value;
            validator.lastValid = true;
            validator.lastFinished = false;
            $.ajax({
              url: validator.url,
              data: "value=" + value + "&field=" + $this.attr("name"),
              dataType: "json",
              success: function (data) {
                if (""+validator.lastValue === ""+data.value) {
                  validator.lastValid = !!(data.valid);
                  if (data.message) {
                    validator.message = data.message;
                  }
                  validator.lastFinished = true;
                  $this.data("validation" + validator.validatorName + "Message", validator.message);
                  // Timeout is set to avoid problems with the events being considered 'already fired'
                  setTimeout(function () {
                    $this.trigger("change.validation");
                  }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
                }
              },
              failure: function () {
                validator.lastValid = true;
                validator.message = "ajax call failed";
                validator.lastFinished = true;
                $this.data("validation" + validator.validatorName + "Message", validator.message);
                // Timeout is set to avoid problems with the events being considered 'already fired'
                setTimeout(function () {
                  $this.trigger("change.validation");
                }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
              }
            });
          }

          return false;

        }
      },
			regex: {
				name: "regex",
				init: function ($this, name) {
					return {regex: regexFromString($this.data("validation" + name + "Regex"))};
				},
				validate: function ($this, value, validator) {
					return (!validator.regex.test(value) && ! validator.negative)
						|| (validator.regex.test(value) && validator.negative);
				}
			},
			required: {
				name: "required",
				init: function ($this, name) {
					return {};
				},
				validate: function ($this, value, validator) {
					return !!(value.length === 0  && ! validator.negative)
						|| !!(value.length > 0 && validator.negative);
				},
        blockSubmit: true
			},
			match: {
				name: "match",
				init: function ($this, name) {
					var element = $this.parents("form").first().find("[name=\"" + $this.data("validation" + name + "Match") + "\"]").first();
					element.bind("validation.validation", function () {
						$this.trigger("change.validation", {submitting: true});
					});
					return {"element": element};
				},
				validate: function ($this, value, validator) {
					return (value !== validator.element.val() && ! validator.negative)
						|| (value === validator.element.val() && validator.negative);
				},
        blockSubmit: true
			},
			max: {
				name: "max",
				init: function ($this, name) {
					return {max: $this.data("validation" + name + "Max")};
				},
				validate: function ($this, value, validator) {
					return (parseFloat(value, 10) > parseFloat(validator.max, 10) && ! validator.negative)
						|| (parseFloat(value, 10) <= parseFloat(validator.max, 10) && validator.negative);
				}
			},
			min: {
				name: "min",
				init: function ($this, name) {
					return {min: $this.data("validation" + name + "Min")};
				},
				validate: function ($this, value, validator) {
					return (parseFloat(value) < parseFloat(validator.min) && ! validator.negative)
						|| (parseFloat(value) >= parseFloat(validator.min) && validator.negative);
				}
			},
			maxlength: {
				name: "maxlength",
				init: function ($this, name) {
					return {maxlength: $this.data("validation" + name + "Maxlength")};
				},
				validate: function ($this, value, validator) {
					return ((value.length > validator.maxlength) && ! validator.negative)
						|| ((value.length <= validator.maxlength) && validator.negative);
				}
			},
			minlength: {
				name: "minlength",
				init: function ($this, name) {
					return {minlength: $this.data("validation" + name + "Minlength")};
				},
				validate: function ($this, value, validator) {
					return ((value.length < validator.minlength) && ! validator.negative)
						|| ((value.length >= validator.minlength) && validator.negative);
				}
			},
			maxchecked: {
				name: "maxchecked",
				init: function ($this, name) {
					var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
					elements.bind("click.validation", function () {
						$this.trigger("change.validation", {includeEmpty: true});
					});
					return {maxchecked: $this.data("validation" + name + "Maxchecked"), elements: elements};
				},
				validate: function ($this, value, validator) {
					return (validator.elements.filter(":checked").length > validator.maxchecked && ! validator.negative)
						|| (validator.elements.filter(":checked").length <= validator.maxchecked && validator.negative);
				},
        blockSubmit: true
			},
			minchecked: {
				name: "minchecked",
				init: function ($this, name) {
					var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
					elements.bind("click.validation", function () {
						$this.trigger("change.validation", {includeEmpty: true});
					});
					return {minchecked: $this.data("validation" + name + "Minchecked"), elements: elements};
				},
				validate: function ($this, value, validator) {
					return (validator.elements.filter(":checked").length < validator.minchecked && ! validator.negative)
						|| (validator.elements.filter(":checked").length >= validator.minchecked && validator.negative);
				},
        blockSubmit: true
			}
		},
		builtInValidators: {
			email: {
				name: "Email",
				type: "shortcut",
				shortcut: "validemail"
			},
			validemail: {
				name: "Validemail",
				type: "regex",
				regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\.[A-Za-z]{2,4}",
				message: "Not a valid email address<!-- data-validator-validemail-message to override -->"
			},
			passwordagain: {
				name: "Passwordagain",
				type: "match",
				match: "password",
				message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->"
			},
			positive: {
				name: "Positive",
				type: "shortcut",
				shortcut: "number,positivenumber"
			},
			negative: {
				name: "Negative",
				type: "shortcut",
				shortcut: "number,negativenumber"
			},
			number: {
				name: "Number",
				type: "regex",
				regex: "([+-]?\\\d+(\\\.\\\d*)?([eE][+-]?[0-9]+)?)?",
				message: "Must be a number<!-- data-validator-number-message to override -->"
			},
			integer: {
				name: "Integer",
				type: "regex",
				regex: "[+-]?\\\d+",
				message: "No decimal places allowed<!-- data-validator-integer-message to override -->"
			},
			positivenumber: {
				name: "Positivenumber",
				type: "min",
				min: 0,
				message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->"
			},
			negativenumber: {
				name: "Negativenumber",
				type: "max",
				max: 0,
				message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->"
			},
			required: {
				name: "Required",
				type: "required",
				message: "This is required<!-- data-validator-required-message to override -->"
			},
			checkone: {
				name: "Checkone",
				type: "minchecked",
				minchecked: 1,
				message: "Check at least one option<!-- data-validation-checkone-message to override -->"
			}
		}
	};

	var formatValidatorName = function (name) {
		return name
			.toLowerCase()
			.replace(
				/(^|\s)([a-z])/g ,
				function(m,p1,p2) {
					return p1+p2.toUpperCase();
				}
			)
		;
	};

	var getValue = function ($this) {
		// Extract the value we're talking about
		var value = $this.val();
		var type = $this.attr("type");
		if (type === "checkbox") {
			value = ($this.is(":checked") ? value : "");
		}
		if (type === "radio") {
			value = ($('input[name="' + $this.attr("name") + '"]:checked').length > 0 ? value : "");
		}
		return value;
	};

  function regexFromString(inputstring) {
		return new RegExp("^" + inputstring + "$");
	}

  /**
   * Thanks to Jason Bunting via StackOverflow.com
   *
   * http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string#answer-359910
   * Short link: http://tinyurl.com/executeFunctionByName
  **/
  function executeFunctionByName(functionName, context /*, args*/) {
    var args = Array.prototype.slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(this, args);
  }

	$.fn.jqBootstrapValidation = function( method ) {

		if ( defaults.methods[method] ) {
			return defaults.methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return defaults.methods.init.apply( this, arguments );
		} else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.jqBootstrapValidation' );
			return null;
		}

	};

  $.jqBootstrapValidation = function (options) {
    $(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this,arguments);
  };

})( jQuery );


