$(document).ready(function () {
   // GET request to figure out which user is logged in and updates the HTML on the page
   $.get("/api/user_data").then(function (data) {
      $(".member-name").text(data.email);
   });

   // Grab search input
   $("#submitInput").on("click", function (event) {
      event.preventDefault();

      var locationInput = $("#searchBar").val().trim();
      var baseURL = window.location.origin;

      window.location.replace(baseURL + "/search/" + locationInput);
   });


   // ================= Favorite functionality ==================
   // Favorites button toggle active state
   $(".fa-star").click(function () {
      $(this).toggleClass("active");
   });

   // When a user clicks, toggle the 'is-animating' class 
   $(".fa-star").on('click touchstart', function () {
      $(this).toggleClass('is_animating');
   });

   // When the animation is over, remove the class
   $(".fa-star").on('animationend', function () {
      $(this).toggleClass('is_animating');
   });



   // $(document.body).on("click", ".fa-star", function () {
   //    var favStatus = $(this).attr("favorite-status");
   //    var parentCard = $(this).attr("data-parent");
   //    var parentCardID = "#" + parentCard;
   //    console.log(parentCardID);

   //    // Add to Favorites section
   //    if (favStatus === "No") {
   //       $(this).addClass("far").removeClass("fas");
   //       $(this).attr({'favorite-status': 'Yes'});
   //       var newFavCard = $("<div>", {id: "fav" + parentCard, class: "favorites"});
   //       $(newFavCard).append($(parentCardID).html());
   //       $(".saved").append(newFavCard);
   //    } else {
   //       // Remove from Favorites
   //       $("[data-parent="+parentCard+"]").attr({'favorite-status': 'No'}).addClass("fas").removeClass("far");
   //       var removeFav = $("#fav" + parentCard);
   //       $(removeFav).remove();
   //    }
   // });




});