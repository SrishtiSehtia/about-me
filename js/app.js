$(function(){

  var currentSlideIndex = 2;
  var numberTestimonials = $('#testimonials .one-testimonial p').length;

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
    carouselTimer = setInterval(timerTransition, 5000);
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
        return;
      }
    });
  }
  $(window).scroll(highlightNavigation);

  $('.hamburger').on('click', function (e) {
    e.preventDefault();
    $('.header-nav').toggleClass('open-menu');
  });

});
