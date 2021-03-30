$(document).ready(function() {
  $('#login-button').on('click', function() {
    $('#login-modal').modal('show');
  })

  setNavActive()

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
        $('#logout-button').removeClass('d-none').show();
        $('#login-button').hide();
        resetLoginModal();
        addNavLinks();
        alert('Login Successful');
      },
      error: function(err) {
        console.error(err);
        alert(err.responseText)
      }
    })
  })

  $('#logout-button').on('click', function() {
    localStorage.removeItem("token");
    removeNavLinks();
    $('#logout-button').hide();
    $('#login-button').show();
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
    addNavLinks();
    $('#logout-button').removeClass('d-none').show();
    $('#login-button').hide();
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

function loginCheck() {
  $.ajax({
    url: '/api/auth/verify',
    dataType: "json",
    type: "Post",
    headers: {
      'Authorization': localStorage.getItem('token')
    },
    success: function(data) {
      
    },
    error: function(err) {
      console.error(err);
      alert(err.responseText);
      window.location.replace('/');
    }
  })
}

function addNavLinks() {
  if(!$('#student-work').length && !$('#mock-exam').length){
    $('#nav-wrapper').append(
      $('<div>').addClass('navButton').attr('id', 'student-work').append(
        $('<p>').text('Student Work')
      ).on('click', function() {
        window.location.href = 'https://vle.newcollege.ac.uk/'
      }),
      $('<div>').addClass('navButton').attr('id', 'mock-exam').append(
        $('<p>').text('Mock Exam')
      ).on('click', function() {
        window.location.replace('mock-exam');
      }),
    )
  }
}

function removeNavLinks() {
  $('#mockexamButton').remove();
  $('#studentworkButton').remove();
}

function setNavActive() {
  const page = window.location.pathname.split('/').pop();
  console.log(page)
  if(page === '') {
    $('#home').addClass('nav-active');
  }
  $('#'+page).addClass('nav-active');
}