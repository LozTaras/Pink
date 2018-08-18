(function() {
    var btn = document.querySelector('.page-header__toggle');
    var innerWrapprer = document.querySelector('.page-header__inner-wrapper');

    btn.addEventListener('click', function() {
        innerWrapprer.classList.toggle('page-header__inner-wrapper--open');
    });

    document.addEventListener('keydown', function(evt) {
        if(evt.which == 27) {
            innerWrapprer.classList.remove('page-header__inner-wrapper--open');
        }
    });
})();
