// scriptShowSlidesPresentacion.js
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let slides_titulo = document.getElementsByClassName("mySlides-Titulos");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides_titulo[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) 
  {slideIndex = 1}
  
  slides_titulo[slideIndex-1].style.display = "block"; 
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 90000); // Change image every 90000--90 seconds
}

    // slideIndex = 1;
    // showSlidesClic(slideIndex);
    
    // Next/previous controls
    function plusSlides(n) {
      showSlidesClic(slideIndex += n);
    }
    
    function showSlidesClic(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let slides_titulo = document.getElementsByClassName("mySlides-Titulos");
  
      if (n > slides.length)
       {slideIndex = 1}

      if (n < 1)
       {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides_titulo[i].style.display = "none";
      }
   
      slides[slideIndex-1].style.display = "block";
      slides_titulo[slideIndex-1].style.display = "block";

    }
