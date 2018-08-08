(function() {
    document.addEventListener('click', function(evt) {
        var target = evt.target;

        while(target != this) {
            if(target.classList.contains('like')) {
                break;
            }

            target = target.parentNode;
        }

        if(target == this) {
            return;
        }

        var count = target.querySelector('.like__count');
        if(target.classList.contains('like--active')) {
            count.innerHTML--;
        } else {
            count.innerHTML++;
        }

        target.classList.toggle('like--active');
    });
})();
