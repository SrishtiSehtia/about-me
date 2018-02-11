$(function(){

  // ----------- Carousel -----------
  var currentSlideIndex = 0;
  var numberTestimonials = $('#testimonials .one-testimonial p').length;

  // make testimonials appear as inline rathen than block elements
  $('#testimonials').css('width', numberTestimonials * 100 + '%');
  // show only one single testimonial on the page at a time
  $('#testimonials article').css('width', 100 / numberTestimonials + '%');

  var carouselTimer = setInterval(timerTransition, 3000);

  function timerTransition() {
    currentSlideIndex = (currentSlideIndex === (numberTestimonials - 1)
    // if current testimonial is the last one, reset to first testimonial
      ? 0
    // otherwise, show next testimonial
      : currentSlideIndex + 1
    );
    transitionSlides();
  }

  $('.carousel-indicators').on('click', 'li', function () {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(timerTransition, 5000);
    currentSlideIndex = $(this).data('slide-number');
    transitionSlides();
  });

  function transitionSlides() {
    // how much distance to slide to the right
    var amountToTranslate = -((100 / numberTestimonials) * currentSlideIndex);
    $('#testimonials').css('transform', 'translateX(' + amountToTranslate + '%)');
    // move the carousel indicators consecutively to represnt current slide
    $('.carousel-indicators li').removeClass('active');
    $('.carousel-indicators li[data-slide-number="' + currentSlideIndex + '"]').addClass('active');
  }


  // ----------- Smooth Scrolling -----------
  $('.header-nav a').on('click', function(e) {
    e.preventDefault();
    // get the href/id of nav link clicked on
    var thisTarget = this.hash;
    // get the position of the section that the id corresponds to
    var targetOffset = $(thisTarget).offset().top;
    // smooth scroll from the nav link to the corresponding section
    $('html').animate({scrollTop: targetOffset}, 600);
  });

  // ----------- Nav Highlighting -----------
  // save all navigation links in variable
  var $navigationLinks = $('.header-nav a');
  // save all sections in an array and then reverse for traversal
  var $sections = $($("section").get().reverse());

  // create an object to map each nav link to its section id
  var sectionIdTonavigationLink = {};
  // iterate through each section
  $sections.each(function() {
    // get each section's id
    var id = $(this).attr('id');
    // save the id's in the object
    sectionIdTonavigationLink[id] = $('a[href="#' + id + '"]');
  });


  function highlightNavigation() {
    // monitor position of mouse
    var scrollPosition = $(window).scrollTop();

    $sections.each(function() {
      // monitor position of section
      var currentSection = $(this);
      var sectionTop = currentSection.offset().top - 100;

      // if we are on or past the section,
      if (scrollPosition >= sectionTop) {
        // get the section id
        var id = currentSection.attr('id');
        // get the corresponding nav link
        var $navigationLink = sectionIdTonavigationLink[id];
        // mark the nav link with a class that highlights it
        if (!$navigationLink.hasClass('current')) {
          $navigationLinks.removeClass('current');
          $navigationLink.addClass('current');
        }
        return false;
      }
    });
  }
  $(window).scroll(highlightNavigation);

  // ----------- Form submission -----------
  $('#contact-form input[type=submit]').on('click', function(){
    $('#contact-form').html('thank you!').addClass('form-submitted');
  })

  // ----------- Hamburger hide/show -----------
  $('.hamburger').on('click', function (e) {
    e.preventDefault();
    $('.header-nav').toggleClass('open-menu');
  });

});
