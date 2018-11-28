$(document).ready(function () {
  // Toggle between login and signup views
  $(function () {
    $('#show_signup').click(function () {
      $('.signin__form').hide();
      $('.signup__form').show();
      return false;
    });
  });

  $(function () {
    $('#show_signin').click(function () {
      $('.signup__form').hide();
      $('.signin__form').show();
      return false;
    });
  });
  
  // =========================================================================================
  // SIGN UP 
  // ========================================================================================= 
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("#new_user_email");
  var passwordInput = $("#new_user_password");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      $("#no_input_msg").show();
      setTimeout(function() {
        $("#no_input_msg").fadeIn("slow").fadeOut("slow");
      }, 5000);
      return;
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the search-landmarks page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    }).then(function (data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    })
  };

  // =========================================================================================
  // LOG IN
  // =========================================================================================
  // Getting references to our form and inputs
  var loginForm = $("form.signin");
  var memberEmailInput = $("#member_email");
  var memberPasswordInput = $("#member_password");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: memberEmailInput.val().trim(),
      password: memberPasswordInput.val().trim()
    }

    if (!userData.email || !userData.password) {
      $("#no_input_msg2").show();
      setTimeout(function() {
        $("#no_input_msg2").fadeIn("slow").fadeOut("slow");
      }, 5000);
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    memberEmailInput.val("");
    memberPasswordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the search-landmarks page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function (data) {
      window.location.replace(data);
      // If there's an error, log the error and display invalid password hidden div
    }).catch(function (err) {
      console.log(err);
      $("#message").show();
    })
  }
});