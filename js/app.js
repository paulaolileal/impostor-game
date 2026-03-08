'use strict';

// ============================================================
// State
// ============================================================
const state = {
  players: [],
  order: [],            // shuffled player indices for reveal phase
  currentOrderIndex: 0, // position in `order` during reveal phase
  impostorIndex: null,  // index into state.players
  firstPlayerIndex: null,
  category: null,       // { id, name }
  word: null,
  revealed: false,
};

// ============================================================
// DOM References
// ============================================================
const screens = {
  home:    document.getElementById('screen-home'),
  players: document.getElementById('screen-players'),
  reveal:  document.getElementById('screen-reveal'),
  result:  document.getElementById('screen-result'),
};

const playerNameInput  = document.getElementById('input-player-name');
const btnAddPlayer     = document.getElementById('btn-add-player');
const playerList       = document.getElementById('player-list');
const btnStartGame     = document.getElementById('btn-start-game');
const playersHint      = document.getElementById('players-hint');
const btnBackHome      = document.getElementById('btn-back-home');

const revealPlayerName      = document.getElementById('reveal-player-name');
const revealWaiting         = document.getElementById('reveal-waiting');
const btnReveal             = document.getElementById('btn-reveal');
const revealResult          = document.getElementById('reveal-result');
const revealImpostorCard    = document.getElementById('reveal-impostor-card');
const revealWordCard        = document.getElementById('reveal-word-card');
const revealCategoryImpostor = document.getElementById('reveal-category-impostor');
const revealCategoryWord    = document.getElementById('reveal-category-word');
const revealWord            = document.getElementById('reveal-word');
const btnNextPlayer         = document.getElementById('btn-next-player');
const btnNextLabel          = document.getElementById('btn-next-label');

const resultFirstPlayer = document.getElementById('result-first-player');
const resultOrderList   = document.getElementById('result-order-list');
const btnRestart        = document.getElementById('btn-restart');

// ============================================================
// Screen Navigation
// ============================================================
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ============================================================
// Toast helper
// ============================================================
function showToast(message) {
  const toastEl = document.getElementById('error-toast');
  document.getElementById('toast-message').textContent = message;
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 });
  toast.show();
}

// ============================================================
// Player management
// ============================================================
function addPlayer(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  if (state.players.length >= 20) {
    showToast('Máximo de 20 jogadores atingido.');
    return;
  }
  if (state.players.some(p => p.toLowerCase() === trimmed.toLowerCase())) {
    showToast('Já existe um jogador com esse nome.');
    return;
  }
  state.players.push(trimmed);
  renderPlayerList();
}

function removePlayer(index) {
  state.players.splice(index, 1);
  renderPlayerList();
}

function renderPlayerList() {
  playerList.innerHTML = '';
  state.players.forEach((name, i) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <span class="player-number">${i + 1}.</span>
      <span class="player-item-name">${escapeHtml(name)}</span>
      <button class="player-remove-btn" aria-label="Remover ${escapeHtml(name)}" data-index="${i}">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    playerList.appendChild(li);
  });

  const canStart = state.players.length >= 3;
  btnStartGame.disabled = !canStart;
  playersHint.style.display = canStart ? 'none' : 'block';
}

// ============================================================
// Game Initialization
// ============================================================
async function startGame() {
  if (state.players.length < 3) return;

  try {
    const { category, word } = await loadRandomCategoryAndWord();
    state.category = category;
    state.word = word;

    const playerCount = state.players.length;

    // Shuffle player order for the reveal phase
    state.order = shuffle([...Array(playerCount).keys()]);
    state.currentOrderIndex = 0;

    // Pick impostor (random player index)
    state.impostorIndex = state.players.indexOf(
      state.players[Math.floor(Math.random() * playerCount)]
    );
    state.impostorIndex = Math.floor(Math.random() * playerCount);

    // Pick first player (random non-impostor)
    const nonImpostors = state.players
      .map((_, i) => i)
      .filter(i => i !== state.impostorIndex);
    state.firstPlayerIndex = nonImpostors[Math.floor(Math.random() * nonImpostors.length)];

    state.revealed = false;
    showRevealScreen();
  } catch (err) {
    console.error(err);
    showToast('Erro ao carregar as palavras. Tente novamente.');
  }
}

// ============================================================
// Data Loading
// ============================================================
async function loadRandomCategoryAndWord() {
  const categories = await fetch('data/categories.json').then(r => {
    if (!r.ok) throw new Error('categories.json não encontrado');
    return r.json();
  });
  const cat = categories[Math.floor(Math.random() * categories.length)];
  const words = await fetch(`data/words/${cat.id}.json`).then(r => {
    if (!r.ok) throw new Error(`data/words/${cat.id}.json não encontrado`);
    return r.json();
  });
  const word = words[Math.floor(Math.random() * words.length)];
  return { category: cat, word };
}

// ============================================================
// Reveal Phase
// ============================================================
function showRevealScreen() {
  const playerIndex = state.order[state.currentOrderIndex];
  revealPlayerName.textContent = state.players[playerIndex];

  // Reset reveal UI
  revealWaiting.classList.remove('d-none');
  revealResult.classList.add('d-none');
  revealImpostorCard.classList.add('d-none');
  revealWordCard.classList.add('d-none');
  btnNextPlayer.classList.add('d-none');
  state.revealed = false;

  showScreen('reveal');
}

function revealForCurrentPlayer() {
  if (state.revealed) return;
  state.revealed = true;

  const playerIndex = state.order[state.currentOrderIndex];
  const isImpostor = playerIndex === state.impostorIndex;
  const isLastPlayer = state.currentOrderIndex === state.order.length - 1;

  revealWaiting.classList.add('d-none');
  revealResult.classList.remove('d-none');

  if (isImpostor) {
    revealCategoryImpostor.textContent = state.category.name;
    revealImpostorCard.classList.remove('d-none');
  } else {
    revealCategoryWord.textContent = state.category.name;
    revealWord.textContent = state.word;
    revealWordCard.classList.remove('d-none');
  }

  // Delay button appearance to prevent accidental taps
  setTimeout(() => {
    btnNextPlayer.classList.remove('d-none');
    btnNextLabel.textContent = isLastPlayer ? 'Ver Resultado' : 'Próximo Jogador';
  }, 2000);
}

function nextPlayer() {
  if (state.currentOrderIndex >= state.order.length - 1) {
    showResult();
    return;
  }
  state.currentOrderIndex++;
  showRevealScreen();
}

// ============================================================
// Result Phase
// ============================================================
function showResult() {
  const firstName = state.players[state.firstPlayerIndex];
  resultFirstPlayer.textContent = firstName;

  // Build ordered list starting from firstPlayerIndex (among non-impostors first, then impostor last)
  const orderedByFirst = buildOrderedList();

  resultOrderList.innerHTML = '';
  orderedByFirst.forEach((playerIdx, pos) => {
    const li = document.createElement('li');
    li.className = 'result-order-item';
    const isImpostor = playerIdx === state.impostorIndex;
    li.innerHTML = `
      <span class="result-order-num">${pos + 1}</span>
      <span>${escapeHtml(state.players[playerIdx])}</span>
      ${isImpostor ? '<span class="result-impostor-badge"><i class="fa-solid fa-skull me-1"></i>Impostor</span>' : ''}
    `;
    resultOrderList.appendChild(li);
  });

  showScreen('result');
}

function buildOrderedList() {
  // Start from firstPlayer, go around the circle, impostor at the end
  const total = state.players.length;
  const nonImpostors = [];
  const start = state.firstPlayerIndex;

  for (let i = 0; i < total; i++) {
    const idx = (start + i) % total;
    if (idx !== state.impostorIndex) {
      nonImpostors.push(idx);
    }
  }
  return [...nonImpostors, state.impostorIndex];
}

// ============================================================
// Restart
// ============================================================
function restart() {
  state.players = [];
  state.order = [];
  state.currentOrderIndex = 0;
  state.impostorIndex = null;
  state.firstPlayerIndex = null;
  state.category = null;
  state.word = null;
  state.revealed = false;

  playerNameInput.value = '';
  renderPlayerList();
  showScreen('home');
}

// ============================================================
// Utilities
// ============================================================
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

// ============================================================
// Event Listeners
// ============================================================

// Home
document.getElementById('btn-start').addEventListener('click', () => showScreen('players'));

// Players screen
btnBackHome.addEventListener('click', () => showScreen('home'));

btnAddPlayer.addEventListener('click', () => {
  addPlayer(playerNameInput.value);
  playerNameInput.value = '';
  playerNameInput.focus();
});

playerNameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addPlayer(playerNameInput.value);
    playerNameInput.value = '';
  }
});

playerList.addEventListener('click', e => {
  const btn = e.target.closest('[data-index]');
  if (btn) removePlayer(Number(btn.dataset.index));
});

btnStartGame.addEventListener('click', startGame);

// Reveal screen
btnReveal.addEventListener('click', revealForCurrentPlayer);
btnNextPlayer.addEventListener('click', nextPlayer);

// Result screen
btnRestart.addEventListener('click', restart);
