// $(window).scroll(function () {
//   var sticky = $(".home-page__header"),
//     scroll = $(window).scrollTop();

//   if (scroll >= 100) sticky.addClass("Header--fixed-top");
//   else sticky.removeClass("Header--fixed-top");
// });

// When the user scrolls the page, execute myFunction

window.onscroll = function () {
  headerSticky();
};

// Get the header

var header = document.getElementById("pageHeader");

// Get the offset position of the navbar

var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position

function headerSticky() {
  if (window.pageYOffset > sticky) {
    header.classList.add("Header--fixed-top");
  } else {
    header.classList.remove("Header--fixed-top");
  }
}
