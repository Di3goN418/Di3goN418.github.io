/* =========================================
   slides.js — Navegación entre slides
   =========================================
   Maneja:
   - Fade in/out de slides
   - Fade in/out de decoraciones por slide
   - Botones siguiente/anterior
   - Puntos indicadores
*/

(function () {
  const slides      = Array.from(document.querySelectorAll('.slide'));
  const decoCapas   = Array.from(document.querySelectorAll('.deco-capa'));
  const btnPrev     = document.getElementById('btn-prev');
  const btnNext     = document.getElementById('btn-next');
  const puntosWrap  = document.getElementById('puntos');

  const TOTAL = slides.length;
  let actual  = 0;
  let animando = false;

  /* ── Crear puntos indicadores ── */
  slides.forEach((_, i) => {
    const p = document.createElement('button');
    p.className = 'punto' + (i === 0 ? ' activo' : '');
    p.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
    p.addEventListener('click', () => irA(i));
    puntosWrap.appendChild(p);
  });

  function getPuntos() {
    return Array.from(puntosWrap.querySelectorAll('.punto'));
  }

  /* ── Mostrar decoración del slide activo ── */
  function actualizarDecos(index) {
    decoCapas.forEach(capa => {
      const esActivo = parseInt(capa.dataset.slide) === index;
      capa.classList.toggle('visible', esActivo);
    });
  }

  /* ── Ir a slide N ── */
  function irA(destino) {
    if (animando || destino === actual) return;
    animando = true;

    const slideActual = slides[actual];
    const slideDestino = slides[destino];
    const puntos = getPuntos();

    /* Fade out del slide actual */
    slideActual.classList.remove('activo');

    /* Pequeña pausa para que se vea el fade out antes del fade in */
    setTimeout(() => {
      slideDestino.classList.add('activo');
      actualizarDecos(destino);

      puntos[actual].classList.remove('activo');
      puntos[destino].classList.add('activo');

      actual = destino;
      actualizarBotones();

      /* Esperar a que termine la transición CSS */
      setTimeout(() => { animando = false; }, 600);
    }, 300);
  }

  function actualizarBotones() {
    btnPrev.disabled = actual === 0;
    btnNext.disabled = actual === TOTAL - 1;
  }

  /* ── Eventos de flechas ── */
  btnPrev.addEventListener('click', () => irA(actual - 1));
  btnNext.addEventListener('click', () => irA(actual + 1));

  /* ── Swipe táctil (para móvil) ── */
  let touchStartX = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) irA(actual + 1); /* swipe izquierda → siguiente */
      else          irA(actual - 1); /* swipe derecha  → anterior  */
    }
  }, { passive: true });

  /* ── Teclas de teclado ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  irA(actual + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    irA(actual - 1);
  });

  /* ── Inicializar ── */
  actualizarBotones();
  actualizarDecos(0);

})();
