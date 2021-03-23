$(document).ready(function() {
  $('#login-toggle').on('click', function() {
    $('#login-modal').modal('show');
  })

  $('#login-form').on('submit', function(event) {
    event.preventDefault();
    
    $.ajax({
      url: '/api/auth/login',
      dataType: "json",
      type: "Post",
      data: {
        email: $('#login-email').val(),
        password: $('#login-password').val()
      },
      success: function(data) {
        localStorage.setItem("token", data.token);
        $('#logout').removeClass('d-none').show();
        $('#login-toggle').hide();
        resetLoginModal();
        alert('Login Successful');
      },
      error: function(err) {
        console.error(err);
        alert(err.responseText)
      }
    })
  })

  $('#logout').on('click', function() {
    localStorage.removeItem("token");
    $('#logout').hide();
    $('#login-toggle').show();
  })
  
  $('#register-form').on('submit', function(event) {
    event.preventDefault();
    
    $.ajax({
      url: '/api/auth/register',
      dataType: "json",
      type: "Post",
      data: {
        firstName: $('#register-firstname').val(),
        lastName: $('#register-lastname').val(),
        email: $('#register-email').val(),
        password: $('#register-password').val()
      },
      success: function(data) {
        resetRegistrationModal();
        alert('Registration Successful');
      },
      error: function(err) {
        console.error(err);
        alert(err.responseText);
      }
    })
  })

  $('#register-button').on('click', function(event) {
    event.preventDefault();
    resetLoginModal();
    $('#register-modal').modal('show');
  })

  if(localStorage.getItem('token')) {
    $('#logout').removeClass('d-none').show();
    $('#login-toggle').hide();
  }
}) 

function resetLoginModal() {
  $('#login-modal').modal('hide');
  $('#login-email').val("");
  $('#login-password').val("");
}

function resetRegistrationModal() {
  $('#register-modal').modal('hide');
  $('#register-email').val("");
  $('#register-firstname').val("");
  $('#register-lastname').val("");
  $('#register-password').val("");
}