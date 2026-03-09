'use strict';

// ============================================================
// Embedded Data (avoids CORS issues when opened via file://)
// ============================================================
const CATEGORIES_DATA = [
  { id: 'filmes',             name: 'Filmes',                        words: ["Titanic","Vingadores","O Rei Leão","Matrix","Forrest Gump","Parasita","Coringa","Harry Potter","Star Wars","Exterminador do Futuro","Jurassic Park","O Poderoso Chefão"] },
  { id: 'series',             name: 'Séries',                        words: ["Breaking Bad","Game of Thrones","Stranger Things","Friends","La Casa de Papel","The Office","Peaky Blinders","Dark","Narcos","Chernobyl","Squid Game","Black Mirror"] },
  { id: 'videogames',         name: 'Videogames',                    words: ["Minecraft","GTA V","Fortnite","The Last of Us","Red Dead Redemption","God of War","Zelda","FIFA","Call of Duty","Cyberpunk 2077","Elden Ring","Among Us"] },
  { id: 'musicas',            name: 'Músicas',                       words: ["Bohemian Rhapsody","Thriller","Shape of You","Despacito","Blinding Lights","Rolling in the Deep","Smells Like Teen Spirit","Hotel California","Imagine","Baby Shark","Gangnam Style","Perfect"] },
  { id: 'artistas',           name: 'Artistas e Bandas',             words: ["Beatles","Michael Jackson","Madonna","Taylor Swift","Beyoncé","Led Zeppelin","Rihanna","Queen","Eminem","Anitta","Ivete Sangalo","Gusttavo Lima"] },
  { id: 'comidas',            name: 'Comidas',                       words: ["Pizza","Hambúrguer","Sushi","Churrasco","Feijoada","Brigadeiro","Lasanha","Hot Dog","Tapioca","Coxinha","Pão de Queijo","Frango Grelhado"] },
  { id: 'bebidas',            name: 'Bebidas',                       words: ["Coca-Cola","Suco de Laranja","Cerveja","Caipirinha","Café","Chá Verde","Água de Coco","Vinho","Energético","Leite","Limonada","Guaraná"] },
  { id: 'esportes',           name: 'Esportes',                      words: ["Futebol","Basquete","Tênis","Vôlei","Natação","Boxe","Fórmula 1","Surfe","Judô","Atletismo","Ciclismo","Rugby"] },
  { id: 'paises',             name: 'Países',                        words: ["Brasil","Estados Unidos","França","Japão","Alemanha","Itália","Argentina","Portugal","Austrália","China","Índia","México"] },
  { id: 'cidades-br',         name: 'Cidades Brasileiras',           words: ["São Paulo","Rio de Janeiro","Brasília","Salvador","Fortaleza","Manaus","Curitiba","Recife","Porto Alegre","Goiânia","Florianópolis","Belém"] },
  { id: 'animais',            name: 'Animais',                       words: ["Elefante","Leão","Golfinho","Cobra","Águia","Gorila","Pinguim","Tubarão","Borboleta","Lobo","Tartaruga","Camelo"] },
  { id: 'profissoes',         name: 'Profissões',                    words: ["Médico","Engenheiro","Advogado","Professor","Bombeiro","Astronauta","Chef de Cozinha","Piloto","Arquiteto","Psicólogo","Veterinário","Policial"] },
  { id: 'herois-marvel',      name: 'Heróis Marvel',                 words: ["Homem-Aranha","Capitão América","Iron Man","Thor","Hulk","Viúva Negra","Pantera Negra","Doutor Estranho","Gavião Arqueiro","Visão","Capitã Marvel","Shang-Chi"] },
  { id: 'herois-dc',          name: 'Heróis DC',                     words: ["Batman","Superman","Mulher-Maravilha","Flash","Aquaman","Lanterna Verde","Shazam","Cyborg","Arlequina","Supergirl","Atom","Martian Manhunter"] },
  { id: 'viloes',             name: 'Vilões',                        words: ["Coringa","Thanos","Darth Vader","Voldemort","Magneto","Joker","Lex Luthor","Malévola","Ursula","Lúcifer","Freddy Krueger","Jason Voorhees"] },
  { id: 'anime',              name: 'Personagens de Anime',          words: ["Naruto","Goku","Luffy","Sasuke","Light Yagami","Levi","Totoro","Pikachu","Vegeta","Ichigo","Asuka","Saitama"] },
  { id: 'marcas',             name: 'Marcas Famosas',                words: ["Apple","Nike","Coca-Cola","McDonald's","Google","Amazon","Samsung","Tesla","Adidas","Louis Vuitton","Ferrari","LEGO"] },
  { id: 'redes-sociais',      name: 'Redes Sociais',                 words: ["Instagram","TikTok","Facebook","Twitter/X","YouTube","WhatsApp","Snapchat","LinkedIn","Pinterest","Reddit","Telegram","Discord"] },
  { id: 'apps',               name: 'Aplicativos',                   words: ["Uber","iFood","Spotify","Netflix","Google Maps","Duolingo","Shazam","Tinder","Airbnb","PayPal","Zoom","Canva"] },
  { id: 'carros',             name: 'Carros',                        words: ["Ferrari","Lamborghini","Porsche","BMW","Mustang","Fusca","Gol","Civic","Corsa","Onix","Hilux","Jeep Renegade"] },
  { id: 'celebridades',       name: 'Celebridades Mundiais',         words: ["Elon Musk","Cristiano Ronaldo","Lady Gaga","Ariana Grande","The Rock","Kylie Jenner","Ed Sheeran","Zendaya","Ryan Reynolds","Billie Eilish","LeBron James","Selena Gomez"] },
  { id: 'youtubers-br',       name: 'Youtubers Brasileiros',         words: ["Felipe Neto","Whindersson Nunes","Rezendeevil","Authentic Games","Manual do Mundo","Porta dos Fundos","PC Siqueira","Galo Frito","Legends of Gaming Brasil","Julieta Joga","Deive Leonardo","Nando Moura"] },
  { id: 'doces',              name: 'Doces e Sobremesas',            words: ["Brigadeiro","Mousse de Chocolate","Pudim","Sorvete","Bolo de Cenoura","Churros","Tiramisu","Cheesecake","Brownie","Crepe","Macaroon","Waffle"] },
  { id: 'frutas',             name: 'Frutas',                        words: ["Manga","Abacaxi","Morango","Uva","Melancia","Maçã","Banana","Pera","Kiwi","Coco","Maracujá","Goiaba"] },
  { id: 'legumes',            name: 'Legumes e Verduras',            words: ["Cenoura","Batata","Tomate","Brócolis","Cebola","Alho","Pimentão","Abobrinha","Berinjela","Espinafre","Beterraba","Pepino"] },
  { id: 'instrumentos',       name: 'Instrumentos Musicais',         words: ["Guitarra","Piano","Violino","Bateria","Trompete","Saxofone","Flauta","Violão","Baixo","Ukulele","Acordeon","Contrabaixo"] },
  { id: 'tecnologia',         name: 'Tecnologia e Gadgets',          words: ["Smartphone","Notebook","Smartwatch","Drone","Impressora 3D","VR Headset","Alexa","GPS","Tablet","Webcam","SSD","Roteador"] },
  { id: 'jogos-tabuleiro',    name: 'Jogos de Tabuleiro',            words: ["Xadrez","Uno","Monopoly","Detetive","Banco Imobiliário","War","Catan","Imagem & Ação","Jogo da Vida","Coup","Jenga","Dixit"] },
  { id: 'filmes-animacao',    name: 'Filmes de Animação',            words: ["Toy Story","Rei Leão","Shrek","Frozen","Moana","Coco","Encanto","Soul","Ratatouille","Up","Procurando Nemo","Monstros S.A."] },
  { id: 'series-animacao',    name: 'Séries de Animação',            words: ["Simpsons","South Park","Rick and Morty","Bob Esponja","Futurama","Gravity Falls","Avatar","Steven Universe","Hora de Aventura","Teen Titans","Rugrats","Dexter's Lab"] },
  { id: 'fast-food',          name: 'Redes de Fast Food',            words: ["McDonald's","Burger King","Subway","KFC","Domino's","Bob's","Giraffas","Habib's","Pizza Hut","Popeyes","Five Guys","Taco Bell"] },
  { id: 'esportes-olimpicos', name: 'Esportes Olímpicos',            words: ["Natação","Atletismo","Ginástica","Judô","Esgrima","Hipismo","Remo","Vela","Tiro com Arco","Halterofilismo","Luta Greco-Romana","Ciclismo de Pista"] },
  { id: 'harry-potter',       name: 'Personagens de Harry Potter',   words: ["Harry Potter","Hermione Granger","Ron Weasley","Albus Dumbledore","Voldemort","Severus Snape","Draco Malfoy","Rúbio Hagrid","Sirius Black","Bellatrix Lestrange","Neville Longbottom","Luna Lovegood"] },
  { id: 'star-wars',          name: 'Personagens de Star Wars',      words: ["Luke Skywalker","Darth Vader","Han Solo","Princesa Leia","Yoda","Obi-Wan Kenobi","Rey","Kylo Ren","Grogu","Darth Maul","Padmé Amidala","Qui-Gon Jinn"] },
  { id: 'memes',              name: 'Memes Famosos',                 words: ["Distracted Boyfriend","Doge","Harambe","Hide the Pain Harold","This is Fine","Trollface","Caixão da Gana","Chico Bento Meditando","Tá com medo de quê?","Me Leaving","Giga Chad","Woman Yelling at Cat"] },
  { id: 'streamers-br',       name: 'Streamers Brasileiros',         words: ["Gaules","Loud Coringa","Alanzoka","Casimiro","Cellbit","Nobru","Zerator","Jukes","LOUD Thurzin","Maateus","Felps","yoDa"] },
  { id: 'superpoderes',       name: 'Superpoderes',                  words: ["Telepatia","Invisibilidade","Telecinese","Super Força","Voar","Super Velocidade","Controlar o Tempo","Teletransporte","Regeneração","Controlar o Clima","Raio Laser","Elasticidade"] },
  { id: 'disney',             name: 'Personagens Disney',            words: ["Mickey Mouse","Cinderela","Simba","Ariel","Moana","Elsa","Rapunzel","Buzz Lightyear","Woody","Aladdin","Jasmine","Bela"] },
  { id: 'podcasts',           name: 'Podcasts',                      words: ["Flow","NerdCast","Inteligência Ltda","Café da Manhã","Mano a Mano","Podpah","Xadrez Verbal","Naruhodo","Ticaracaticast","Praia dos Ossos","Anticast","B9"] },
  { id: 'influencers-br',     name: 'Influencers Brasileiras/os',    words: ["Virgínia Fonseca","Bruna Marquezine","Jade Picon","Maisa Silva","Larissa Manoela","Manu Gavassi","Camila Queiroz","Juliette","Pocah","Sabrina Sato","Bianca Andrade","Gkay"] },
  { id: 'consoles',           name: 'Consoles de Videogame',         words: ["PlayStation 5","Xbox Series X","Nintendo Switch","PlayStation 4","Atari","Nintendo 64","Game Boy","Mega Drive","Dreamcast","GameCube","Wii","PlayStation 2"] },
  { id: 'game-of-thrones',    name: 'Personagens de Game of Thrones',words: ["Jon Snow","Daenerys Targaryen","Tyrion Lannister","Cersei Lannister","Arya Stark","Sansa Stark","Ned Stark","Jaime Lannister","Brienne de Tarth","Joffrey Baratheon","Melisandre","Varys"] },
  { id: 'series-br',          name: 'Séries Brasileiras',            words: ["Chiquititas","Malhação","Avenida Brasil","O Clone","Rebelde","3%","Dois Irmãos","Amor de Mãe","Pedaço de Mim","Round 6 Brasil","Pantanal","Mulheres Apaixonadas"] },
  { id: 'esportes-radicais',  name: 'Esportes Radicais',             words: ["Skate","Snowboard","Paraquedismo","Bungee Jump","Escalada","Surfe de Ondas Grandes","Base Jump","Wingsuit","Motocross","Kitesurf","Rapel","Parkour"] },
  { id: 'culinaria-mundial',  name: 'Culinária Mundial',             words: ["Sushi","Paella","Curry","Croissant","Kebab","Tacos","Dim Sum","Risotto","Pho","Hummus","Ceviche","Moussaka"] },
  { id: 'monumentos',         name: 'Monumentos e Pontos Turísticos',words: ["Torre Eiffel","Cristo Redentor","Machu Picchu","Coliseu","Grande Muralha da China","Taj Mahal","Estátua da Liberdade","Stonehenge","Pirâmides do Egito","Big Ben","Opera de Sydney","Petra"] },
  { id: 'series-netflix',     name: 'Séries Netflix',                words: ["Stranger Things","Ozark","The Crown","Bridgerton","Lupin","Squid Game","Emily em Paris","Narcos","Dark","You","Mindhunter","Sex Education"] },
  { id: 'personagens-games',  name: 'Personagens de Videogames',     words: ["Mario","Sonic","Master Chief","Kratos","Lara Croft","Nathan Drake","Geralt de Rívia","Arthur Morgan","Joel Miller","Link","Cloud Strife","Solid Snake"] },
  { id: 'atletas-br',         name: 'Atletas Brasileiros',           words: ["Pelé","Ayrton Senna","Gustavo Borges","Daiane dos Santos","Marta","Neymar","Rodrigo Pessoa","Hortência","Oscar Schmidt","Cesar Cielo","Ana Paula Connelly","Adhemar Ferreira"] },
  { id: 'decada-2000',        name: 'Anos 2000 (Nostalgia)',          words: ["MSN Messenger","Orkut","Tamagotchi","Motorola Razr","iPod","Pendrive","DVD","LAN House","Chiquititas","Power Rangers","Giga Pet","Nokia Tijolão"] },
];

// ============================================================
// State
// ============================================================
const state = {
  players: [],
  order: [],            // shuffled player indices for reveal phase
  currentOrderIndex: 0,
  impostorIndex: null,  // index into state.players
  firstPlayerIndex: null,
  category: null,       // { id, name }
  word: null,
  revealed: false,
  disabledCategories: new Set(),
};

// ============================================================
// DOM References
// ============================================================
const screens = {
  home:       document.getElementById('screen-home'),
  players:    document.getElementById('screen-players'),
  reveal:     document.getElementById('screen-reveal'),
  result:     document.getElementById('screen-result'),
  categories: document.getElementById('screen-categories'),
};

const playerNameInput  = document.getElementById('input-player-name');
const btnAddPlayer     = document.getElementById('btn-add-player');
const playerList       = document.getElementById('player-list');
const btnStartGame     = document.getElementById('btn-start-game');
const playersHint      = document.getElementById('players-hint');
const btnBackHome      = document.getElementById('btn-back-home');

const revealPlayerName       = document.getElementById('reveal-player-name');
const revealWaiting          = document.getElementById('reveal-waiting');
const btnReveal              = document.getElementById('btn-reveal');
const revealResult           = document.getElementById('reveal-result');
const revealImpostorCard     = document.getElementById('reveal-impostor-card');
const revealWordCard         = document.getElementById('reveal-word-card');
const revealCategoryImpostor = document.getElementById('reveal-category-impostor');
const revealCategoryWord     = document.getElementById('reveal-category-word');
const revealWord             = document.getElementById('reveal-word');
const btnNextPlayer          = document.getElementById('btn-next-player');
const btnNextLabel           = document.getElementById('btn-next-label');

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
  const trimmed = name.trim().replace(/\b\w/g, c => c.toUpperCase());
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
function startGame() {
  if (state.players.length < 3) return;

  const { category, word } = pickRandomCategoryAndWord();
  state.category = category;
  state.word = word;

  const playerCount = state.players.length;

  state.order = shuffle([...Array(playerCount).keys()]);
  state.currentOrderIndex = 0;

  state.impostorIndex = Math.floor(Math.random() * playerCount);

  const nonImpostors = state.players
    .map((_, i) => i)
    .filter(i => i !== state.impostorIndex);
  state.firstPlayerIndex = nonImpostors[Math.floor(Math.random() * nonImpostors.length)];

  state.revealed = false;
  showRevealScreen();
}

// ============================================================
// Data Selection (inline — no fetch needed)
// ============================================================
function pickRandomCategoryAndWord() {
  const active = CATEGORIES_DATA.filter(c => !state.disabledCategories.has(c.id));
  const pool = active.length > 0 ? active : CATEGORIES_DATA;
  const cat = pool[Math.floor(Math.random() * pool.length)];
  const word = cat.words[Math.floor(Math.random() * cat.words.length)];
  return { category: { id: cat.id, name: cat.name }, word };
}

// ============================================================
// Reveal Phase
// ============================================================
function showRevealScreen() {
  const playerIndex = state.order[state.currentOrderIndex];
  revealPlayerName.textContent = state.players[playerIndex];

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
  resultFirstPlayer.textContent = state.players[state.firstPlayerIndex];

  const orderedList = buildOrderedList();
  resultOrderList.innerHTML = '';
  orderedList.forEach((playerIdx, pos) => {
    const li = document.createElement('li');
    li.className = 'result-order-item';
    const isImpostor = playerIdx === state.impostorIndex;
    li.innerHTML = `
      <span class="result-order-num">${pos + 1}</span>
      <span>${escapeHtml(state.players[playerIdx])}</span>
    `;
    resultOrderList.appendChild(li);
  });

  showScreen('result');
}

function buildOrderedList() {
  const total = state.players.length;
  const start = state.firstPlayerIndex;
  const ordered = [];

  for (let i = 0; i < total; i++) {
    ordered.push((start + i) % total);
  }
  return ordered;
}

// ============================================================
// Categories Screen
// ============================================================
const CATEGORY_ICONS = {
  'filmes':             'fa-film',
  'series':             'fa-tv',
  'videogames':         'fa-gamepad',
  'musicas':            'fa-music',
  'artistas':           'fa-guitar',
  'comidas':            'fa-utensils',
  'bebidas':            'fa-wine-glass',
  'esportes':           'fa-futbol',
  'paises':             'fa-earth-americas',
  'cidades-br':         'fa-city',
  'animais':            'fa-paw',
  'profissoes':         'fa-briefcase',
  'herois-marvel':      'fa-spider',
  'herois-dc':          'fa-bolt',
  'viloes':             'fa-skull-crossbones',
  'anime':              'fa-star',
  'marcas':             'fa-tag',
  'redes-sociais':      'fa-hashtag',
  'apps':               'fa-mobile-screen',
  'carros':             'fa-car',
  'celebridades':       'fa-camera',
  'youtubers-br':       'fa-youtube',
  'doces':              'fa-candy-cane',
  'frutas':             'fa-apple-whole',
  'legumes':            'fa-leaf',
  'instrumentos':       'fa-drum',
  'tecnologia':         'fa-microchip',
  'jogos-tabuleiro':    'fa-chess',
  'filmes-animacao':    'fa-wand-magic-sparkles',
  'series-animacao':    'fa-clapperboard',
  'fast-food':          'fa-burger',
  'esportes-olimpicos': 'fa-medal',
  'harry-potter':       'fa-hat-wizard',
  'star-wars':          'fa-jedi',
  'memes':              'fa-face-laugh-squint',
  'streamers-br':       'fa-tower-broadcast',
  'superpoderes':       'fa-hand-fist',
  'disney':             'fa-castle',
  'podcasts':           'fa-microphone',
  'influencers-br':     'fa-heart',
  'consoles':           'fa-plug',
  'game-of-thrones':    'fa-crown',
  'series-br':          'fa-satellite-dish',
  'esportes-radicais':  'fa-person-skiing',
  'culinaria-mundial':  'fa-bowl-food',
  'monumentos':         'fa-landmark',
  'series-netflix':     'fa-n',
  'personagens-games':  'fa-sword',
  'atletas-br':         'fa-trophy',
  'decada-2000':        'fa-compact-disc',
};

function renderCategoriesScreen() {
  const list = document.getElementById('categories-list');
  list.innerHTML = '';

  CATEGORIES_DATA.forEach(cat => {
    const enabled = !state.disabledCategories.has(cat.id);
    const item = document.createElement('div');
    item.className = 'category-item' + (enabled ? '' : ' disabled');
    item.dataset.id = cat.id;
    const icon = CATEGORY_ICONS[cat.id] || 'fa-list';
    item.innerHTML = `
      <i class="fa-solid ${icon} category-icon"></i>
      <span class="category-name">${escapeHtml(cat.name)}</span>
      <span class="category-check"><i class="fa-solid fa-check"></i></span>
    `;
    list.appendChild(item);
  });

  updateSelectAllBtn();
}

function toggleCategory(id) {
  if (state.disabledCategories.has(id)) {
    state.disabledCategories.delete(id);
  } else {
    const enabledCount = CATEGORIES_DATA.length - state.disabledCategories.size;
    if (enabledCount <= 1) {
      showToast('Pelo menos uma categoria deve estar ativa.');
      return;
    }
    state.disabledCategories.add(id);
  }
  const item = document.querySelector(`.category-item[data-id="${id}"]`);
  if (item) item.classList.toggle('disabled');
  updateSelectAllBtn();
}

function updateSelectAllBtn() {
  const btn = document.getElementById('btn-select-all');
  const allEnabled = state.disabledCategories.size === 0;
  btn.textContent = allEnabled ? 'Desmarcar Todas' : 'Marcar Todas';
}

// ============================================================
// Restart
// ============================================================
function quickRestart() {
  state.order = [];
  state.currentOrderIndex = 0;
  state.impostorIndex = null;
  state.firstPlayerIndex = null;
  state.category = null;
  state.word = null;
  state.revealed = false;
  startGame();
}

function restart() {
  state.order = [];
  state.currentOrderIndex = 0;
  state.impostorIndex = null;
  state.firstPlayerIndex = null;
  state.category = null;
  state.word = null;
  state.revealed = false;

  playerNameInput.value = '';
  renderPlayerList();
  showScreen('players');
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
document.getElementById('btn-start').addEventListener('click', () => showScreen('players'));

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

btnReveal.addEventListener('click', revealForCurrentPlayer);
btnNextPlayer.addEventListener('click', nextPlayer);

btnRestart.addEventListener('click', restart);
document.getElementById('btn-quick-restart').addEventListener('click', quickRestart);

document.getElementById('btn-settings').addEventListener('click', () => {
  renderCategoriesScreen();
  showScreen('categories');
});

document.getElementById('btn-back-from-categories').addEventListener('click', () => showScreen('players'));

document.getElementById('categories-list').addEventListener('click', e => {
  const item = e.target.closest('.category-item');
  if (item) toggleCategory(item.dataset.id);
});

document.getElementById('btn-select-all').addEventListener('click', () => {
  const allEnabled = state.disabledCategories.size === 0;
  if (allEnabled) {
    // desmarcar todas exceto a primeira
    CATEGORIES_DATA.forEach((cat, i) => { if (i > 0) state.disabledCategories.add(cat.id); });
  } else {
    state.disabledCategories.clear();
  }
  renderCategoriesScreen();
});
