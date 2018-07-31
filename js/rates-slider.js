(function() {
    var table = document.querySelector('.rates__list');
    var buttons = document.querySelectorAll('.rates .slider-controls__toggle');

    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            var index = this.dataset.slide;

            deselectedAll();
            buttons[index].classList.add('slider-controls__toggle--active');

            if(index) {
                table.style.marginLeft = -100 * index + '%';
            } else {
                table.style.marginLeft = '0';
            }
        });
    }

    function deselectedAll() {
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('slider-controls__toggle--active');
        }
    }
})();
