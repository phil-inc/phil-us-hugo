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

function toggleMobileNavigation() {
  document
    .getElementById("headerDropdown")
    .classList.toggle("header__dropdown--visible");
  document.getElementById("pageHeader").classList.toggle("header--open");
}

$(document).ready(function(e){
  var url = $(location).attr('href'),
  parts = url.split("/"),
  urlLastStr = parts[parts.length-2];
  
  if (urlLastStr == "press-releases") {
    $('.news_press_link').addClass('active');
  } else if (urlLastStr == "manufacturers"){
    $('.manufacturer_link').addClass('active');
  } else if (urlLastStr == "patient"){
    $('.patient_link').addClass('active');
  }
 });
