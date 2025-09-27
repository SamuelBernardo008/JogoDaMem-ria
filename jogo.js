const cartas = document.querySelectorAll('.carta');
let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false;

function virarCarta() {
  if (bloqueio) return;
  if (this === primeiraCarta) return;

  this.classList.add('virada');

  if (!primeiraCarta) {
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;
  checarCombinação();
}

function checarCombinação() {
  const combinou = primeiraCarta.querySelector('.frente').src === segundaCarta.querySelector('.frente').src;

  if (combinou) {
    resetarCartas(true);
  } else {
    bloqueio = true;
    setTimeout(() => {
      primeiraCarta.classList.remove('virada');
      segundaCarta.classList.remove('virada');
      resetarCartas(false);
    }, 1000);
  }
}

function resetarCartas(combinou) {
  if (combinou) {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
  }
  [primeiraCarta, segundaCarta] = [null, null];
  bloqueio = false;
}

// Embaralhar cartas
(function embaralhar() {
  cartas.forEach(carta => {
    let posicaoAleatoria = Math.floor(Math.random() * cartas.length);
    carta.style.order = posicaoAleatoria;
  });
})();

cartas.forEach(carta => carta.addEventListener('click', virarCarta));
