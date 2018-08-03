(function() {
    if(document.body.classList.contains('main')) {
        var contentWidth = document.body.querySelector('.reviews__content').offsetWidth;
        var nextBtn      = document.body.querySelector('.reviews__button--next');
        var prevBtn      = document.body.querySelector('.reviews__button--prev');
        var list         = document.body.querySelector('.reviews__list');
        var sliderItems  = document.body.querySelectorAll('.reviews__item');
        var mobileBtns   = document.body.querySelectorAll('.reviews .slider-controls__toggle');
        var test         = false;
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

        nextBtn.addEventListener('click', function() {
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
        });

        prevBtn.addEventListener('click', function() {
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
        });

        for(var i = 0; i < mobileBtns.length; i++) {
            mobileBtns[i].onclick = function() {
                current = +this.dataset.slide;
                contentWidth = document.body.querySelector('.reviews__content').offsetWidth;

                if(current) {
                    sliderItems[0].style.marginLeft = current * -contentWidth + 'px';
                } else {
                    sliderItems[0].style.marginLeft = '';
                }

                deselectedAll();
                mobileBtns[current].classList.add('slider-controls__toggle--active');
            };
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
    }
})();
