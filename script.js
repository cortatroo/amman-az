// MENU MOBILE
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// FECHAR MENU AO CLICAR
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});

// ANIMAÇÃO SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.88;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// HEADER SHADOW AO ROLAR
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if(window.scrollY > 10){
    header.style.boxShadow = "0 8px 20px rgba(0,0,0,.06)";
  }else{
    header.style.boxShadow = "none";
  }
});

// CARROSSEL ÚLTIMOS EVENTOS
(function () {
  const track = document.getElementById('eventoTrack');
  const dots  = document.querySelectorAll('#eventoDots .dot');
  const total = track ? track.children.length : 0;
  let current = 0;
  let autoTimer;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  if (track && total > 0) {
    document.getElementById('eventoPrev')
      .addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.getElementById('eventoNext')
      .addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach(d =>
      d.addEventListener('click', () => { goTo(+d.dataset.index); resetAuto(); })
    );
    startAuto();
  }
})();

// CARROSSEL DE FOTOS DO HERO
(function () {
  const slides = document.querySelectorAll('.hero-photo-slide');
  if (!slides.length) return;

  let current = 0;
  
slides[0].classList.add('active');

function nextSlide() {
const prev = current;
current = (current + 1) % slides.length;
slides[current].classList.add('active');
setTimeout(() => {
  slides[prev].classList.remove('active');
}, 50);
}

setInterval(nextSlide, 4000);   // ← troca a cada 4 segundos
})();