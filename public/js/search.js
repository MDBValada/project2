// Grab search input
$("#submitInput").on("click", function (event) {
   event.preventDefault();

   var locationInput = $("#searchBar").val().trim();
   var baseURL = window.location.origin;

   window.location.replace(baseURL + "/search/" + locationInput);
});