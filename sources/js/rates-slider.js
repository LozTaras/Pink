(function() {
    var table = document.querySelector('.rates__list');
    var buttons = document.querySelectorAll('.rates .slider-controls__toggle');
    var currentPos = 1;
    var start = 0;

    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', slide);
    }

    table.addEventListener('touchstart', touchSt);

    table.addEventListener('touchend', touchEnd);

    window.addEventListener('resize', resize);

    function touchSt(evt) {
        start = evt.changedTouches[0].clientX;
    }

    function touchEnd(evt) {
        var end = evt.changedTouches[0].clientX;

        if(start > end && start - end > 50) nextSlide();
        if(start < end && end - start > 50) prevSlide();

        start = null;
    }

    function slide() {
        var index = this.dataset.slide;

        deselectedAll();
        buttons[index].classList.add('slider-controls__toggle--active');

        if(index) {
            table.style.marginLeft = -100 * index + '%';
        } else {
            table.style.marginLeft = '0';
        }
    }

    function nextSlide() {
        currentPos++;

        if(currentPos > 2) {
            currentPos = 2;
            return;
        }

        deselectedAll();
        buttons[currentPos].classList.add('slider-controls__toggle--active');

        table.style.marginLeft = -100 * currentPos + '%';
    }

    function prevSlide() {
        currentPos--;

        if(currentPos < 0) {
          currentPos = 0;
          return;
        }

        deselectedAll();
        buttons[currentPos].classList.add('slider-controls__toggle--active');

        table.style.marginLeft = -100 * currentPos + '%';
    }

    function deselectedAll() {
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('slider-controls__toggle--active');
        }
    }

    function resize(evt) {
        var width = document.documentElement.clientWidth;

        if(width > 660) {
          table.style = '';
        }

        if(width < 660) {
          table.style.marginLeft = -100 * currentPos + '%';
        }
    }
})();
