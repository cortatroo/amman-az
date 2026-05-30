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
  
  // =============================================
// MODAL DE CAPTAÇÃO DE LEADS
// =============================================

(function () {

  // ── 1. CONFIGURAÇÃO ──────────────────────────
  // Cole aqui a URL copiada do Google Apps Script (Parte 1, Passo 3)
  var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFh5ex1p2IAQF9Q3ulBY4PE6e-3Cd9xoJREIJ9Kya7d27TEHR8ybZbTeWv6ZGH7o_v/exec';

  // Chave usada no localStorage para saber se o usuário já enviou os dados
  var STORAGE_KEY = 'amman_lead_enviado';

  // ── 2. REFERÊNCIAS AOS ELEMENTOS HTML ────────
  var btnVerCursos = document.getElementById('btnVerCursos');
  var modal        = document.getElementById('modalLeads');
  var btnFechar    = document.getElementById('modalFechar');
  var btnPular     = document.getElementById('btnPular');
  var form         = document.getElementById('formLeads');
  var btnEnviar    = document.getElementById('btnEnviarLead');
  var feedback     = document.getElementById('modalFeedback');

  // Sai da função silenciosamente se o botão não existir nesta página
  if (!btnVerCursos) return;

  // ── 3. CLIQUE NO BOTÃO "VER TODOS OS CURSOS" ─
  btnVerCursos.addEventListener('click', function () {
    // Verifica se o usuário já enviou os dados neste navegador
    if (localStorage.getItem(STORAGE_KEY) === 'sim') {
      // Já enviou: vai direto para a página de cursos
      window.location.href = 'cursos.html';
    } else {
      // Nunca enviou: abre o modal
      abrirModal();
    }
  });

  // ── 4. ABRIR / FECHAR MODAL ───────────────────
  function abrirModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // trava o scroll da página
  }

  function fecharModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // libera o scroll
  }

  // Fecha ao clicar no X
  btnFechar.addEventListener('click', fecharModal);

  // Fecha ao clicar fora da caixa (no overlay escuro)
  modal.addEventListener('click', function (e) {
    if (e.target === modal) fecharModal();
  });

  // Fecha ao pressionar ESC (acessibilidade)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      fecharModal();
    }
  });

  // ── 5. BOTÃO "PULAR" ─────────────────────────
  // Vai para cursos.html sem salvar nada (pop-up aparece novamente na próxima vez)
  btnPular.addEventListener('click', function () {
    fecharModal();
    window.location.href = 'cursos.html';
  });

  // ── 6. ENVIO DO FORMULÁRIO ───────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evita recarregar a página

    // Coleta os valores dos campos
    var nome      = document.getElementById('leadNome').value.trim();
    var email     = document.getElementById('leadEmail').value.trim();
    var telefone  = document.getElementById('leadTelefone').value.trim();
    var cidade    = document.getElementById('leadCidade').value.trim();

    // ── Limpa erros anteriores ──
document.getElementById('erroEmail').textContent = '';
document.getElementById('erroEmail').classList.remove('visivel');
document.getElementById('erroTelefone').textContent = '';
document.getElementById('erroTelefone').classList.remove('visivel');
document.getElementById('leadEmail').classList.remove('input-invalido');
document.getElementById('leadTelefone').classList.remove('input-invalido');

// ── Validação de campos obrigatórios ──
var valido = true;

if (!nome) {
  mostrarFeedback('Por favor, preencha o nome.', 'erro');
  valido = false;
}

// Valida formato de e-mail
var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email) {
  document.getElementById('erroEmail').textContent = 'O e-mail é obrigatório.';
  document.getElementById('erroEmail').classList.add('visivel');
  document.getElementById('leadEmail').classList.add('input-invalido');
  valido = false;
} else if (!regexEmail.test(email)) {
  document.getElementById('erroEmail').textContent = 'Insira um e-mail válido. Ex: nome@dominio.com';
  document.getElementById('erroEmail').classList.add('visivel');
  document.getElementById('leadEmail').classList.add('input-invalido');
  valido = false;
}

// Valida formato de telefone: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX — obrigatório
var regexTel = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
if (!telefone) {
  document.getElementById('erroTelefone').textContent = 'O telefone é obrigatório.';
  document.getElementById('erroTelefone').classList.add('visivel');
  document.getElementById('leadTelefone').classList.add('input-invalido');
  valido = false;
} else if (!regexTel.test(telefone)) {
  document.getElementById('erroTelefone').textContent = 'Formato esperado: (XX) XXXXX-XXXX';
  document.getElementById('erroTelefone').classList.add('visivel');
  document.getElementById('leadTelefone').classList.add('input-invalido');
  valido = false;
}

if (!valido) return;
	
	/* // Validação básica: pelo menos nome e e-mail precisam ser preenchidos
    if (!nome || !email) {
      mostrarFeedback('Por favor, preencha pelo menos nome e e-mail.', 'erro');
      return;
    } */

    // Desabilita o botão durante o envio para evitar cliques duplos
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';
    feedback.className = 'modal-feedback'; // limpa estado anterior

    // Monta o objeto com os dados
    var payload = JSON.stringify({ nome: nome, email: email, telefone: telefone, cidade: cidade });

    // Envia para o Google Apps Script
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: payload
    })
    .then(function (resposta) { return resposta.json(); })
    .then(function (json) {
      if (json.status === 'ok') {
        // Sucesso: grava no localStorage e redireciona
        localStorage.setItem(STORAGE_KEY, 'sim');
        mostrarFeedback('Dados enviados! Redirecionando...', 'sucesso');
        setTimeout(function () {
          fecharModal();
          window.location.href = 'cursos.html';
        }, 1200); // aguarda 1,2s para o usuário ver a mensagem de sucesso
      } else {
        throw new Error('Resposta inesperada do servidor');
      }
    })
    .catch(function () {
      // Em caso de falha de rede: ainda assim deixa o usuário acessar os cursos
      localStorage.setItem(STORAGE_KEY, 'sim');
      mostrarFeedback('Redirecionando...', 'sucesso');
      setTimeout(function () {
        fecharModal();
        window.location.href = 'cursos.html';
      }, 1200);
    });
  });

  // ── 7. FUNÇÃO AUXILIAR DE FEEDBACK ───────────
  function mostrarFeedback(mensagem, tipo) {
    feedback.textContent = mensagem;
    feedback.className = 'modal-feedback ' + tipo;
    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Acessar os cursos';
  }

})(); // IIFE — encapsula tudo para não poluir o escopo global

// MÁSCARA DE TELEFONE
(function () {
  var input = document.getElementById('leadTelefone');
  if (!input) return;

  input.addEventListener('input', function () {
    var v = input.value.replace(/\D/g, ''); // remove tudo que não é número
    if (v.length > 11) v = v.slice(0, 11);  // limita a 11 dígitos

    if (v.length <= 10) {
      // Fixo: (XX) XXXX-XXXX
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, function(_, a, b, c) {
        return c ? '(' + a + ') ' + b + '-' + c : b ? '(' + a + ') ' + b : '(' + a;
      });
    } else {
      // Celular: (XX) XXXXX-XXXX
      v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, function(_, a, b, c) {
        return c ? '(' + a + ') ' + b + '-' + c : b ? '(' + a + ') ' + b : '(' + a;
      });
    }

    input.value = v;
  });
})();

// =============================================
// MODAL DE DETALHES DE CURSO (NR01)
// =============================================

(function () {
  // 1. Pegamos os elementos
  const botoesAbrir = document.querySelectorAll('.btn-abrir-detalhes');
  const modalCurso = document.getElementById('modalCursoNR01');
  const btnFecharCurso = document.querySelector('.modal-fechar-curso');

  if (!modalCurso) return; // Se não achar o modal, para o código

  // 2. Função para abrir o modal
  function abrirModalCurso(e) {
    e.preventDefault(); // Evita que a página pule
    modalCurso.classList.add('active');
    document.body.style.overflow = 'hidden'; // Trava rolagem
  }

  // 3. Função para fechar o modal
  function fecharModalCurso() {
    modalCurso.classList.remove('active');
    document.body.style.overflow = ''; // Libera rolagem
  }

  // 4. Adiciona evento de clique em todos os botões "Ver detalhes" que apontam pra esse curso
  botoesAbrir.forEach(btn => {
    btn.addEventListener('click', abrirModalCurso);
  });

  // 5. Fecha ao clicar no botão "X"
  if(btnFecharCurso) {
      btnFecharCurso.addEventListener('click', fecharModalCurso);
  }

  // 6. Fecha ao clicar na área escura (fora da caixa branca)
  modalCurso.addEventListener('click', function (e) {
    if (e.target === modalCurso) {
      fecharModalCurso();
    }
  });

  // 7. Fecha com a tecla ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalCurso.classList.contains('active')) {
      fecharModalCurso();
    }
  });

})();