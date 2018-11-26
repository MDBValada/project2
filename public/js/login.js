$(function () {
   $('#show_signin').click(function () {
      $('.signup__form').hide();
      $('.signin__form').show();
      return false;
   });
});

$(function () {
   $('#show_signup').click(function () {
      $('.signin__form').hide();
      $('.signup__form').show();
      return false;
   });
});