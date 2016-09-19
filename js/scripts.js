window.onload = function () {
    // remove blur once page has loaded
    document.getElementsByTagName("html")[0].classList.add('blur-animation');
    setTimeout(function () {
        document.getElementsByTagName("html")[0].classList.remove('blur');
        document.getElementsByTagName("html")[0].classList.remove('blur-animation');
    }, 1200);
}