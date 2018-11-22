// Grab search input
$("#submitInput").on("click", function (event) {
   event.preventDefault();

   var locationInput = $("#searchBar").val().trim();
   var baseURL = window.location.origin;

   window.location.replace(baseURL + "/search/" + locationInput);
});


// ================= Favorite functionality ==================
// Favorites button hook
$(".fa-star").click(function() {
   $(this).toggleClass("active");

   var parentCard = $(this).attr("data-parent");
   var parentCardID = "#" + parentCard;

   if (favStatus) {
      $(this).class("active");
     
      var newCard = $("<div>");
      $(newCard).append($(parentCardID).html());
      $(".saved").append(newCard);

   }

});

/* When a user clicks, toggle the 'is-animating' class */
$(".fa-star").on('click touchstart', function() {
   $(this).toggleClass('is_animating');
});

/* When the animation is over, remove the class*/
$(".fa-star").on('animationend', function(){
   $(this).toggleClass('is_animating');
 });

