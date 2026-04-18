/* ============================================
   CINELUX — PREMIUM CINEMA | script.js
   ============================================ */

'use strict';

// =============================================
// DATA
// =============================================
const MOVIES = [
  {
    id: 1, title: "Kalki 2898-AD", genre: "Sci-Fi", language: "Tamil",
    rating: 9.1, duration: 181, durationLabel: "3h 1m",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
    trailer: "https://www.youtube.com/embed/yHbD-A-ABHI",
    year: 2024, desc: "A futuristic odyssey blending mythology and science fiction."
  },
  {
    id: 2, title: "Oppenheimer", genre: "Thriller", language: "English",
    rating: 9.0, duration: 180, durationLabel: "3h 0m",
    poster: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
    year: 2023, desc: "The story of the father of the atomic bomb."
  },
  {
    id: 3, title: "Leo", genre: "Action", language: "Tamil",
    rating: 8.5, duration: 164, durationLabel: "2h 44m",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    trailer: "https://www.youtube.com/embed/GqCcMzteMoo",
    year: 2023, desc: "A mild-mannered cafe owner with a violent past."
  },
  {
    id: 4, title: "Dune: Part Two", genre: "Sci-Fi", language: "English",
    rating: 8.8, duration: 166, durationLabel: "2h 46m",
    poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80",
    trailer: "https://www.youtube.com/embed/Way9Dexny3w",
    year: 2024, desc: "Paul Atreides unites with the Fremen to wage war on the universe."
  },
  {
    id: 5, title: "Jailer", genre: "Action", language: "Tamil",
    rating: 8.3, duration: 168, durationLabel: "2h 48m",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80",
    trailer: "https://www.youtube.com/embed/xfBsm5KYJfg",
    year: 2023, desc: "A retired jailer is forced out of retirement to save his son."
  },
  {
    id: 6, title: "Jawan", genre: "Action", language: "Hindi",
    rating: 8.2, duration: 169, durationLabel: "2h 49m",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
    trailer: "https://www.youtube.com/embed/gqIJMSEuFfo",
    year: 2023, desc: "A man is driven by a personal vendetta to rectify social injustice."
  },
  {
    id: 7, title: "The Conjuring 4", genre: "Horror", language: "English",
    rating: 7.9, duration: 111, durationLabel: "1h 51m",
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80",
    trailer: "https://www.youtube.com/embed/k4JEvXTBVhY",
    year: 2024, desc: "The Warrens investigate a diabolical new case."
  },
  {
    id: 8, title: "Rocky Aur Rani", genre: "Romance", language: "Hindi",
    rating: 7.8, duration: 168, durationLabel: "2h 48m",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80",
    trailer: "https://www.youtube.com/embed/VE3m9NyVoHk",
    year: 2023, desc: "Two very different people fall in love and exchange families."
  },
  {
    id: 9, title: "Mission: Impossible 8", genre: "Action", language: "English",
    rating: 8.6, duration: 163, durationLabel: "2h 43m",
    poster: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&q=80",
    trailer: "https://www.youtube.com/embed/avz06PDqDbM",
    year: 2024, desc: "Ethan Hunt races against time to prevent global catastrophe."
  },
  {
    id: 10, title: "Tumbbad", genre: "Horror", language: "Hindi",
    rating: 8.7, duration: 104, durationLabel: "1h 44m",
    poster: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&q=80",
    trailer: "https://www.youtube.com/embed/n6AMnX5Dtyg",
    year: 2018, desc: "A mythological story about a goddess of prosperity."
  },
  {
    id: 11, title: "Kanguva", genre: "Action", language: "Tamil",
    rating: 7.5, duration: 161, durationLabel: "2h 41m",
    poster: "https://images.unsplash.com/photo-1561494880-0e4cb4616d9b?w=400&q=80",
    trailer: "https://www.youtube.com/embed/0WFqJ5-nAdU",
    year: 2024, desc: "An epic cross-century action saga."
  },
  {
    id: 12, title: "Kung Fu Panda 4", genre: "Comedy", language: "English",
    rating: 7.6, duration: 94, durationLabel: "1h 34m",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80",
    trailer: "https://www.youtube.com/embed/JFYKkWUiT3U",
    year: 2024, desc: "Po must train a new Dragon Warrior."
  }
];

const SNACKS = {
  popcorn: [
    { id: 'p1', name: 'Classic Salted', desc: 'Large bucket, lightly salted', emoji: '🍿', price: 180 },
    { id: 'p2', name: 'Cheese Blast', desc: 'Loaded with nacho cheese', emoji: '🧀', price: 220 },
    { id: 'p3', name: 'Caramel Crunch', desc: 'Sweet & buttery caramel', emoji: '🍬', price: 200 },
    { id: 'p4', name: 'Spicy Masala', desc: 'Tangy masala mix', emoji: '🌶️', price: 190 }
  ],
  drinks: [
    { id: 'd1', name: 'Pepsi Large', desc: '750ml ice cold', emoji: '🥤', price: 120 },
    { id: 'd2', name: 'Fresh Lime', desc: 'Chilled fresh lemon soda', emoji: '🍋', price: 90 },
    { id: 'd3', name: 'Mango Smoothie', desc: 'Fresh Alphonso mango', emoji: '🥭', price: 150 },
    { id: 'd4', name: 'Cold Coffee', desc: 'Rich espresso blend', emoji: '☕', price: 160 }
  ],
  bites: [
    { id: 'b1', name: 'Nachos & Dip', desc: 'Crispy with salsa & cheese', emoji: '🌮', price: 200 },
    { id: 'b2', name: 'Hot Dog', desc: 'Classic beef sausage', emoji: '🌭', price: 180 },
    { id: 'b3', name: 'Choco Bar', desc: 'Rich dark chocolate', emoji: '🍫', price: 80 },
    { id: 'b4', name: 'Veg Wrap', desc: 'Grilled veggie delight', emoji: '🌯', price: 160 }
  ]
};

// =============================================
// STATE
// =============================================
const state = {
  selectedSeats: new Set(),
  bookedSeats: new Set(),
  cart: {},
  totalPoints: 1250,
  totalEarned: 3750,
  redeemed: 0,
  bookings: [],
  activeBooking: null,
  progressStep: 0,
  selectedMovie: MOVIES[0],
  filters: { genre: 'all', lang: 'all', duration: 'all', search: '' }
};

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMovies();
  initBooking();
  initSnacks();
  initDashboard();
  initModal();
  initVoiceSearch();
  initStars();
});

// =============================================
// PRELOADER
// =============================================
function initPreloader() {
  const pre = document.getElementById('preloader');
  setTimeout(() => {
    pre.classList.add('hide');
    document.body.style.overflow = '';
  }, 2000);
}

// =============================================
// NAVBAR
// =============================================
function initNavbar() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Nav links
  document.querySelectorAll('.nav-link, .mob-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) navigateTo(page);
      // close mobile menu
      document.getElementById('mobileMenu').classList.remove('open');
    });
  });

  // Hamburger
  const ham = document.getElementById('hamburger');
  ham.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
}

// =============================================
// PAGE NAVIGATION
// =============================================
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const link = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (link) link.classList.add('active');

  // Trigger page-specific animations
  if (pageId === 'dashboard') animateDashboard();
}

// =============================================
// HERO STARS
// =============================================
function initStars() {
  const container = document.getElementById('heroStars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:rgba(212,175,55,${Math.random() * 0.5 + 0.1});
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      animation: twinkle ${Math.random() * 4 + 2}s ease-in-out ${Math.random() * 3}s infinite;
    `;
    container.appendChild(star);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0%,100%{opacity:0.2;transform:scale(1);}
      50%{opacity:1;transform:scale(1.4);}
    }
  `;
  document.head.appendChild(style);
}

// =============================================
// MOVIES
// =============================================
function initMovies() {
  renderMovies(MOVIES);

  document.getElementById('genreFilter').addEventListener('change', applyFilters);
  document.getElementById('langFilter').addEventListener('change', applyFilters);
  document.getElementById('durationFilter').addEventListener('change', applyFilters);
  document.getElementById('searchInput').addEventListener('input', applyFilters);

  document.getElementById('resetFilters').addEventListener('click', () => {
    document.getElementById('genreFilter').value = 'all';
    document.getElementById('langFilter').value = 'all';
    document.getElementById('durationFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    state.filters = { genre: 'all', lang: 'all', duration: 'all', search: '' };
    renderMovies(MOVIES);
  });
}

function applyFilters() {
  const genre = document.getElementById('genreFilter').value;
  const lang = document.getElementById('langFilter').value;
  const duration = document.getElementById('durationFilter').value;
  const search = document.getElementById('searchInput').value.toLowerCase().trim();

  state.filters = { genre, lang, duration, search };

  const filtered = MOVIES.filter(m => {
    if (genre !== 'all' && m.genre !== genre) return false;
    if (lang !== 'all' && m.language !== lang) return false;
    if (duration === 'short' && m.duration >= 120) return false;
    if (duration === 'long' && m.duration < 120) return false;
    if (search && !m.title.toLowerCase().includes(search) &&
        !m.genre.toLowerCase().includes(search) &&
        !m.language.toLowerCase().includes(search)) return false;
    return true;
  });

  renderMovies(filtered);
}

function renderMovies(movies) {
  const grid = document.getElementById('moviesGrid');
  const noResults = document.getElementById('noResults');

  if (movies.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = movies.map((m, i) => `
    <div class="movie-card" style="animation-delay:${i * 0.07}s">
      <div class="card-poster">
        <img src="${m.poster}" alt="${m.title}" loading="lazy"/>
        <div class="rating-badge"><i class="fas fa-star"></i> ${m.rating}</div>
        <span class="lang-badge">${m.language}</span>
        <div class="card-poster-overlay">
          <button class="trailer-btn" onclick="openTrailer(${m.id})">
            <i class="fas fa-play"></i> Watch Trailer
          </button>
          <button class="book-card-btn" onclick="bookMovie(${m.id})">
            <i class="fas fa-ticket-alt"></i> Book Now
          </button>
        </div>
      </div>
      <div class="card-info">
        <div class="card-title">${m.title}</div>
        <div class="card-meta">
          <span class="card-genre">${m.genre}</span>
          <span class="card-duration"><i class="fas fa-clock"></i> ${m.durationLabel}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function bookMovie(id) {
  const movie = MOVIES.find(m => m.id === id);
  if (movie) {
    state.selectedMovie = movie;
    updateBookingMovieChips();
    navigateTo('booking');
    showToast(`<i class="fas fa-ticket-alt"></i> Booking: ${movie.title}`, 'gold-toast');
  }
}

// =============================================
// TRAILER MODAL
// =============================================
function initModal() {
  document.getElementById('modalClose').addEventListener('click', closeTrailer);
  document.getElementById('trailerModal').addEventListener('click', e => {
    if (e.target === document.getElementById('trailerModal')) closeTrailer();
  });
}

function openTrailer(id) {
  const movie = MOVIES.find(m => m.id === id);
  if (!movie) return;

  document.getElementById('modalMovieInfo').innerHTML = `
    <h3>${movie.title}</h3>
    <p><i class="fas fa-tag" style="color:var(--gold)"></i> ${movie.genre} &nbsp;|&nbsp;
       <i class="fas fa-clock" style="color:var(--gold)"></i> ${movie.durationLabel} &nbsp;|&nbsp;
       <i class="fas fa-star" style="color:var(--gold)"></i> ${movie.rating}</p>
  `;
  document.getElementById('trailerIframe').src = movie.trailer + '?autoplay=1&mute=0';
  document.getElementById('trailerModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTrailer() {
  document.getElementById('trailerModal').classList.remove('open');
  document.getElementById('trailerIframe').src = '';
  document.body.style.overflow = '';
}

// =============================================
// VOICE SEARCH
// =============================================
function initVoiceSearch() {
  const voiceBtn = document.getElementById('voiceBtn');
  const voiceStatus = document.getElementById('voiceStatus');
  const searchInput = document.getElementById('searchInput');

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    voiceBtn.title = 'Voice search not supported';
    voiceBtn.style.opacity = '0.4';
    return;
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SR();
  recognition.lang = 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = true;

  let isListening = false;

  voiceBtn.addEventListener('click', () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });

  recognition.onstart = () => {
    isListening = true;
    voiceBtn.classList.add('listening');
    document.getElementById('voiceIcon').className = 'fas fa-microphone-slash';
    voiceStatus.textContent = '🎙️ Listening... Speak now';
  };

  recognition.onresult = e => {
    const transcript = Array.from(e.results)
      .map(r => r[0].transcript).join('');
    searchInput.value = transcript;
    voiceStatus.textContent = `"${transcript}"`;
    parseVoiceCommand(transcript.toLowerCase());
  };

  recognition.onerror = () => {
    voiceStatus.textContent = '❌ Could not hear. Please try again.';
    setTimeout(() => voiceStatus.textContent = '', 2500);
  };

  recognition.onend = () => {
    isListening = false;
    voiceBtn.classList.remove('listening');
    document.getElementById('voiceIcon').className = 'fas fa-microphone';
    setTimeout(() => {
      if (voiceStatus.textContent.startsWith('"')) voiceStatus.textContent = '';
    }, 3000);
    applyFilters();
  };
}

function parseVoiceCommand(text) {
  const genreMap = { action:'Action', comedy:'Comedy', horror:'Horror', thriller:'Thriller', romance:'Romance', 'sci-fi':'Sci-Fi', science:'Sci-Fi' };
  const langMap = { tamil:'Tamil', english:'English', hindi:'Hindi' };

  for (const [key, val] of Object.entries(genreMap)) {
    if (text.includes(key)) {
      document.getElementById('genreFilter').value = val;
      break;
    }
  }
  for (const [key, val] of Object.entries(langMap)) {
    if (text.includes(key)) {
      document.getElementById('langFilter').value = val;
      break;
    }
  }
}

// =============================================
// BOOKING / SEAT MAP
// =============================================
const ROWS = ['A','B','C','D','E','F','G','H'];
const SEATS_PER_ROW = 12;
const SEAT_PRICE = 350;

function initBooking() {
  // Pre-book some random seats
  const preBooked = ['A3','B5','B6','C8','D2','D3','E7','F4','F11','G6','G7','H10'];
  preBooked.forEach(s => state.bookedSeats.add(s));

  renderSeatMap();
  updateBookingMovieChips();

  // Time chips
  document.querySelectorAll('.time-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.time-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      resetSeats();
    });
  });
}

function updateBookingMovieChips() {
  const chips = document.getElementById('movieChips');
  chips.innerHTML = MOVIES.slice(0,6).map(m => `
    <button class="movie-chip ${m.id === state.selectedMovie.id ? 'active' : ''}"
      onclick="selectMovieChip(${m.id})">${m.title}</button>
  `).join('');
}

function selectMovieChip(id) {
  state.selectedMovie = MOVIES.find(m => m.id === id);
  updateBookingMovieChips();
  resetSeats();
}

function resetSeats() {
  state.selectedSeats.clear();
  renderSeatMap();
  updateBookingSummary();
}

function renderSeatMap() {
  const map = document.getElementById('seatMap');
  map.innerHTML = ROWS.map(row => `
    <div class="seat-row">
      <span class="seat-row-label">${row}</span>
      ${Array.from({length: SEATS_PER_ROW}, (_, i) => {
        const num = i + 1;
        const seatId = `${row}${num}`;
        const isBooked = state.bookedSeats.has(seatId);
        const isSelected = state.selectedSeats.has(seatId);
        const cls = isBooked ? 'booked' : isSelected ? 'selected' : 'available';
        const aisle = (i === 3 || i === 8) ? '<div class="seat-aisle"></div>' : '';
        return `${aisle}<div class="seat ${cls}" data-seat="${seatId}" onclick="toggleSeat('${seatId}')" title="${seatId}"></div>`;
      }).join('')}
      <span class="seat-row-label">${row}</span>
    </div>
  `).join('');
}

function toggleSeat(seatId) {
  if (state.bookedSeats.has(seatId)) return;

  if (state.selectedSeats.has(seatId)) {
    state.selectedSeats.delete(seatId);
  } else {
    state.selectedSeats.add(seatId);
  }
  renderSeatMap();
  updateBookingSummary();
}

function updateBookingSummary() {
  const seats = Array.from(state.selectedSeats);
  const count = seats.length;
  const total = count * SEAT_PRICE;

  document.getElementById('selectedSeatsDisplay').textContent = count > 0 ? seats.join(', ') : 'None';
  document.getElementById('seatCount').textContent = count;
  document.getElementById('seatTotal').textContent = `₹${total}`;

  // Update snacks cart with seat total
  document.getElementById('cartSeatsTotal').textContent = `₹${total}`;
  updateGrandTotal();
}

// =============================================
// SNACKS
// =============================================
function initSnacks() {
  renderSnackCategory('popcornGrid', SNACKS.popcorn);
  renderSnackCategory('drinksGrid', SNACKS.drinks);
  renderSnackCategory('bitesGrid', SNACKS.bites);
  updateCart();
}

function renderSnackCategory(gridId, items) {
  document.getElementById(gridId).innerHTML = items.map(item => `
    <div class="snack-card" id="sc-${item.id}">
      <div class="snack-emoji">${item.emoji}</div>
      <div class="snack-name">${item.name}</div>
      <div class="snack-desc">${item.desc}</div>
      <div class="snack-price">₹${item.price}</div>
      <div class="snack-qty">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1, ${item.price})">−</button>
        <span class="qty-num" id="qty-${item.id}">0</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1, ${item.price})">+</button>
      </div>
    </div>
  `).join('');
}

function changeQty(id, delta, price) {
  const allItems = [...SNACKS.popcorn, ...SNACKS.drinks, ...SNACKS.bites];
  const item = allItems.find(i => i.id === id);
  if (!item) return;

  const current = state.cart[id]?.qty || 0;
  const newQty = Math.max(0, current + delta);

  if (newQty === 0) {
    delete state.cart[id];
  } else {
    state.cart[id] = { ...item, qty: newQty };
  }

  document.getElementById(`qty-${id}`).textContent = newQty;
  const card = document.getElementById(`sc-${id}`);
  card.classList.toggle('selected', newQty > 0);

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const items = Object.values(state.cart);

  if (items.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = items.map(item => `
      <div class="cart-item">
        <div>
          <div class="ci-name">${item.emoji} ${item.name}</div>
          <div class="ci-detail">₹${item.price} × ${item.qty}</div>
        </div>
        <div class="ci-price">₹${item.price * item.qty}</div>
      </div>
    `).join('');
  }

  const snacksTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  document.getElementById('snacksTotal').textContent = `₹${snacksTotal}`;
  updateGrandTotal();
}

function updateGrandTotal() {
  const items = Object.values(state.cart);
  const snacksTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const seatsTotal = state.selectedSeats.size * SEAT_PRICE;
  const grand = snacksTotal + seatsTotal;
  document.getElementById('grandTotal').textContent = `₹${grand}`;
  document.getElementById('cartSeatsTotal').textContent = `₹${seatsTotal}`;
  return grand;
}

function confirmBooking() {
  if (state.selectedSeats.size === 0) {
    showToast('<i class="fas fa-exclamation-circle"></i> Please select at least one seat first!', 'error');
    return;
  }

  const grandTotal = updateGrandTotal();
  const seats = Array.from(state.selectedSeats);
  const pointsEarned = Math.floor(grandTotal / 10);

  // Create booking record
  const booking = {
    id: Date.now(),
    movie: state.selectedMovie.title,
    seats: seats.join(', '),
    seatCount: seats.length,
    total: grandTotal,
    pointsEarned,
    date: new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
    time: document.querySelector('.time-chip.active')?.textContent || '7:00 PM',
    snackCount: Object.keys(state.cart).length
  };

  state.bookings.unshift(booking);
  state.activeBooking = booking;
  state.progressStep = 0;

  // Update points
  state.totalPoints += pointsEarned;
  state.totalEarned += pointsEarned;
  document.getElementById('navPoints').textContent = state.totalPoints.toLocaleString();

  // Mark seats as booked
  seats.forEach(s => state.bookedSeats.add(s));
  state.selectedSeats.clear();
  state.cart = {};

  // Reset UI
  renderSeatMap();
  updateBookingSummary();
  initSnacks();

  showToast(`<i class="fas fa-check-circle"></i> Booking confirmed! +${pointsEarned} pts earned`, 'success');

  setTimeout(() => {
    navigateTo('dashboard');
    updateDashboard();
  }, 1500);
}

// =============================================
// DASHBOARD
// =============================================
function initDashboard() {
  updateDashboard();
}

function animateDashboard() {
  updateDashboard();

  // Animate points arc
  setTimeout(() => {
    const pct = Math.min(state.totalPoints / 5000, 1);
    const circumference = 339.3;
    const offset = circumference * (1 - pct);
    const arc = document.getElementById('pointsArc');
    if (arc) arc.style.strokeDashoffset = offset;

    const tierFill = document.getElementById('tierFill');
    if (tierFill) tierFill.style.width = `${pct * 100}%`;
    const tierPct = document.getElementById('tierPct');
    if (tierPct) tierPct.textContent = `${Math.round(pct * 100)}%`;
  }, 200);
}

function updateDashboard() {
  // Points
  document.getElementById('pointsDisplay').textContent = state.totalPoints.toLocaleString();
  document.getElementById('navPoints').textContent = state.totalPoints.toLocaleString();
  document.getElementById('totalEarned').textContent = state.totalEarned.toLocaleString() + ' pts';
  document.getElementById('redeemed').textContent = state.redeemed + ' pts';

  // Stats
  document.getElementById('totalBookings').textContent = state.bookings.length;
  document.getElementById('totalMovies').textContent = state.bookings.length;
  const spent = state.bookings.reduce((s, b) => s + b.total, 0);
  document.getElementById('totalSpent').textContent = `₹${spent.toLocaleString()}`;

  // Active booking detail
  const detailCard = document.getElementById('bookingDetailCard');
  if (state.activeBooking) {
    const b = state.activeBooking;
    detailCard.innerHTML = `
      <div class="booking-detail-row"><span>Movie</span><span>${b.movie}</span></div>
      <div class="booking-detail-row"><span>Seats</span><span style="color:var(--gold)">${b.seats}</span></div>
      <div class="booking-detail-row"><span>Show Time</span><span>${b.time}</span></div>
      <div class="booking-detail-row"><span>Date</span><span>${b.date}</span></div>
      <div class="booking-detail-row"><span>Total Paid</span><span style="color:var(--gold)">₹${b.total}</span></div>
    `;
  }

  // Booking history
  renderHistory();

  // Progress step
  updateProgressUI();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  if (state.bookings.length === 0) {
    list.innerHTML = '<p class="no-history">No bookings yet. Your history will appear here.</p>';
    return;
  }
  list.innerHTML = state.bookings.map(b => `
    <div class="history-item">
      <div class="hi-icon"><i class="fas fa-film"></i></div>
      <div class="hi-info">
        <div class="hi-title">${b.movie}</div>
        <div class="hi-meta">${b.seats} &nbsp;•&nbsp; ${b.time} &nbsp;•&nbsp; ${b.date}</div>
      </div>
      <div>
        <div class="hi-amount">₹${b.total}</div>
        <div class="hi-pts">+${b.pointsEarned} pts</div>
      </div>
    </div>
  `).join('');
}

function updateProgressUI() {
  const steps = document.querySelectorAll('.prog-step');
  const fill = document.getElementById('progressFill');
  const pct = [0, 33, 66, 100];

  steps.forEach((step, i) => {
    step.classList.toggle('active', i <= state.progressStep);
  });

  if (fill) fill.style.width = `${pct[state.progressStep]}%`;
}

function simulateProgress() {
  if (!state.activeBooking) {
    showToast('<i class="fas fa-info-circle"></i> Book a movie first to simulate progress!', 'gold-toast');
    return;
  }

  const labels = ['Booking Confirmed ✓', 'Show is Starting! 🎬', 'Interval Time ☕', 'Movie Completed! 🎉'];
  state.progressStep = (state.progressStep + 1) % 4;
  updateProgressUI();
  showToast(`<i class="fas fa-circle-notch"></i> ${labels[state.progressStep]}`, 'gold-toast');
}

// =============================================
// TOAST NOTIFICATION
// =============================================
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.innerHTML = message;
  toast.className = `toast show ${type}`;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// =============================================
// MISC / SVG GRADIENT
// =============================================

// Inject SVG gradient def for points arc
(function injectSVGDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = 'position:absolute;width:0;height:0;';
  svg.innerHTML = `
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#A8891F"/>
        <stop offset="100%" style="stop-color:#F0D060"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svg);
})();
