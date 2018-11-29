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

      var favCard = this.parentElement.parentElement.parentElement;
      var imgURL = favCard.querySelector("img").src;
      var title = favCard.querySelector(".card-body>.card-title").innerHTML;

      console.log(favCard);
      console.log(imgURL, title);

      $.post("/favorites", { 
         imgURL: imgURL, 
         title: title,
      }).then(function (data) {
         console.log(data)
      })
   });

   // When a user clicks, toggle the 'is-animating' class 
   $(".fa-star").on('click touchstart', function () {
      $(this).toggleClass('is_animating');
   });

   // When the animation is over, remove the class
   $(".fa-star").on('animationend', function () {
      $(this).toggleClass('is_animating');
   });
});