
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

  const el = document.getElementById('whatsapp-icon');

  el.addEventListener('click', function () {
      window.open('https://wa.me/237693427197', '_blank');
  });

  el.addEventListener('touchstart', function () {
      window.open('https://wa.me/237693427197', '_blank');
  });


document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.getElementById('slider-track');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    const sliderTrack1 = document.getElementById('slider-track1');
    const btnPrev1 = document.getElementById('btn-prev1');
    const btnNext1 = document.getElementById('btn-next1');

    const scrollAmount = 420;
    let autoScrollInterval;
    let autoScrollDelayTimeout;
    let isAutoScrolling = true;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            [sliderTrack, sliderTrack1].forEach(track => {
                if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 1) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
        autoScrollDelayTimeout = setTimeout(() => {
            startAutoScroll();
        }, delay);
    }

    function scrollNext() {
        [sliderTrack, sliderTrack1].forEach(track => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        restartAutoScrollWithDelay();
    }

    function scrollPrev() {
        [sliderTrack, sliderTrack1].forEach(track => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        restartAutoScrollWithDelay();
    }

    [btnNext, btnNext1].forEach(btn => btn.addEventListener('click', scrollNext));
    [btnPrev, btnPrev1].forEach(btn => btn.addEventListener('click', scrollPrev));

    [sliderTrack, sliderTrack1].forEach(track => {
        track.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            stopAutoScroll();
        });

        track.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;

            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) scrollPrev();
                else scrollNext();
            } else {
                restartAutoScrollWithDelay();
            }
        });
    });

    let touchStartX = 0;

    startAutoScroll();
});




