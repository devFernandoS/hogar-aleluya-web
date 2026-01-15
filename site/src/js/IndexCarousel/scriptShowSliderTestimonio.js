
let slideIndexTestimonios = 1;
showSlidertestimonios(slideIndexTestimonios);

function plusSlidesTestimonios(n) {
  showSlidertestimonios((slideIndexTestimonios += n));
}

function currentSlideTestimonios(n) {
  showSlidertestimonios((slideIndexTestimonios = n));
}

function showSlidertestimonios(n) {
  const SlidesTestimoniosArticles = document.getElementsByClassName("slidesTestimonios");

  if (n > SlidesTestimoniosArticles.length) {
    slideIndexTestimonios = 1;
  }
  if (n < 1) {
    slideIndexTestimonios = SlidesTestimoniosArticles.length;
  }

  for (let i = 0; i < SlidesTestimoniosArticles.length; i++) {
    SlidesTestimoniosArticles[i].style.display = "none";
    SlidesTestimoniosArticles[i].className = SlidesTestimoniosArticles[i].className.replace(/index-testimonios-art\d/g, "");
  }

  const currentSlideIndex = slideIndexTestimonios - 1;
  const prevSlideIndex = (currentSlideIndex + SlidesTestimoniosArticles.length - 1) % SlidesTestimoniosArticles.length;
  const nextSlideIndex = (currentSlideIndex + 1) % SlidesTestimoniosArticles.length;

  SlidesTestimoniosArticles[prevSlideIndex].className += " index-testimonios-art1";
  SlidesTestimoniosArticles[currentSlideIndex].className += " index-testimonios-art2";
  SlidesTestimoniosArticles[nextSlideIndex].className += " index-testimonios-art3";

  SlidesTestimoniosArticles[prevSlideIndex].style.display = "grid";
  SlidesTestimoniosArticles[currentSlideIndex].style.display = "grid";
  SlidesTestimoniosArticles[nextSlideIndex].style.display = "grid";
}

