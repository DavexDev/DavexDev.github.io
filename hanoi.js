// Torre de Hanoi en JS con drag&drop + solución automática (apilado estable) + Modal de victoria
(() => {
  const towers = [[], [], []]; // cada torre: array de discos (abajo->arriba)
  let total = 4;
  let started = false;
  let solved = false;
  let animating = false;
  let moves = 0;
  let t0 = 0;
  let timerId = null;

  // UI refs
  const elTowers = [...document.querySelectorAll(".tower")];
  const elMoves = document.getElementById("moves");
  const elTime  = document.getElementById("time");
  const elDiskCount = document.getElementById("diskCount");
  const elSpeed = document.getElementById("speed");
  const btnStart = document.getElementById("btnStart");
  const btnReset = document.getElementById("btnReset");
  const btnSolve = document.getElementById("btnSolve");

  // --- Modal de victoria ---
  const elWinModal    = document.getElementById("winModal");
  const elWinMoves    = document.getElementById("winMoves");
  const elWinTime     = document.getElementById("winTime");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const btnPlayAgain  = document.getElementById("btnPlayAgain");

  function openWinModal(movesCount, timeText) {
    if (!elWinModal) return; // por si el HTML aún no tiene el modal
    elWinMoves.textContent = `Movimientos: ${movesCount}`;
    elWinTime.textContent  = `Tiempo: ${timeText}`;
    elWinModal.setAttribute("aria-hidden", "false");
    (btnPlayAgain ?? btnCloseModal)?.focus();
  }
  function closeWinModal() {
    if (!elWinModal) return;
    elWinModal.setAttribute("aria-hidden", "true");
  }
  btnCloseModal?.addEventListener("click", closeWinModal);
  elWinModal?.addEventListener("click", (e) => {
    if (e.target === elWinModal) closeWinModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && elWinModal?.getAttribute("aria-hidden") === "false") {
      closeWinModal();
    }
  });
  btnPlayAgain?.addEventListener("click", () => {
    closeWinModal();
    btnReset?.click();
    btnStart?.click();
  });

  // listeners base
  btnStart.addEventListener("click", () => {
    start(Number(elDiskCount.value));
  });
  btnReset.addEventListener("click", reset);
  btnSolve.addEventListener("click", solveAnimated);
  elSpeed.addEventListener("input", () => { /* se lee al animar */ });
  window.addEventListener("resize", () => { if (started) draw(); }); // redibujo estable

  function start(n) {
    reset();
    total = clamp(n, 3, 8);
    for (let i = total; i >= 1; i--) towers[0].push(i);
    started = true; solved = false; moves = 0; t0 = Date.now();
    draw();
    tickTime();
  }

  function reset() {
    towers[0] = []; towers[1] = []; towers[2] = [];
    started = false; solved = false; animating = false; moves = 0;
    clearInterval(timerId); timerId = null; elTime.textContent = "Tiempo: 00:00";
    draw();
  }

  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  function draw() {
    // limpiar DOM de cada torre
    elTowers.forEach(t => t.innerHTML = "");

    // pintar cada torre
    towers.forEach((stack, idx) => {
      const t = elTowers[idx];

      // ancho útil interno de la torre (coherente con padding lateral de .tower)
      const inner = (t.clientWidth || 300) - 20; // padding 10px + 10px
      const min = 60;
      const max = Math.max(min + 20, inner - 20); // margen visual

      // APILADO REAL: agregar primero el tope y al final la base
      for (let k = stack.length - 1; k >= 0; k--) {
        const size = stack[k];
        const el = document.createElement("div");
        el.className = "disk";
        el.dataset.size = String(size);
        el.textContent = size;

        // ancho proporcional estable (0..1) respecto al total de discos
        const w = Math.round(min + (max - min) * (size / total));
        el.style.width = `${w}px`;

        // drag solo sobre el disco tope y si no estamos animando
        el.draggable = isTop(idx, size) && started && !animating && !solved;
        if (el.draggable) {
          el.addEventListener("dragstart", (e) => onDragStart(e, idx, size, el));
          el.addEventListener("dragend", () => el.classList.remove("drag"));
        }

        // Importante: SIN position/bottom -> evita “bailes”
        t.appendChild(el);
      }
    });

    // drag target handlers + click-to-move
    elTowers.forEach((t, i) => {
      t.ondragover = (e) => { if (started && !animating && !solved) e.preventDefault(); };
      t.ondrop = (e) => {
        const from = Number(e.dataTransfer.getData("from"));
        const size = Number(e.dataTransfer.getData("size"));
        attemptMove(from, i, size);
      };
      t.onclick = () => handleClickTower(i);
    });

    elMoves.textContent = `Movimientos: ${moves}`;
  }

  // selección por clic (resalta la torre origen)
  let clickFrom = null;
  function handleClickTower(i) {
    if (!started || animating || solved) return;
    if (clickFrom === null) {
      if (towers[i].length) {
        clickFrom = i;
        elTowers[i].classList.add("selected");
      }
      return;
    }
    if (clickFrom !== i) {
      const size = topDisk(clickFrom);
      attemptMove(clickFrom, i, size);
    }
    if (clickFrom !== null) {
      elTowers[clickFrom].classList.remove("selected");
    }
    clickFrom = null;
  }

  function onDragStart(e, from, size, el) {
    el.classList.add("drag");
    e.dataTransfer.setData("from", String(from));
    e.dataTransfer.setData("size", String(size));
    e.dataTransfer.effectAllowed = "move";
  }

  function attemptMove(from, to, size) {
    if (!started || from === to) { draw(); return; }
    const top = topDisk(from);
    if (top !== size) { draw(); return; } // debe ser el tope
    const can = canPlace(size, to);
    if (can) {
      towers[from].pop();
      towers[to].push(size);
      moves++;
      // Detectar victoria y actuar
      if (isSolved()) {
        onWin();
        return; // evita más animación/pasos
      }
    }
    draw();
  }

  function isTop(towerIndex, size) {
    const s = towers[towerIndex];
    return s.length && s[s.length-1] === size;
  }

  function topDisk(i) {
    const s = towers[i];
    return s.length ? s[s.length-1] : null;
  }

  function canPlace(size, towerIndex) {
    const top = topDisk(towerIndex);
    return top === null || size < top;
  }

  function isSolved() {
    // resuelto si todas las piezas están en torre 1 o 2
    const totalCount = towers[0].length + towers[1].length + towers[2].length;
    return (towers[1].length === totalCount || towers[2].length === totalCount);
  }

  // Pausa tiempo + abre modal (solo una vez)
  function onWin() {
    if (solved) return;
    solved = true;
    animating = false;
    clearInterval(timerId);
    timerId = null;

    // calcula tiempo final mm:ss y actualiza UI
    const sec = Math.floor((Date.now() - t0)/1000);
    const mm = String(Math.floor(sec/60)).padStart(2,"0");
    const ss = String(sec%60).padStart(2,"0");
    const timeText = `${mm}:${ss}`;
    elTime.textContent = `Tiempo: ${timeText}`;

    openWinModal(moves, timeText); // modal en vez de alert
    draw(); // limpieza visual final
  }

  // reloj mm:ss
  function tickTime() {
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (!started || solved) return; // si ya ganó, no siga contando
      const sec = Math.floor((Date.now() - t0)/1000);
      const mm = String(Math.floor(sec/60)).padStart(2,"0");
      const ss = String(sec%60).padStart(2,"0");
      elTime.textContent = `Tiempo: ${mm}:${ss}`;
    }, 1000);
  }

  // solución automática (recursiva -> lista -> animación)
  function solveAnimated() {
    if (!started || animating || solved) return;
    const movesList = [];
    const n = towers[0].length + towers[1].length + towers[2].length;
    buildSolution(n, 0, 2, 1, movesList);
    animating = true;
    const delay = Number(elSpeed.value);
    let i = 0;
    const step = () => {
      if (!animating || solved) { animating = false; return; }
      if (i >= movesList.length) { animating = false; draw(); return; }
      const [from, to] = movesList[i++];
      const size = topDisk(from);
      attemptMove(from, to, size); // onWin() detiene todo si ya se resolvió
      if (animating && !solved) setTimeout(step, delay);
    };
    step();
  }

  function buildSolution(n, from, to, aux, out) {
    if (n === 0) return;
    buildSolution(n-1, from, aux, to, out);
    out.push([from, to]);
    buildSolution(n-1, aux, to, from, out);
  }

  // iniciar con el valor por defecto
  start(Number(elDiskCount.value));
})();
