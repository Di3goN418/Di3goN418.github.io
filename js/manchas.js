/* =========================================
   manchas.js — Manchas de color animadas
   =========================================
   El array MANCHAS define cada mancha:
   x/y = posición en % | w/h = tamaño en px
   color = hex | dur = segundos | peak = opacidad máx
*/

const MANCHAS = [
  /* — Esquina superior izquierda — */
  {
    x: 12,
    y: 18,
    w: 280,
    h: 220,
    color: "#c4637a",
    dur: 7,
    delay: 0,
    peak: 0.45,
  },
  {
    x: 5,
    y: 35,
    w: 190,
    h: 145,
    color: "#8b2a40",
    dur: 8,
    delay: 6,
    peak: 0.44,
  },
  {
    x: 18,
    y: 72,
    w: 160,
    h: 125,
    color: "#b5607a",
    dur: 11.5,
    delay: 0.5,
    peak: 0.39,
  },
  {
    x: 20,
    y: 88,
    w: 220,
    h: 170,
    color: "#e8a0b4",
    dur: 9.5,
    delay: 1,
    peak: 0.42,
  },

  /* — Esquina superior derecha — */
  {
    x: 80,
    y: 5,
    w: 220,
    h: 180,
    color: "#f2c4d0",
    dur: 9,
    delay: 1.5,
    peak: 0.35,
  },
  {
    x: 88,
    y: 22,
    w: 200,
    h: 160,
    color: "#9b2d45",
    dur: 8,
    delay: 3,
    peak: 0.5,
  },
  {
    x: 92,
    y: 38,
    w: 170,
    h: 130,
    color: "#f7dde5",
    dur: 13,
    delay: 1.8,
    peak: 0.25,
  },
  {
    x: 95,
    y: 60,
    w: 200,
    h: 160,
    color: "#e08ca4",
    dur: 6.5,
    delay: 4,
    peak: 0.38,
  },
  {
    x: 75,
    y: 85,
    w: 200,
    h: 155,
    color: "#f0b8c8",
    dur: 8.5,
    delay: 3.5,
    peak: 0.4,
  },

  /* — Centro y parte baja — */
  {
    x: 45,
    y: 10,
    w: 180,
    h: 140,
    color: "#7a1e32",
    dur: 12,
    delay: 0.3,
    peak: 0.48,
  },
  {
    x: 50,
    y: 80,
    w: 180,
    h: 140,
    color: "#e8a0b4",
    dur: 10,
    delay: 0.8,
    peak: 0.4,
  },
  {
    x: 55,
    y: 65,
    w: 140,
    h: 110,
    color: "#a34060",
    dur: 9,
    delay: 4.5,
    peak: 0.52,
  },
  {
    x: 62,
    y: 40,
    w: 150,
    h: 115,
    color: "#d4607c",
    dur: 10.5,
    delay: 2.7,
    peak: 0.36,
  },
  {
    x: 30,
    y: 45,
    w: 160,
    h: 120,
    color: "#f0c4d4",
    dur: 7.5,
    delay: 5,
    peak: 0.48,
  },
];

function IniciarManchas() {
  const escena = document.getElementById("escena");

  MANCHAS.forEach((m) => {
    const el = document.createElement("div");
    el.className = "mancha";
    el.style.left = m.x + "%";
    el.style.top = m.y + "%";
    el.style.width = m.w + "px";
    el.style.height = m.h + "px";
    el.style.background = m.color;
    el.style.setProperty("--dur", m.dur + "s");
    el.style.setProperty("--delay", "-" + m.delay + "s");
    el.style.setProperty("--peak-opacity", m.peak);
    escena.insertBefore(el, escena.firstChild);
  });
}

function IniciarMusica() {
  const music = document.getElementById("musica");
  music.volume = 0.5;

  document.addEventListener(
    "click",
    () => {
      music.play();
    },
    { once: true },
  );
}

IniciarManchas();
IniciarMusica();
