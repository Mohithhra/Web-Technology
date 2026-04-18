// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

// ===== HAMBURGER =====
function toggleMenu() { document.getElementById('navLinks').classList.toggle('open'); }
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open')));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), i * 100); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== DAY TABS =====
const dayTabs = document.querySelectorAll('.day-tab');
const dayColumns = document.querySelectorAll('.day-column');

dayTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    dayTabs.forEach(t => t.classList.remove('active'));
    dayColumns.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const day = tab.getAttribute('data-day');
    const col = document.querySelector(`.day-column[data-day="${day}"]`);
    if (col) col.classList.add('active');
    applyFilter(currentFilter);
  });
});

// ===== FILTER =====
let currentFilter = 'all';
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    applyFilter(currentFilter);
  });
});

function applyFilter(filter) {
  const activeCol = document.querySelector('.day-column.active');
  if (!activeCol) return;
  activeCol.querySelectorAll('.class-card').forEach(card => {
    const type = card.getAttribute('data-type');
    const match = filter === 'all' || type === filter;
    card.classList.toggle('filtered-out', !match);
  });
}

// ===== AUTO SELECT TODAY'S DAY =====
const days = ['sun','mon','tue','wed','thu','fri','sat'];
const today = days[new Date().getDay()];
const todayTab = document.querySelector(`.day-tab[data-day="${today}"]`);
if (todayTab) {
  dayTabs.forEach(t => t.classList.remove('active'));
  dayColumns.forEach(c => c.classList.remove('active'));
  todayTab.classList.add('active');
  const todayCol = document.querySelector(`.day-column[data-day="${today}"]`);
  if (todayCol) todayCol.classList.add('active');
}

// ===== BOOKING SYSTEM =====
let currentClassName = '';
let bookings = JSON.parse(localStorage.getItem('ironforge_bookings') || '[]');

function bookClass(btn, className) {
  if (btn.classList.contains('booked')) return;
  currentClassName = className;
  document.getElementById('modalClassName').textContent = className;
  document.getElementById('modalClassDetail').textContent = className;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function confirmBooking() {
  const name  = document.getElementById('modalNameInput').value.trim();
  const email = document.getElementById('modalEmailInput').value.trim();
  if (!name || !email) { showToast('⚠️ Please fill in your name and email!', 'warn'); return; }

  // Mark button as booked
  document.querySelectorAll('.btn-book-class').forEach(btn => {
    const card = btn.closest('.class-card');
    const infoEl = card?.querySelector('.class-info h4');
    if (infoEl && infoEl.textContent === currentClassName) {
      btn.textContent = '✅ Booked';
      btn.classList.add('booked');
      btn.classList.remove('urgent');
    }
  });

  // Save booking — enriched with time, trainer, type for dashboard
  const activeCard   = [...document.querySelectorAll('.class-card')].find(c => c.querySelector('h4')?.textContent === currentClassName);
  const classTime    = activeCard?.querySelector('.class-time')?.textContent || '';
  const classInfo    = activeCard?.querySelector('.class-info p')?.textContent || '';
  const classTrainer = classInfo.split('·')[0]?.trim() || '';
  const classType    = activeCard?.dataset.type || 'strength';
  const activeDay    = document.querySelector('.day-tab.active')?.textContent || 'Today';
  const dayFull      = { MON:'Monday', TUE:'Tuesday', WED:'Wednesday', THU:'Thursday', FRI:'Friday', SAT:'Saturday', SUN:'Sunday' };

  const booking = {
    className: currentClassName,
    name,
    email,
    day: dayFull[activeDay.toUpperCase()] || activeDay,
    time: classTime,
    trainer: classTrainer,
    type: classType,
    source: 'gym',
    bookedAt: new Date().toISOString()
  };
  bookings.push(booking);
  localStorage.setItem('ironforge_bookings', JSON.stringify(bookings));

  closeModal();
  clearModal();
  renderBookings();
  showToast(`✅ Booked! See you at ${currentClassName}!`);
}

function clearModal() {
  document.getElementById('modalNameInput').value = '';
  document.getElementById('modalEmailInput').value = '';
  document.getElementById('modalNoteInput').value = '';
}

// ===== RENDER BOOKINGS =====
function renderBookings() {
  if (bookings.length === 0) { document.getElementById('bookingsSection').style.display = 'none'; return; }
  document.getElementById('bookingsSection').style.display = 'block';
  const list = document.getElementById('bookingsList');
  list.innerHTML = bookings.map((b, i) => `
    <div class="booking-item">
      <div class="booking-item-left">
        <h4>${b.className}</h4>
        <p>👤 ${b.name} · 📅 ${b.day}${b.time ? ' · ⏰ ' + b.time : ''}</p>
      </div>
      <button class="booking-cancel" onclick="cancelBooking(${i})">Cancel</button>
    </div>
  `).join('');
}

function cancelBooking(index) {
  const cancelled = bookings[index].className;
  bookings.splice(index, 1);
  localStorage.setItem('ironforge_bookings', JSON.stringify(bookings));

  // Unmark the booked button
  document.querySelectorAll('.btn-book-class.booked').forEach(btn => {
    const card = btn.closest('.class-card');
    const infoEl = card?.querySelector('.class-info h4');
    if (infoEl && infoEl.textContent === cancelled) {
      btn.textContent = 'Book';
      btn.classList.remove('booked');
    }
  });

  renderBookings();
  showToast(`❌ Booking cancelled for ${cancelled}`);
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ===== INIT =====
renderBookings();

// Restore booked buttons from localStorage on page load
bookings.forEach(b => {
  document.querySelectorAll('.btn-book-class').forEach(btn => {
    const card = btn.closest('.class-card');
    const infoEl = card?.querySelector('.class-info h4');
    if (infoEl && infoEl.textContent === b.className) {
      btn.textContent = '✅ Booked';
      btn.classList.add('booked');
      btn.classList.remove('urgent');
    }
  });
});
