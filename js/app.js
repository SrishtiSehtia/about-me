$(function(){

  var currentSlideIndex = 2;
  var numberTestimonials = $('#testimonials .one-testimonial p').length;
  console.log(numberTestimonials);

  $('#testimonials').css('width', numberTestimonials * 100 + '%');
  $('#testimonials article').css('width', 100 / numberTestimonials + '%');

  var carouselTimer = setInterval(timerTransition, 3000);

  function timerTransition() {
    currentSlideIndex = (currentSlideIndex === (numberTestimonials - 1)
      ? 0
      : currentSlideIndex + 1
    );
    transitionSlides();
  }

  $('.carousel-indicators').on('click', 'li', function () {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(timerTransition, 3000);
    currentSlideIndex = $(this).data('slide-number');
    transitionSlides();
  });

  function transitionSlides() {
    var amountToTranslate = -((100 / numberTestimonials) * currentSlideIndex);
    $('#testimonials').css('transform', 'translateX(' + amountToTranslate + '%)');
    $('.carousel-indicators li').removeClass('active');
    $('.carousel-indicators li[data-slide-number="' + currentSlideIndex + '"]').addClass('active');
  }


  $('.header-nav a').on('click', function(e) {
    e.preventDefault();
    var thisTarget = this.hash;
    var targetOffset = $(thisTarget).offset().top;
    $('html').animate({
      scrollTop: targetOffset
    }, 600, function(){
      window.location.hash = thisTarget;
    });
  });

    // -----------------------------
  // Highlight Nav Links on Scroll
  // -----------------------------
  // cache the navigation links
  var $navigationLinks = $('.header-nav a');
  // cache (in reversed order) the sections
  var $sections = $($("section").get().reverse());

  // map each section id to their corresponding navigation link
  var sectionIdTonavigationLink = {};
  $sections.each(function() {
      var id = $(this).attr('id');
      sectionIdTonavigationLink[id] = $('a[href="#' + id + '"]');
  });

  console.log(sectionIdTonavigationLink)

  function highlightNavigation() {
    // get the current vertical position of the scroll bar
    var scrollPosition = $(window).scrollTop();

    // iterate the sections
    $sections.each(function() {
        var currentSection = $(this);
        // get the position of the section
        var sectionTop = currentSection.offset().top - 71;

        // if the user has scrolled over the top of the section
        if (scrollPosition >= sectionTop) {
            // get the section id
            var id = currentSection.attr('id');
            // get the corresponding navigation link
            var $navigationLink = sectionIdTonavigationLink[id];
            // if the link is not current
            if (!$navigationLink.hasClass('current')) {
                // remove .current class from all the links
                $navigationLinks.removeClass('current');
                // add .current class to the current link
                $navigationLink.addClass('current');
            }
            // we have found our section, so we return false to exit the each loop
            return false;
        }
    });
  }
  $(window).scroll(highlightNavigation);

});
