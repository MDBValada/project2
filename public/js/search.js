// Grab search input
$("#submitInput").on("click", function (event) {
   event.preventDefault();

   var locationInput = $("#searchBar").val().trim();
   var baseURL = window.location.origin;

   window.location.replace(baseURL + "/search/" + locationInput);
});

// Favorites button hook
$(".fa-star").click(function() {
   $(this).toggleClass('active');
});

/* When a user clicks, toggle the 'is-animating' class */
$(".fa-star").on('click touchstart', function() {
   $(this).toggleClass('is_animating');
});

/* When the animation is over, remove the class*/
$(".fa-star").on('animationend', function(){
   $(this).toggleClass('is_animating');
 });