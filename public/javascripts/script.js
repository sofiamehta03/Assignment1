/* File name - script.js, 
            Student’s Name - Sofia Mehta, 
            StudentID - 301171210, 
            Date  3rd October 2021*/


$(document).ready(function(){

    $('#menu').click(function(){
      $(this).toggleClass('fa-times');
      $('header').toggleClass('toggle');
    });
  
    $(window).on('scroll load',function(){
  
      $('#menu').removeClass('fa-times');
      $('header').removeClass('toggle');
  
      if($(window).scrollTop() > 0){
        $('.top').show();
      }else{
        $('.top').hide();
      }
  
    });
  
  
    $('a[href*="#"]').on('click',function(e){
  
      e.preventDefault();
  
      $('html, body').animate({
  
        scrollTop : $($(this).attr('href')).offset().top,
  
      },
        500, 
        'linear'
      );
  
    });
  
  });


  function openForm() {
    if (document.getElementById("myForm").style.display == "block"){
      document.getElementById("myForm").style.display = "none";
      document.getElementById("portfolioBtn").innerHTML = "Add a new contact";
    }else{
      document.getElementById("myForm").style.display = "block";
      document.getElementById("portfolioBtn").innerHTML = "Remove";
    }
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("portfolioBtn").innerHTML = "Add a new contact";
  }
  

  document.getElementById("portfolioBtn")
  .addEventListener('click', 
  openForm)

  function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }