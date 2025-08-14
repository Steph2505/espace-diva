
  (function ($) {
  
  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });

    // CUSTOM LINK
    $('.custom-link').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 10;

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
  }
});
    
  })(window.jQuery);
$('.bi-whatsapp').on('click touchstart', function(e) {
  e.preventDefault(); // Empêche un double déclenchement
  window.open('https://wa.me/237693427197', '_blank');
});


$(document).ready(function () {
    const $sliderTrack = $('#slider-track');
    const $btnPrev = $('#btn-prev');
    const $btnNext = $('#btn-next');

    const $sliderTrack1 = $('#slider-track1');
    const $btnPrev1 = $('#btn-prev1');
    const $btnNext1 = $('#btn-next1');

    const scrollAmount = 420;
    let autoScrollInterval;
    let autoScrollDelayTimeout;
    let isAutoScrolling = true;
    let touchStartX = 0;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            [$sliderTrack, $sliderTrack1].forEach($track => {
                if ($track.scrollLeft() + $track.outerWidth() >= $track[0].scrollWidth - 1) {
                    $track.animate({ scrollLeft: 0 }, 500);
                } else {
                    $track.animate({ scrollLeft: $track.scrollLeft() + scrollAmount }, 500);
                }
            });
        }, 2000);
        isAutoScrolling = true;
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
        isAutoScrolling = false;
    }

    function restartAutoScrollWithDelay(delay = 10000) {
        stopAutoScroll();
        clearTimeout(autoScrollDelayTimeout);
        autoScrollDelayTimeout = setTimeout(startAutoScroll, delay);
    }

    function scrollNext() {
        [$sliderTrack, $sliderTrack1].forEach($track => {
            $track.animate({ scrollLeft: $track.scrollLeft() + scrollAmount }, 500);
        });
        restartAutoScrollWithDelay();
    }

    function scrollPrev() {
        [$sliderTrack, $sliderTrack1].forEach($track => {
            $track.animate({ scrollLeft: $track.scrollLeft() - scrollAmount }, 500);
        });
        restartAutoScrollWithDelay();
    }

    $btnNext.on('click', scrollNext);
    $btnNext1.on('click', scrollNext);
    $btnPrev.on('click', scrollPrev);
    $btnPrev1.on('click', scrollPrev);

    [$sliderTrack, $sliderTrack1].forEach($track => {
        $track.on('touchstart', function (e) {
            touchStartX = e.originalEvent.touches[0].clientX;
            stopAutoScroll();
        });

        $track.on('touchend', function (e) {
            const touchEndX = e.originalEvent.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;

            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) scrollPrev();
                else scrollNext();
            } else {
                restartAutoScrollWithDelay();
            }
        });
    });

    startAutoScroll();
});





