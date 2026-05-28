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

// REMOVE HASH DA URL APÓS NAVEGAÇÃO
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener('click', function (e) {

    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if(target){

      target.scrollIntoView({
        behavior: 'smooth'
      });

      // remove o hash da URL
      history.replaceState(null, null, ' ');
    }

  });

});

// ACORDEÃO DE CATEGORIAS
document.querySelectorAll('.area-item').forEach(function(item) {
  item.querySelector('.area-item-header').addEventListener('click', function() {
    var isOpen = item.classList.contains('open');

    // Fecha todos
    document.querySelectorAll('.area-item').forEach(function(el) {
      el.classList.remove('open');
    });

    // Abre o clicado (se não estava aberto)
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

  // FILTRO DE CATEGORIAS
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".course-card-full");
  const countNum = document.getElementById("countNum");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.cat;
      let visible = 0;

      cards.forEach(card => {
        const match = cat === "all" || card.dataset.cat === cat;
        card.classList.toggle("hidden", !match);
        if (match) visible++;
      });

      countNum.textContent = visible;
    });
  });