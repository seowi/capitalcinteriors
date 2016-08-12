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