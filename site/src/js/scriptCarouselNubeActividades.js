document.addEventListener("DOMContentLoaded", function() {
    var slider = document.querySelector(".slider");
    var slidesContainer = document.querySelector(".slides");
    var slides = document.querySelectorAll(".slide");
    var prevButton = document.querySelector(".prev-button");
    var nextButton = document.querySelector(".next-button");
    var slideWidth = slides[0].offsetWidth;
    var currentIndex = 0;

    function goToSlide(index) {
  
      if (index < 0) {  
        index = slides.length - 1;
      } else if (index >= slides.length) {   
        index = 0;
      }

  // Calcula el desplazamiento del slide basado en el índice
var slideOffset = index * 10; // Ajusta el valor según tus necesidades
  // Ocultar todos los slides
  slides.forEach(function(slide) {
    slide.classList.add("desactive-slide");
    slide.classList.remove("active-slide");
    slide.style.transform = `translateX(-${slideOffset}px)`;
  });

   // Mostrar el slide activo
   slides[index].classList.add("active-slide");
   slides[index].classList.remove("desactive-slide");

  // Aplicar la transformación con el desplazamiento
  slidesContainer.style.transform = `translateX(${slideOffset}px)`;
  //  slidesContainer.style.transform = `translateX(5px)`;

     currentIndex = index;
    }
  
    function goToPrevSlide() {
      goToSlide(currentIndex - 1);
    }
  
    function goToNextSlide() {
      goToSlide(currentIndex + 1);
    }
  
    prevButton.addEventListener("click", goToPrevSlide);
    nextButton.addEventListener("click", goToNextSlide);
  });
  