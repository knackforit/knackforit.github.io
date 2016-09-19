window.onload = function () {
    // wait 500ms before removing blur
    setTimeout(function () {
        // add blur animation
        document.getElementsByTagName("html")[0].classList.add('blur-animation');
        setTimeout(function () {
            // remove blur class after animation
            // NOTE: we're removing this class instead of settings `forwards` on animation because Safari renders text poorly w/ `blur(0px)` applied.
            document.getElementsByTagName("html")[0].classList.remove('blur');
            document.getElementsByTagName("html")[0].classList.remove('blur-animation');
        }, 1200);
    }, 500);
}