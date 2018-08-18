(function () {
    var iconsList = document.querySelector('.post__icons-list');
    var icons = document.querySelectorAll('.post__icons-item');
    var sliders = document.querySelectorAll('.post__scale-item');

    iconsList.addEventListener('click', function (evt) {
        var target = evt.target;

        while(target != this) {
            if(target.tagName == 'LI') {
                break;
            }

            target = target.parentNode;
        }

        if(target == this) {
            return;
        }

        defaultAll();
        sliders[target.dataset.slider].classList.remove('post__scale-item--hidden');
        icons[target.dataset.slider].classList.add('post__icons-item--active');
    });

    function defaultAll() {
        for(var i = 0; i < sliders.length; i++) {
            sliders[i].classList.add('post__scale-item--hidden');
            icons[i].classList.remove('post__icons-item--active');
        }
    }
})();
