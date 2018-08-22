(function() {
    function Slider(options) {
        var handle = document.querySelector(options.handle);
        var handleCoords = getCoords(handle);

        var scale = handle.parentNode;
        var scaleCoords = getCoords(scale);

        var reset = document.querySelector(options.reset);

        var maxLeft = scale.offsetWidth - handle.offsetWidth;
        var persend = parseFloat(getComputedStyle(handle).left) / (maxLeft / 100);
        var image = document.querySelector(options.image);

        handle.addEventListener('mousedown', function(evt) {
            if(evt.which != 1) return;
            evt.preventDefault();

            handleCoords = getCoords(handle);
            scaleCoords = getCoords(scale);

            var shiftX = evt.pageX - handleCoords.left;
            maxLeft = scale.offsetWidth - handle.offsetWidth;

            handle.style.backgroundColor = '#d22856';
            document.body.style.cursor = 'pointer';

            document.addEventListener('mousemove', moveAt);
            document.addEventListener('mouseup', stopMove);

            if(options.type == 'crop') {
                document.addEventListener('mousemove', crop);
            }

            if(options.type == 'fill') {
                document.addEventListener('mousemove', fill);
            }

            if(options.type == 'сontr') {
                document.addEventListener('mousemove', сontr);
            }

            function moveAt(evt) {
                evt.preventDefault();
                var newLeft = evt.pageX - scaleCoords.left - shiftX;

                if(reset.disabled) {
                    reset.disabled = false;
                }
                if(newLeft <= 0) newLeft = 0;

                if(newLeft > maxLeft) {
                    newLeft = maxLeft;
                }

                handle.style.left = newLeft + 'px';
            }

            function stopMove() {
                handle.style.backgroundColor = '';
                document.body.style.cursor = '';

                document.removeEventListener('mousemove', moveAt);
                document.removeEventListener('mousemove', fill);
                document.removeEventListener('mousemove', сontr);
                document.removeEventListener('mousemove', crop);
                document.removeEventListener('mouseup', stopMove);
            }
        });

        window.addEventListener('resize', function(evt) {
            var currentMax = scale.offsetWidth - handle.offsetWidth;
            var imageContainer = image.parentNode;
            while(imageContainer) {
                if(imageContainer.classList.contains('post__image-overflow')) break;

                imageContainer = imageContainer.parentNode;
            }

            var imageCoords = getCoords(image);
            containerCoords = getCoords(imageContainer);
            var diff = {
              width: (imageCoords.right - imageCoords.left) - (containerCoords.right - containerCoords.left),
              height: (imageCoords.bottom - imageCoords.top) - (containerCoords.bottom - containerCoords.top),
            };

            if(currentMax != maxLeft) {

              handle.style.left = (currentMax / 100) * persend + 'px';
              maxLeft = currentMax;
            }

            if(diff.width < 0 && document.documentElement.clientWidth < 960) {
                image.style.left = 0;
            }
        });

        reset.addEventListener('click', function() {
            image.style.cssText = '';
            reset.disabled = true;

            handle.style.left = '';
            persend = parseFloat(getComputedStyle(handle).left) / (maxLeft / 100);
        });

        image.addEventListener('mouseover', function() {
            if(options.type != 'crop') return;
            if(persend <= 50) return;

            this.style.cursor = 'grab';
        });

        image.addEventListener('dragstart', function(evt) {
          evt.preventDefault();
        });

        image.addEventListener('mousedown', function(evt) {
            if(evt.which != 1) return;
            evt.preventDefault();

            if(options.type != 'crop') return;
            if(persend <= 50) return;

            document.body.style.cursor = 'grabbing';
            image.style.cursor = 'grabbing';

            var imageContainer = image.parentNode;
            while(imageContainer) {
                if(imageContainer.classList.contains('post__image-overflow')) break;

                imageContainer = imageContainer.parentNode;
            }

            var imageCoords = getCoords(image);
            containerCoords = getCoords(imageContainer);
            var diff = {
              width: (imageCoords.right - imageCoords.left) - (containerCoords.right - containerCoords.left),
              height: (imageCoords.bottom - imageCoords.top) - (containerCoords.bottom - containerCoords.top),
            };

            var currentX = evt.pageX;
            var currentY = evt.pageY;
            var currentLeft = parseFloat(getComputedStyle(image).left) || 0;
            var currentTop = parseFloat(getComputedStyle(image).top) || 0;

            document.addEventListener('mousemove', moveAt);
            document.addEventListener('mouseup', stopMove);

            function moveAt(evt) {
                if(getComputedStyle(image).cursor != 'grabbing') {
                    image.style.cursor = 'grabbing';
                }
                containerCoords = getCoords(imageContainer);
                imageCoords = getCoords(image);

                var newLeft = currentLeft + (evt.pageX - currentX);
                if(newLeft > (diff.width / 2) && diff.width > 0) {
                    newLeft = diff.width / 2;
                }
                if(newLeft < (-diff.width / 2) && diff.width > 0) {
                    newLeft = -diff.width / 2;
                }
                if(diff.width < 0) {
                    newLeft = 0;
                }

                var newTop = currentTop + (evt.pageY - currentY);
                if(newTop > (diff.height / 2)) {
                    newTop = diff.height / 2;
                }
                if(newTop < (-diff.height / 2)) {
                    newTop = -diff.height / 2;
                }

                image.style.left = newLeft + 'px';
                image.style.top = newTop + 'px';
            }

            function stopMove() {
                document.body.style.cursor = '';
                image.style.cursor = 'grab';

                document.removeEventListener('mousemove', moveAt);
                document.removeEventListener('mouseup', stopMove);

                image.addEventListener('mouseout', function() {
                    image.style.cursor = '';
                });
            }
        });

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();

            return {
                top: box.top + (document.documentElement.scrollTop || pageYOffset),
                left: box.left + (document.documentElement.scrollLeft || pageXOffset),
                bottom: box.bottom + (document.documentElement.scrollTop || pageYOffset),
                right: box.right + (document.documentElement.scrollLeft || pageXOffset),
            };
        }

        function fill(evt) {
            maxLeft = scale.offsetWidth - handle.offsetWidth;
            persend = parseFloat(getComputedStyle(handle).left) / (maxLeft / 100);
            var oldValue = getComputedStyle(image).filter;
            var bright = (2 / 100) * persend;
            var conrt = 1;

            if(/contrast/.test(oldValue)) {
                conrt = oldValue.match(/contrast\((\d+(?:\.\d+)?)\)/)[1];
            }

            image.style.filter = 'brightness(' + bright + ')contrast(' + conrt + ')';
        }

        function сontr(evt) {
            maxLeft = scale.offsetWidth - handle.offsetWidth;
            persend = parseFloat(getComputedStyle(handle).left) / (maxLeft / 100);
            var oldValue = getComputedStyle(image).filter;
            var conrt = (2 / 100) * persend;
            var bright = 1;

            if(/brightness/.test(oldValue)) {
                bright = oldValue.match(/brightness\((\d+(?:\.\d+)?)\)/)[1];
            }

            image.style.filter = 'brightness(' + bright + ')contrast(' + conrt + ')';
        }

        function crop(evt) {
            maxLeft = scale.offsetWidth - handle.offsetWidth;
            persend = parseFloat(getComputedStyle(handle).left) / (maxLeft / 100);
            var crop = (1.4 / 100) * persend + 0.3;

            image.style.transform = 'scale(' + crop + ')';
        }
    }

    new Slider({
        handle: '.post__toggle--crop',
        image: '.post__image',
        type: 'crop',
        reset: '.post__btn--reset'
    });
    new Slider({
        handle: '.post__toggle--fill',
        image: '.post__image',
        type: 'fill',
        reset: '.post__btn--reset'
    });
    new Slider({
        handle: '.post__toggle--сontr',
        image: '.post__image',
        type: 'сontr',
        reset: '.post__btn--reset'
    });
})();
