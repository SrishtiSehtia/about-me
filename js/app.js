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
  var $navigationLinks = $('.header-nav a');
  var $sections = $($("section").get().reverse());

  var sectionIdTonavigationLink = {};
  $sections.each(function() {
    var id = $(this).attr('id');
    sectionIdTonavigationLink[id] = $('a[href="#' + id + '"]');
  });

  console.log(sectionIdTonavigationLink)

  function highlightNavigation() {
    var scrollPosition = $(window).scrollTop();

    $sections.each(function() {
      var currentSection = $(this);
      var sectionTop = currentSection.offset().top - 100;

      if (scrollPosition >= sectionTop) {
        var id = currentSection.attr('id');
        var $navigationLink = sectionIdTonavigationLink[id];
        console.log(sectionIdTonavigationLink[id]);
        if (!$navigationLink.hasClass('current')) {
          $navigationLinks.removeClass('current');
          $navigationLink.addClass('current');
        }
        return false;
      }
    });
  }
  $(window).scroll(highlightNavigation);

  $('.hamburger').on('click', function (e) {
    e.preventDefault();
    $('.header-nav').toggleClass('open-menu');
  });

});
