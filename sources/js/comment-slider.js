(function() {
    var contentWidth = document.body.querySelector('.reviews__content').offsetWidth;
    var nextBtn      = document.body.querySelector('.reviews__button--next');
    var prevBtn      = document.body.querySelector('.reviews__button--prev');
    var list         = document.body.querySelector('.reviews__list');
    var sliderItems  = document.body.querySelectorAll('.reviews__item');
    var mobileBtns   = document.body.querySelectorAll('.reviews .slider-controls__toggle');
    var test         = false;
    var start        = null;
    var current      = 0;

    if(document.documentElement.clientWidth < 960) {
        prevNextSlideTablet();
    } else {
        prevNextSlideDesktop();
    }

    window.addEventListener('resize', function() {
        if(document.documentElement.clientWidth < 960) {
            prevNextSlideTablet();
        } else {
            prevNextSlideDesktop();
        }
    });

    nextBtn.addEventListener('click', nextSlide);

    prevBtn.addEventListener('click', prevSlide);

    list.addEventListener('touchstart', touch);

    list.addEventListener('touchend', touchEnd);

    for(var i = 0; i < mobileBtns.length; i++) {
        mobileBtns[i].onclick = mobileSlider;
    }

    function prevNextSlideTablet() {
        contentWidth = document.body.querySelector('.reviews__content').offsetWidth;

        deselectedAll();
        onTransition();
        mobileBtns[current].classList.add('slider-controls__toggle--active');

        for(var i = 0; i < sliderItems.length; i++) {
            list.appendChild(sliderItems[i]);
        }

        for(var j = 1; j < sliderItems.length; j++) {
            sliderItems[j].style.marginLeft = '';
        }

        if(current == 1) {
            sliderItems[0].style.marginLeft = -contentWidth + 'px';
        }

        if(current == 2) {
            sliderItems[0].style.marginLeft = -contentWidth * 2 + 'px';
        }
    }

    function prevNextSlideDesktop() {
        contentWidth = document.body.querySelector('.reviews__content').offsetWidth;

        offTransition();

        var a = +current - 1;
        if(a < 0) {
            a = sliderItems.length - 1;
        }
        sliderItems[a].parentNode.insertBefore(sliderItems[a], sliderItems[current]);
        sliderItems[a].style.marginLeft = -contentWidth + 'px';

        sliderItems[current].style.marginLeft = '';

        var b = current + 1;
        if(b >= sliderItems.length) {
            b = 0;
        }
        sliderItems[b].parentNode.insertBefore(sliderItems[b], sliderItems[current].nextElementSibling);
        sliderItems[b].style.marginLeft = '';
    }

    function deselectedAll() {
        for(var i = 0; i < mobileBtns.length; i++) {
            if(mobileBtns[i].classList.contains('slider-controls__toggle--active')) {
                mobileBtns[i].classList.remove('slider-controls__toggle--active');
            }
        }
    }

    function offTransition() {
        for(var i = 0; i < sliderItems.length; i++) {
            sliderItems[i].style.transition = 'none';
        }
    }

    function onTransition() {
        for(var i = 0; i < sliderItems.length; i++) {
            sliderItems[i].style.transition = '';
        }
    }

    function mobileSlider() {
        current = +this.dataset.slide;
        contentWidth = document.body.querySelector('.reviews__content').offsetWidth;

        if(current) {
            sliderItems[0].style.marginLeft = current * -contentWidth + 'px';
        } else {
            sliderItems[0].style.marginLeft = '';
        }

        deselectedAll();
        mobileBtns[current].classList.add('slider-controls__toggle--active');
    }

    function touchMobileSlider() {
        contentWidth = document.body.querySelector('.reviews__content').offsetWidth;

        if(current) {
            sliderItems[0].style.marginLeft = current * -contentWidth + 'px';
        } else {
            sliderItems[0].style.marginLeft = '';
        }

        deselectedAll();
        mobileBtns[current].classList.add('slider-controls__toggle--active');
    }

    function nextSlide() {
        if(test) {
            return;
        }
        onTransition();

        var tmp = current - 1;
        if(tmp < 0) {
            tmp = sliderItems.length - 1;
        }

        sliderItems[tmp].style.marginLeft = parseFloat(getComputedStyle(sliderItems[tmp]).marginLeft) - contentWidth + 'px';

        current++;
        if(current >= sliderItems.length) {
            current = 0;
        }
        test = true;

        setTimeout(function() {
            prevNextSlideDesktop();
            test = false;
        }, 1000);
    }

    function prevSlide() {
        if(test) {
            return;
        }
        onTransition();

        var tmp = current - 1;
        if(tmp < 0) {
            tmp = sliderItems.length - 1;
        }

        sliderItems[tmp].style.marginLeft = '';

        current--;
        if(current < 0) {
            current = sliderItems.length - 1;
        }
        test = true;

        setTimeout(function() {
            prevNextSlideDesktop();
            test = false;
        }, 1000);
    }

    function touch(evt) {
        start = evt.changedTouches[0].clientX;
    }

    function touchEnd(evt) {
       var end;
       if(document.documentElement.clientWidth > 960) {
           end= evt.changedTouches[0].clientX;

           if(start > end && start - end > 50) nextSlide();
           if(start < end && end - start > 50) prevSlide();
       } else {
           end= evt.changedTouches[0].clientX;

           if(start > end && (start - end) > 50) {
               current++;
               if(current > 2) current = 2;

               touchMobileSlider();
           }
           if(start < end && end - start > 50) {
               current--;
               if(current < 0) current = 0;

               touchMobileSlider();
           }
       }

       start = null;
   }

})();
