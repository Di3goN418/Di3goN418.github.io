/* =========================================
   petalos.js — Pétalos cayendo en canvas
   ========================================

   Ajustes:
   - CANTIDAD      → cuántos pétalos hay en pantalla
   - OPACIDAD_MAX  → qué tan visibles son (0 a 1)
   - VELOCIDAD     → qué tan rápido caen
   - TAMANO_MIN/MAX → rango de tamaño en px
*/

const PETAL_SRC = "img/pétalo_blanco.png"; /* ← pon aquí el nombre de tu imagen */
const CANTIDAD = 18; /* pétalos simultáneos */
const OPACIDAD_MAX = 0.85; /* opacidad máxima de cada pétalo */
const VELOCIDAD = { min: 0.6, max: 1.4 }; /* px por frame */
const TAMANO_MIN = 18; /* px */
const TAMANO_MAX = 48; /* px */
const BALANCEO = 0.8; /* amplitud del vaivén lateral */
const ROTACION = 0.012; /* velocidad de rotación (rad/frame) */

/* ─────────────────────────────────────── */

const canvas = document.getElementById("petalos-canvas");
const ctx = canvas.getContext("2d");

/* Cargar imagen */
const img = new Image();
img.src = PETAL_SRC;

/* Ajustar canvas al tamaño de ventana */
function redimensionar() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
redimensionar();
window.addEventListener("resize", redimensionar);

/* ── Crear un pétalo con valores aleatorios ── */
function crearPetalo(inicioAleatorio = false) {
  const size = TAMANO_MIN + Math.random() * (TAMANO_MAX - TAMANO_MIN);
  return {
    x: Math.random() * canvas.width,
    y: inicioAleatorio
      ? Math.random() * canvas.height /* distribuidos al inicio */
      : -size /* entran desde arriba */,
    size,
    velocidad: VELOCIDAD.min + Math.random() * (VELOCIDAD.max - VELOCIDAD.min),
    angulo: Math.random() * Math.PI * 2,
    rotVel: (Math.random() - 0.5) * ROTACION * 2,
    balanceoFase: Math.random() * Math.PI * 2,
    balanceoVel: 0.005 + Math.random() * 0.01,
    opacidad: 0.2 + Math.random() * (OPACIDAD_MAX - 0.2),
  };
}

/* Poblar con pétalos ya en pantalla al inicio */
let petalos = Array.from({ length: CANTIDAD }, () => crearPetalo(true));

/* ── Loop de animación ── */
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petalos.forEach((p, i) => {
    /* Movimiento */
    p.y += p.velocidad;
    p.balanceoFase += p.balanceoVel;
    p.x += Math.sin(p.balanceoFase) * BALANCEO;
    p.angulo += p.rotVel;

    /* Si sale por abajo → reiniciar arriba */
    if (p.y > canvas.height + p.size) {
      petalos[i] = crearPetalo(false);
    }

    /* Dibujar */
    ctx.save();
    ctx.globalAlpha = p.opacidad;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angulo);
    ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });

  requestAnimationFrame(animar);
}

/* Esperar a que cargue la imagen antes de arrancar */
img.onload = animar;
img.onerror = () => {
  /* Si no encuentra la imagen, igual arranca (no hay dibujado pero no rompe) */
  console.warn('petalos.js: no se encontró la imagen "' + PETAL_SRC + '"');
  animar();
};

