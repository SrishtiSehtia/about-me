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

});
