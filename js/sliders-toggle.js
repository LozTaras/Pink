!function(){var t=document.querySelector(".post__icons-list"),s=document.querySelectorAll(".post__icons-item"),i=document.querySelectorAll(".post__scale-item");t.addEventListener("click",function(t){for(var e=t.target;e!=this&&"LI"!=e.tagName;)e=e.parentNode;e!=this&&(!function(){for(var t=0;t<i.length;t++)i[t].classList.add("post__scale-item--hidden"),s[t].classList.remove("post__icons-item--active")}(),i[e.dataset.slider].classList.remove("post__scale-item--hidden"),s[e.dataset.slider].classList.add("post__icons-item--active"))})}();