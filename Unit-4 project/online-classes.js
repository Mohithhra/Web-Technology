// ===== IRONFORGE — ONLINE CLASSES PAGE =====
// EmailJS: service_npqaynf | Public Key: U0WK_FRywf7YWmp79

// ── DATA ──

const OC_TRAINERS = [
  { id: 1, name: 'Arjun Sharma',  role: 'Strength & Conditioning', exp: '8 Years · NSCA-CSCS',    emoji: '💪', cats: ['Strength', 'HIIT'],       sessions: 42 },
  { id: 2, name: 'Priya Nair',    role: 'Yoga & Wellness Coach',   exp: '6 Years · RYT-500',       emoji: '🧘', cats: ['Yoga', 'Mobility'],       sessions: 38 },
  { id: 3, name: 'Rahul Verma',   role: 'Boxing & MMA Coach',      exp: '10 Years · State Champ',  emoji: '🥊', cats: ['Boxing', 'HIIT'],         sessions: 30 },
  { id: 4, name: 'Sneha Kapoor',  role: 'Nutrition & Diet Expert', exp: '5 Years · Registered RD', emoji: '🥗', cats: ['Nutrition'],               sessions: 24 },
  { id: 5, name: 'Vikram Singh',  role: 'HIIT & Metabolic',        exp: '7 Years · ACE Certified', emoji: '⚡', cats: ['HIIT', 'Strength'],       sessions: 55 },
  { id: 6, name: 'Meera Iyer',    role: 'Functional & Mobility',   exp: '9 Years · NASM Certified',emoji: '🤸', cats: ['Mobility', 'Strength'],   sessions: 48 },
];

const OC_SCHEDULE = [
  // Monday
  { day:0, time:'6:00 AM',  name:'Morning HIIT Blast',       cat:'hiit',      trainer:'Vikram Singh',  duration:45, level:'Intermediate', spots:15, emoji:'⚡', live:false },
  { day:0, time:'8:30 AM',  name:'Sun Salutation Flow',      cat:'yoga',      trainer:'Priya Nair',    duration:60, level:'Beginner',      spots:20, emoji:'🧘', live:false },
  { day:0, time:'6:00 PM',  name:'Power Strength Session',   cat:'strength',  trainer:'Arjun Sharma',  duration:60, level:'Advanced',      spots:12, emoji:'🏋️', live:false },
  { day:0, time:'8:00 PM',  name:'Nutrition Masterclass',    cat:'nutrition', trainer:'Sneha Kapoor',  duration:45, level:'All Levels',    spots:30, emoji:'🥗', live:false },

  // Tuesday
  { day:1, time:'6:30 AM',  name:'Boxing Fundamentals',      cat:'boxing',    trainer:'Rahul Verma',   duration:50, level:'Beginner',      spots:18, emoji:'🥊', live:false },
  { day:1, time:'7:30 AM',  name:'Mobility & Stretch',       cat:'mobility',  trainer:'Meera Iyer',    duration:45, level:'All Levels',    spots:25, emoji:'🤸', live:false },
  { day:1, time:'6:00 PM',  name:'Tabata Cardio Inferno',    cat:'hiit',      trainer:'Vikram Singh',  duration:30, level:'Advanced',      spots:15, emoji:'🔥', live:false },
  { day:1, time:'7:30 PM',  name:'Yin Yoga & Recovery',      cat:'yoga',      trainer:'Priya Nair',    duration:60, level:'Beginner',      spots:20, emoji:'🌙', live:false },

  // Wednesday
  { day:2, time:'6:00 AM',  name:'Full Body HIIT',           cat:'hiit',      trainer:'Vikram Singh',  duration:45, level:'Intermediate', spots:15, emoji:'⚡', live:true  },
  { day:2, time:'9:00 AM',  name:'Functional Movement',      cat:'mobility',  trainer:'Meera Iyer',    duration:55, level:'All Levels',    spots:20, emoji:'🤸', live:false },
  { day:2, time:'5:30 PM',  name:'Advanced Boxing Drills',   cat:'boxing',    trainer:'Rahul Verma',   duration:60, level:'Advanced',      spots:12, emoji:'🥊', live:false },
  { day:2, time:'7:00 PM',  name:'Meal Planning Workshop',   cat:'nutrition', trainer:'Sneha Kapoor',  duration:45, level:'All Levels',    spots:30, emoji:'🥗', live:true  },

  // Thursday
  { day:3, time:'6:30 AM',  name:'Core & Strength',          cat:'strength',  trainer:'Arjun Sharma',  duration:50, level:'Intermediate', spots:15, emoji:'💪', live:false },
  { day:3, time:'8:00 AM',  name:'Power Yoga Flow',          cat:'yoga',      trainer:'Priya Nair',    duration:60, level:'Intermediate', spots:18, emoji:'🧘', live:false },
  { day:3, time:'6:00 PM',  name:'HIIT & Core Blast',        cat:'hiit',      trainer:'Vikram Singh',  duration:45, level:'Intermediate', spots:15, emoji:'⚡', live:false },
  { day:3, time:'8:00 PM',  name:'Hip Mobility Deep Dive',   cat:'mobility',  trainer:'Meera Iyer',    duration:45, level:'Beginner',      spots:22, emoji:'🤸', live:false },

  // Friday
  { day:4, time:'6:00 AM',  name:'Sparring Simulation',      cat:'boxing',    trainer:'Rahul Verma',   duration:55, level:'Advanced',      spots:10, emoji:'🥊', live:false },
  { day:4, time:'7:30 AM',  name:'Rise & Shine Yoga',        cat:'yoga',      trainer:'Priya Nair',    duration:45, level:'Beginner',      spots:25, emoji:'🌅', live:false },
  { day:4, time:'5:00 PM',  name:'Friday Strength Finisher', cat:'strength',  trainer:'Arjun Sharma',  duration:60, level:'Advanced',      spots:12, emoji:'🏋️', live:false },
  { day:4, time:'7:00 PM',  name:'Calorie Counting Live',    cat:'nutrition', trainer:'Sneha Kapoor',  duration:40, level:'All Levels',    spots:30, emoji:'📊', live:false },

  // Saturday
  { day:5, time:'7:00 AM',  name:'Weekend HIIT Warrior',     cat:'hiit',      trainer:'Vikram Singh',  duration:60, level:'All Levels',    spots:20, emoji:'🔥', live:true  },
  { day:5, time:'9:00 AM',  name:'Full Body Mobility',       cat:'mobility',  trainer:'Meera Iyer',    duration:60, level:'All Levels',    spots:25, emoji:'🤸', live:false },
  { day:5, time:'11:00 AM', name:'Boxing Cardio Blast',      cat:'boxing',    trainer:'Rahul Verma',   duration:50, level:'Intermediate', spots:15, emoji:'🥊', live:false },
  { day:5, time:'4:00 PM',  name:'Restorative Yoga',         cat:'yoga',      trainer:'Priya Nair',    duration:75, level:'Beginner',      spots:20, emoji:'🌿', live:false },

  // Sunday
  { day:6, time:'8:00 AM',  name:'Sunday Strength & Soul',   cat:'strength',  trainer:'Arjun Sharma',  duration:60, level:'All Levels',    spots:15, emoji:'🏋️', live:false },
  { day:6, time:'10:00 AM', name:'Deep Stretch & Breathwork',cat:'mobility',  trainer:'Meera Iyer',    duration:60, level:'Beginner',      spots:25, emoji:'💨', live:false },
  { day:6, time:'12:00 PM', name:'Nutrition Q&A Session',    cat:'nutrition', trainer:'Sneha Kapoor',  duration:60, level:'All Levels',    spots:50, emoji:'❓', live:false },
];

const OC_DEMAND = [
  { id:'d1',  name:'20-Min HIIT Burn',         cat:'hiit',      trainer:'Vikram Singh',  duration:'20 min', level:'Intermediate', emoji:'⚡' },
  { id:'d2',  name:'Morning Yoga Flow',         cat:'yoga',      trainer:'Priya Nair',    duration:'30 min', level:'Beginner',      emoji:'🌅' },
  { id:'d3',  name:'Deadlift Masterclass',      cat:'strength',  trainer:'Arjun Sharma',  duration:'45 min', level:'Advanced',      emoji:'🏋️' },
  { id:'d4',  name:'Boxing Basics Vol.1',       cat:'boxing',    trainer:'Rahul Verma',   duration:'35 min', level:'Beginner',      emoji:'🥊' },
  { id:'d5',  name:'Macros Explained',          cat:'nutrition', trainer:'Sneha Kapoor',  duration:'25 min', level:'All Levels',    emoji:'🥗' },
  { id:'d6',  name:'Full Body Mobility Reset',  cat:'mobility',  trainer:'Meera Iyer',    duration:'40 min', level:'Beginner',      emoji:'🤸' },
  { id:'d7',  name:'Tabata 30-Day Challenge',   cat:'hiit',      trainer:'Vikram Singh',  duration:'30 min', level:'Advanced',      emoji:'🔥' },
  { id:'d8',  name:'Yin Yoga for Recovery',     cat:'yoga',      trainer:'Priya Nair',    duration:'55 min', level:'Beginner',      emoji:'🌙' },
  { id:'d9',  name:'Shoulder & Back Strength',  cat:'strength',  trainer:'Arjun Sharma',  duration:'40 min', level:'Intermediate', emoji:'💪' },
  { id:'d10', name:'Shadow Boxing Cardio',      cat:'boxing',    trainer:'Rahul Verma',   duration:'20 min', level:'Intermediate', emoji:'👊' },
  { id:'d11', name:'Gut Health Guide',          cat:'nutrition', trainer:'Sneha Kapoor',  duration:'30 min', level:'All Levels',    emoji:'🌿' },
  { id:'d12', name:'Hip Flexor Deep Dive',      cat:'mobility',  trainer:'Meera Iyer',    duration:'25 min', level:'All Levels',    emoji:'🦵' },
];

// ── BOOKED SET ──
const ocBooked = new Set(JSON.parse(localStorage.getItem('oc_booked') || '[]'));

// ── STATE ──
let ocActiveDay   = new Date().getDay() === 0 ? 0 : new Date().getDay() - 1; // Mon=0
let ocActiveCat   = 'all';
let ocCurrentClass = null;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderSchedule();
  renderDemand();
  renderTrainers();
  initReveal();
  initNavScroll();
  initCategoryFilter();
  initDayTabs();

  // Close modals on overlay click
  document.getElementById('ocModal').addEventListener('click', e => { if (e.target.id === 'ocModal') closeBookingModal(); });
  document.getElementById('ocVideoModal').addEventListener('click', e => { if (e.target.id === 'ocVideoModal') closeVideoModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeBookingModal(); closeVideoModal(); } });
});

// ── NAVBAR ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
function initNavScroll() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── REVEAL ──
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── CATEGORY FILTER ──
function initCategoryFilter() {
  document.querySelectorAll('.oc-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.oc-cat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ocActiveCat = btn.dataset.cat;
      renderSchedule();
      filterDemand();
      if (ocActiveCat !== 'all') {
        document.getElementById('ocDemandCat').value = ocActiveCat;
      } else {
        document.getElementById('ocDemandCat').value = 'all';
      }
    });
  });
}

// ── DAY TABS ──
function initDayTabs() {
  document.querySelectorAll('.oc-day-tab').forEach(tab => {
    if (parseInt(tab.dataset.day) === ocActiveDay) tab.classList.add('active');
    tab.addEventListener('click', () => {
      document.querySelectorAll('.oc-day-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      ocActiveDay = parseInt(tab.dataset.day);
      renderSchedule();
    });
  });
}

// ── RENDER SCHEDULE ──
function renderSchedule() {
  const grid = document.getElementById('ocScheduleGrid');
  let classes = OC_SCHEDULE.filter(c => c.day === ocActiveDay);
  if (ocActiveCat !== 'all') classes = classes.filter(c => c.cat === ocActiveCat);

  if (!classes.length) {
    grid.innerHTML = `<div class="oc-no-classes">😴 No ${ocActiveCat === 'all' ? '' : ocActiveCat.toUpperCase() + ' '}classes scheduled for this day.<br><span style="font-size:0.75rem;color:#333">Try a different day or category.</span></div>`;
    return;
  }

  grid.innerHTML = classes.map((c, i) => {
    const key = `${c.day}-${i}-${c.name}`;
    const isBooked = ocBooked.has(key);
    return `
    <div class="oc-class-card${c.live ? ' live-now' : ''}" data-cat="${c.cat}">
      <div class="oc-card-top">
        <span class="oc-card-emoji">${c.emoji}</span>
        <div class="oc-card-badges">
          ${c.live ? '<span class="oc-badge oc-badge-live">🔴 Live Now</span>' : ''}
          <span class="oc-badge oc-badge-level">${c.level}</span>
          ${c.cat === 'nutrition' ? '<span class="oc-badge oc-badge-free">FREE</span>' : ''}
        </div>
      </div>
      <div class="oc-class-name">${c.name}</div>
      <div class="oc-class-trainer">👤 ${c.trainer}</div>
      <div class="oc-class-meta">
        <div class="oc-meta-item">⏱ <span>${c.duration} min</span></div>
        <div class="oc-meta-item">🕐 <span>${c.time}</span></div>
        <div class="oc-meta-item">👥 <span>${isBooked ? '✅ Booked' : c.spots + ' spots'}</span></div>
      </div>
      <div class="oc-card-footer">
        <button class="oc-btn-book${isBooked ? ' booked' : ''}" onclick="openBookingModal(${JSON.stringify(c).replace(/"/g,"'")},'${key}')" ${isBooked ? 'disabled' : ''}>
          ${isBooked ? '✅ Booked' : c.live ? '🔴 Join Live' : '📅 Book Slot'}
        </button>
        <button class="oc-btn-remind" onclick="setReminder('${c.name}','${c.time}')">🔔</button>
      </div>
    </div>`;
  }).join('');
}

// ── RENDER DEMAND ──
function renderDemand(list) {
  const grid = document.getElementById('ocDemandGrid');
  const items = list || OC_DEMAND;
  if (!items.length) {
    grid.innerHTML = `<div class="oc-no-classes" style="grid-column:1/-1">No classes found. Try a different search.</div>`;
    return;
  }
  grid.innerHTML = items.map(v => `
    <div class="oc-demand-card" onclick="openVideoModal('${v.id}')">
      <div class="oc-demand-thumb" data-cat="${v.cat}">
        <span>${v.emoji}</span>
        <div class="oc-play-btn">▶</div>
        <span class="oc-duration-badge">${v.duration}</span>
      </div>
      <div class="oc-demand-info">
        <div class="oc-demand-name">${v.name}</div>
        <div class="oc-demand-trainer">👤 ${v.trainer}</div>
        <div class="oc-demand-tags">
          <span class="oc-demand-tag">${v.cat.toUpperCase()}</span>
          <span class="oc-demand-tag">${v.level}</span>
          <span class="oc-demand-tag">${v.duration}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterDemand() {
  const q   = document.getElementById('ocSearch').value.trim().toLowerCase();
  const cat = document.getElementById('ocDemandCat').value;
  const lvl = document.getElementById('ocDemandLevel').value;
  let list = OC_DEMAND.filter(v => {
    if (cat !== 'all' && v.cat !== cat) return false;
    if (lvl !== 'all' && v.level !== lvl) return false;
    if (q && !v.name.toLowerCase().includes(q) && !v.trainer.toLowerCase().includes(q)) return false;
    return true;
  });
  renderDemand(list);
}

// ── RENDER TRAINERS ──
function renderTrainers() {
  document.getElementById('ocTrainersGrid').innerHTML = OC_TRAINERS.map(t => `
    <div class="oc-trainer-card">
      <div class="oc-trainer-avatar">${t.emoji}</div>
      <div class="oc-trainer-name">${t.name}</div>
      <div class="oc-trainer-role">${t.role}</div>
      <div class="oc-trainer-exp">⭐ ${t.exp}</div>
      <div class="oc-trainer-classes">
        ${t.cats.map(c => `<span class="oc-trainer-class-tag">${c}</span>`).join('')}
      </div>
      <div class="oc-trainer-sessions">📹 ${t.sessions} online sessions conducted</div>
      <button class="oc-btn-view-trainer" onclick="viewTrainerClasses(${t.id})">View Classes →</button>
    </div>
  `).join('');
}

// ── BOOKING MODAL ──
function openBookingModal(cls, key) {
  ocCurrentClass = { ...cls, key };
  const day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][cls.day];
  document.getElementById('ocModalContent').innerHTML = `
    <div class="oc-bm-header">
      <h3>${cls.emoji} ${cls.name}</h3>
      <p class="oc-bm-meta">
        <span>${day} · ${cls.time}</span> · ${cls.duration} min · ${cls.level} · Trainer: <span>${cls.trainer}</span>
      </p>
    </div>
    <div class="oc-bm-body">
      <div class="oc-bm-info">
        🔗 <strong>How it works:</strong> Fill in your details below and click Book. You'll receive a <strong>Zoom link</strong> directly to your email before the class starts.
      </div>
      <div class="oc-bm-error" id="ocBmError"></div>
      <div class="oc-bm-group">
        <label>Your Name *</label>
        <input class="oc-bm-input" id="ocBmName" type="text" placeholder="Rajesh Kumar">
      </div>
      <div class="oc-bm-group">
        <label>Email Address *</label>
        <input class="oc-bm-input" id="ocBmEmail" type="email" placeholder="rajesh@example.com">
      </div>
      <div class="oc-bm-group">
        <label>Phone Number</label>
        <input class="oc-bm-input" id="ocBmPhone" type="tel" placeholder="+91 98765 43210">
      </div>
      <button class="oc-bm-btn" id="ocBmBtn" onclick="confirmBooking()">📅 Book This Class</button>
    </div>
  `;
  document.getElementById('ocModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  document.getElementById('ocModal').classList.remove('open');
  document.body.style.overflow = '';
}

function confirmBooking() {
  const name  = document.getElementById('ocBmName')?.value.trim();
  const email = document.getElementById('ocBmEmail')?.value.trim();
  const phone = document.getElementById('ocBmPhone')?.value.trim();
  const errEl = document.getElementById('ocBmError');
  const btn   = document.getElementById('ocBmBtn');

  const showErr = msg => { errEl.textContent = msg; errEl.style.display = 'block'; setTimeout(() => errEl.style.display = 'none', 4000); };
  if (!name)  return showErr('Please enter your name.');
  if (!email) return showErr('Please enter your email address.');
  if (!/\S+@\S+\.\S+/.test(email)) return showErr('Please enter a valid email.');

  btn.textContent = '⏳ Booking…'; btn.disabled = true;

  const cls = ocCurrentClass;
  const day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][cls.day];
  const zoomLink = 'https://zoom.us/j/ironforge' + Math.floor(Math.random() * 9000 + 1000);

  const params = {
    to_email:    email,
    to_name:     name,
    class_name:  cls.name,
    trainer:     cls.trainer,
    day:         day,
    time:        cls.time,
    duration:    cls.duration + ' minutes',
    level:       cls.level,
    zoom_link:   zoomLink,
    phone:       phone || 'Not provided',
  };

  if (typeof emailjs !== 'undefined') {
    emailjs.send('service_npqaynf', 'template_online_class', params, 'U0WK_FRywf7YWmp79')
      .then(() => showBookingSuccess(name, email, zoomLink))
      .catch(() => showBookingSuccess(name, email, zoomLink)); // show success anyway (demo)
  } else {
    setTimeout(() => showBookingSuccess(name, email, zoomLink), 1500);
  }

  // Save to localStorage
  ocBooked.add(cls.key);
  localStorage.setItem('oc_booked', JSON.stringify([...ocBooked]));
  renderSchedule();
}

function showBookingSuccess(name, email, zoomLink) {
  const cls = ocCurrentClass;
  const day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][cls.day];
  document.getElementById('ocModalContent').innerHTML = `
    <div class="oc-bm-success">
      <span class="icon">🎉</span>
      <h3>Class Booked!</h3>
      <p>
        Hey <strong>${name}</strong>! Your slot for <strong>${cls.name}</strong> on <strong>${day} at ${cls.time}</strong> is confirmed.<br><br>
        A Zoom link has been sent to <strong>${email}</strong>. Check your inbox before class time!<br><br>
        <span style="color:#555;font-size:0.74rem;">Demo Zoom Link: <a href="${zoomLink}" style="color:#ff4500;" target="_blank">${zoomLink}</a></span>
      </p>
    </div>
  `;
  ocToast('✅ Class booked! Zoom link sent to ' + email);
}

// ── REMINDER ──
function setReminder(name, time) {
  ocToast('🔔 Reminder set for ' + name + ' at ' + time);
}

// ── VIDEO MODAL ──
function openVideoModal(id) {
  const v = OC_DEMAND.find(x => x.id === id);
  if (!v) return;
  document.getElementById('ocVideoHeader').innerHTML = `<h3>${v.emoji} ${v.name}</h3><p>${v.trainer} · ${v.level} · ${v.duration}</p>`;
  document.getElementById('ocVideoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  document.getElementById('ocVideoModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── VIEW TRAINER CLASSES ──
function viewTrainerClasses(trainerId) {
  const trainer = OC_TRAINERS.find(t => t.id === trainerId);
  if (!trainer) return;
  // Scroll to schedule, filter by trainer's first category
  const cat = trainer.cats[0].toLowerCase();
  document.querySelectorAll('.oc-cat').forEach(b => b.classList.remove('active'));
  const catBtn = document.querySelector(`.oc-cat[data-cat="${cat}"]`);
  if (catBtn) catBtn.classList.add('active');
  ocActiveCat = cat;
  renderSchedule();
  document.getElementById('live-schedule').scrollIntoView({ behavior: 'smooth', block: 'start' });
  ocToast('📅 Showing ' + trainer.name + "'s " + trainer.cats[0] + ' classes');
}

// ── TOAST ──
function ocToast(msg, type = 'success') {
  const t = document.getElementById('ocToast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3400);
}