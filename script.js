

AOS.init(
  {
      duration: 1200,
  }
);

document.querySelectorAll(".video").forEach(video => {
  video.addEventListener("mouseover", () => {
      video.controls = false;
  });

  video.addEventListener("touchstart", () => {
      video.controls = false;
  });
});

const larguraDaTela = window.innerWidth
  
if (larguraDaTela < 800) {
    var swiper3 = new Swiper(".mySwiper3", {
        grabCursor: true,
        effect: "creative",
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
          },
        creativeEffect: {
          prev: {
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
} else {
   // Seleciona apenas os elementos dentro da section com id "divisa"
const divisaSection = document.querySelector('#divisa');

if (divisaSection) {
  divisaSection.querySelectorAll('.swiper, .mySwiper3').forEach(el => {
    el.classList.remove('swiper', 'mySwiper3');
  });

  divisaSection.querySelectorAll('.swiper-wrapper').forEach(el => {
    el.classList.remove('swiper-wrapper');
  });

  divisaSection.querySelectorAll('.swiper-slide').forEach(el => {
    el.classList.remove('swiper-slide');
  });
}

}

if (larguraDaTela < 800) {
  var swiper4 = new Swiper(".mySwiper4", {
      grabCursor: true,
      effect: "creative",
      autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-20%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
} else {
  var swiper4 = new Swiper(".mySwiper4", {
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
}
