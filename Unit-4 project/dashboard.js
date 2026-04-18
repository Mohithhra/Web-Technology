// ===== IRONFORGE DASHBOARD JS =====

// ── GREETING ──
function setGreeting() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting').innerHTML = `${greet}, <span id="userName">Warrior</span> 👊`;
  const member = JSON.parse(localStorage.getItem('ironforge_member') || '{}');
  const name = member.name ? member.name.split(' ')[0] : 'Warrior';
  document.getElementById('userName').textContent = name;
  // Set avatar initials
  const initial = name.charAt(0).toUpperCase();
  document.getElementById('topAvatar').textContent = initial;
  const mobileAv = document.getElementById('mobileAvatar');
  if (mobileAv) mobileAv.textContent = initial;
  // Date
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now = new Date();
  document.getElementById('dateDisplay').textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}
setGreeting();

// ── MOBILE SIDEBAR ──
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}
document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  animateCounter(el, parseInt(el.dataset.target));
});

// ── WEEKLY ACTIVITY CHART ──
const chartData = {
  workouts: [3, 5, 2, 4, 6, 3, 1],
  calories:  [840, 1340, 560, 1020, 1560, 780, 420]
};
const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const todayIdx  = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

function renderChart(type) {
  const data   = chartData[type];
  const max    = Math.max(...data) || 1;
  const bars   = document.getElementById('chartBars');
  const labels = document.getElementById('chartLabels');
  bars.innerHTML = data.map((val, i) => {
    const pct   = (val / max) * 100;
    const today = i === todayIdx;
    const col   = today
      ? 'linear-gradient(180deg,var(--primary),var(--primary-dark))'
      : 'linear-gradient(180deg,rgba(255,69,0,0.35),rgba(255,69,0,0.12))';
    const label = type === 'calories' ? `${val} kcal` : `${val} session${val!==1?'s':''}`;
    return `<div class="chart-bar-wrap"><div class="chart-bar" style="height:${pct}%;background:${col}" data-val="${label}"></div></div>`;
  }).join('');
  labels.innerHTML = dayNames.map((d,i) =>
    `<span class="chart-day ${i===todayIdx?'today':''}">${d}</span>`
  ).join('');
}
renderChart('workouts');

function switchChartTab(btn, type) {
  document.querySelectorAll('.wtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderChart(type);
}

// ── DYNAMIC CLASSES FROM BOOKINGS ──
function loadDashboardClasses() {
  const gymBookings      = JSON.parse(localStorage.getItem('ironforge_bookings') || '[]');
  const onlineBookedKeys = JSON.parse(localStorage.getItem('oc_booked') || '[]');

  // Stat cards
  const classCountEl  = document.getElementById('dashClassCount');
  const onlineCountEl = document.getElementById('dashOnlineCount');
  const classDeltaEl  = document.getElementById('dashClassDelta');
  const onlineDeltaEl = document.getElementById('dashOnlineDelta');

  if (classCountEl) {
    animateCounter(classCountEl, gymBookings.length, 800);
    if (classDeltaEl) {
      const n = gymBookings.length;
      classDeltaEl.innerHTML = n > 0
        ? `<span class="up">↑ ${n} gym class${n!==1?'es':''} booked</span>`
        : `<span style="color:#555">No gym classes yet</span>`;
    }
  }
  if (onlineCountEl) {
    animateCounter(onlineCountEl, onlineBookedKeys.length, 800);
    if (onlineDeltaEl) {
      const n = onlineBookedKeys.length;
      onlineDeltaEl.innerHTML = n > 0
        ? `<span class="up">↑ ${n} online class${n!==1?'es':''} booked</span>`
        : `<span style="color:#555">No online classes yet</span>`;
    }
  }

  // Upcoming classes list
  const listEl = document.getElementById('dashClassesList');
  if (!listEl) return;

  const typeMap = { strength:'strength', cardio:'cardio', wellness:'wellness', combat:'combat', hiit:'cardio', yoga:'wellness', boxing:'combat', mobility:'wellness', nutrition:'wellness' };

  const gymRows = gymBookings.slice(-6).reverse().map(b => {
    const cssType    = typeMap[b.type] || 'strength';
    const trainerTxt = b.trainer ? ` · ${b.trainer}` : '';
    const timeTxt    = b.time ? ` · ${b.time}` : '';
    return `
      <div class="class-item ${cssType}">
        <div class="class-dot"></div>
        <div class="class-info">
          <h4>${b.className}</h4>
          <p>${b.day}${timeTxt}${trainerTxt}</p>
        </div>
        <span class="class-status booked">🏋️ Gym</span>
      </div>`;
  });

  const OC_MAP = {
    '0':[ {name:'Morning HIIT Blast',time:'6:00 AM'},{name:'Sun Salutation Flow',time:'8:30 AM'},{name:'Power Strength Session',time:'6:00 PM'},{name:'Nutrition Masterclass',time:'8:00 PM'} ],
    '1':[ {name:'Boxing Fundamentals',time:'6:30 AM'},{name:'Mobility & Stretch',time:'7:30 AM'},{name:'Tabata Cardio Inferno',time:'6:00 PM'},{name:'Yin Yoga & Recovery',time:'7:30 PM'} ],
    '2':[ {name:'Full Body HIIT',time:'6:00 AM'},{name:'Functional Movement',time:'9:00 AM'},{name:'Advanced Boxing Drills',time:'5:30 PM'},{name:'Meal Planning Workshop',time:'7:00 PM'} ],
    '3':[ {name:'Core & Strength',time:'6:30 AM'},{name:'Power Yoga Flow',time:'8:00 AM'},{name:'HIIT & Core Blast',time:'6:00 PM'},{name:'Hip Mobility Deep Dive',time:'8:00 PM'} ],
    '4':[ {name:'Sparring Simulation',time:'6:00 AM'},{name:'Rise & Shine Yoga',time:'7:30 AM'},{name:'Friday Strength Finisher',time:'5:00 PM'},{name:'Calorie Counting Live',time:'7:00 PM'} ],
    '5':[ {name:'Weekend HIIT Warrior',time:'7:00 AM'},{name:'Full Body Mobility',time:'9:00 AM'},{name:'Boxing Cardio Blast',time:'11:00 AM'},{name:'Restorative Yoga',time:'4:00 PM'} ],
    '6':[ {name:'Sunday Strength & Soul',time:'8:00 AM'},{name:'Deep Stretch & Breathwork',time:'10:00 AM'},{name:'Nutrition Q&A Session',time:'12:00 PM'} ],
  };
  const FULL_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  const onlineRows = onlineBookedKeys.map(key => {
    const parts    = key.split('-');
    const dayIdx   = parts[0];
    const classIdx = parseInt(parts[1]);
    const cls      = OC_MAP[dayIdx]?.[classIdx];
    if (!cls) return '';
    return `
      <div class="class-item cardio">
        <div class="class-dot" style="background:#3b82f6"></div>
        <div class="class-info">
          <h4>${cls.name}</h4>
          <p>${FULL_DAYS[parseInt(dayIdx)] || ''} · ${cls.time}</p>
        </div>
        <span class="class-status booked" style="background:rgba(59,130,246,0.12);color:#60a5fa;border-color:rgba(59,130,246,0.3)">💻 Online</span>
      </div>`;
  }).filter(Boolean);

  const allRows = [...gymRows, ...onlineRows];

  if (!allRows.length) {
    listEl.innerHTML = `
      <div style="padding:1.8rem;text-align:center;">
        <div style="font-size:2rem;margin-bottom:0.6rem;">📅</div>
        <div style="color:#444;font-size:0.82rem;margin-bottom:1rem;">No classes booked yet.</div>
        <div style="display:flex;gap:0.6rem;justify-content:center;flex-wrap:wrap;">
          <a href="schedule.html" style="padding:0.5rem 1rem;background:rgba(255,69,0,0.1);border:1px solid rgba(255,69,0,0.25);border-radius:8px;color:#ff4500;text-decoration:none;font-size:0.74rem;font-weight:700;">🏋️ Book Gym Class</a>
          <a href="online-classes.html" style="padding:0.5rem 1rem;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.25);border-radius:8px;color:#60a5fa;text-decoration:none;font-size:0.74rem;font-weight:700;">💻 Book Online Class</a>
        </div>
      </div>`;
    return;
  }

  listEl.innerHTML = allRows.join('') + `
    <div style="padding:0.7rem 1.4rem;border-top:1px solid rgba(255,255,255,0.05);display:flex;gap:0.6rem;">
      <a href="schedule.html" style="flex:1;padding:0.45rem;text-align:center;background:rgba(255,69,0,0.08);border:1px solid rgba(255,69,0,0.2);border-radius:8px;color:#ff4500;text-decoration:none;font-size:0.68rem;font-weight:700;">+ Gym Class</a>
      <a href="online-classes.html" style="flex:1;padding:0.45rem;text-align:center;background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:8px;color:#60a5fa;text-decoration:none;font-size:0.68rem;font-weight:700;">+ Online Class</a>
    </div>`;
}
loadDashboardClasses();

// ── WEEKLY CLASS PROGRESS ──
function renderWeeklyClassProgress() {
  const container = document.getElementById('weeklyClassProgress');
  if (!container) return;

  const gymBookings      = JSON.parse(localStorage.getItem('ironforge_bookings') || '[]');
  const onlineBookedKeys = JSON.parse(localStorage.getItem('oc_booked') || '[]');

  const DAY_NAMES  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const FULL_DAYS  = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const jsDayToday = new Date().getDay();
  const todayIdx2  = jsDayToday === 0 ? 6 : jsDayToday - 1;

  const dayMap = {};
  for (let i = 0; i < 7; i++) dayMap[i] = { gym:[], online:[] };

  gymBookings.forEach(b => {
    const idx = FULL_DAYS.findIndex(d => d === b.day);
    if (idx !== -1) dayMap[idx].gym.push({ name: b.className, time: b.time || '' });
  });

  const OC_ONLINE_MAP = {
    0: [{name:'Morning HIIT Blast',time:'6:00 AM'},{name:'Sun Salutation Flow',time:'8:30 AM'},{name:'Power Strength Session',time:'6:00 PM'},{name:'Nutrition Masterclass',time:'8:00 PM'}],
    1: [{name:'Boxing Fundamentals',time:'6:30 AM'},{name:'Mobility & Stretch',time:'7:30 AM'},{name:'Tabata Cardio Inferno',time:'6:00 PM'},{name:'Yin Yoga & Recovery',time:'7:30 PM'}],
    2: [{name:'Full Body HIIT',time:'6:00 AM'},{name:'Functional Movement',time:'9:00 AM'},{name:'Advanced Boxing Drills',time:'5:30 PM'},{name:'Meal Planning Workshop',time:'7:00 PM'}],
    3: [{name:'Core & Strength',time:'6:30 AM'},{name:'Power Yoga Flow',time:'8:00 AM'},{name:'HIIT & Core Blast',time:'6:00 PM'},{name:'Hip Mobility Deep Dive',time:'8:00 PM'}],
    4: [{name:'Sparring Simulation',time:'6:00 AM'},{name:'Rise & Shine Yoga',time:'7:30 AM'},{name:'Friday Strength Finisher',time:'5:00 PM'},{name:'Calorie Counting Live',time:'7:00 PM'}],
    5: [{name:'Weekend HIIT Warrior',time:'7:00 AM'},{name:'Full Body Mobility',time:'9:00 AM'},{name:'Boxing Cardio Blast',time:'11:00 AM'},{name:'Restorative Yoga',time:'4:00 PM'}],
    6: [{name:'Sunday Strength & Soul',time:'8:00 AM'},{name:'Deep Stretch & Breathwork',time:'10:00 AM'},{name:'Nutrition Q&A Session',time:'12:00 PM'}],
  };

  onlineBookedKeys.forEach(key => {
    const parts   = key.split('-');
    const dayIdx  = parseInt(parts[0]);
    const classIdx = parseInt(parts[1]);
    if (!isNaN(dayIdx) && OC_ONLINE_MAP[dayIdx]) {
      const cls = OC_ONLINE_MAP[dayIdx][classIdx];
      if (cls) dayMap[dayIdx].online.push({ name: cls.name, time: cls.time });
    }
  });

  const totalClassDays = Object.values(dayMap).filter(d => d.gym.length + d.online.length > 0).length;
  const doneDays       = Object.entries(dayMap).filter(([i,d]) => parseInt(i) < todayIdx2 && (d.gym.length + d.online.length) > 0).length;
  const todayClasses   = dayMap[todayIdx2];
  const hasTodayClass  = todayClasses.gym.length + todayClasses.online.length > 0;

  const radius = 28;
  const circ   = 2 * Math.PI * radius;
  const pct    = totalClassDays > 0 ? (doneDays + (hasTodayClass ? 0.5 : 0)) / 7 : 0;
  const offset = circ - pct * circ;

  let summaryMsg = '';
  if (totalClassDays === 0) {
    summaryMsg = 'No classes booked this week. <strong>Book your first class!</strong>';
  } else if (doneDays === totalClassDays && totalClassDays > 0) {
    summaryMsg = `All <strong>${totalClassDays} class days</strong> completed this week! 🎉`;
  } else if (hasTodayClass) {
    const n = todayClasses.gym.length + todayClasses.online.length;
    summaryMsg = `You have <strong>${n} class${n!==1?'es':''} today</strong>. Let's go! 💪`;
  } else {
    summaryMsg = `<strong>${doneDays}</strong> of <strong>${totalClassDays}</strong> days done. <strong>${totalClassDays - doneDays} left</strong> this week.`;
  }

  const daysHTML = DAY_NAMES.map((name, i) => {
    const d        = dayMap[i];
    const hasGym   = d.gym.length > 0;
    const hasOnline = d.online.length > 0;
    const isToday  = i === todayIdx2;
    const isPast   = i < todayIdx2;
    const hasBoth  = hasGym && hasOnline;
    const total    = d.gym.length + d.online.length;
    let circleClass = '';
    if (hasBoth)         circleClass = 'has-both'   + (isPast ? ' done' : '');
    else if (hasGym)     circleClass = 'has-class'  + (isPast ? ' done' : '');
    else if (hasOnline)  circleClass = 'has-online' + (isPast ? ' done' : '');
    if (isToday) circleClass += ' today';
    const circleContent = (hasGym || hasOnline) ? (isPast ? '✓' : total) : (isToday ? '→' : name.charAt(0));
    const dots = [
      ...d.gym.map(() => `<span class="wcp-dot gym"></span>`),
      ...d.online.map(() => `<span class="wcp-dot online"></span>`)
    ].join('');
    return `
      <div class="wcp-day">
        <div class="wcp-day-circle ${circleClass}">${circleContent}</div>
        <div class="wcp-dot-wrap">${dots}</div>
        <div class="wcp-day-name${isToday?' today':''}">${name}</div>
      </div>`;
  }).join('');

  const todayAllClasses = [
    ...todayClasses.gym.map(c => ({...c, source:'gym'})),
    ...todayClasses.online.map(c => ({...c, source:'online'})),
  ];
  const todayHTML = todayAllClasses.length > 0
    ? `<div class="wcp-classes-today">
        <div class="wcp-today-lbl">Today's Classes</div>
        ${todayAllClasses.map(c => `
          <div class="wcp-today-class">
            <div><div class="wcp-today-name">${c.name}</div><div class="wcp-today-meta">${c.time}</div></div>
            <span class="wcp-today-badge ${c.source}">${c.source==='gym'?'🏋️ Gym':'💻 Online'}</span>
          </div>`).join('')}
       </div>`
    : `<div class="wcp-empty">No classes today — <a href="schedule.html" style="color:#ff4500;text-decoration:none;">book one</a> or <a href="online-classes.html" style="color:#3b82f6;text-decoration:none;">go online</a>!</div>`;

  container.innerHTML = `
    <div class="wcp-summary">
      <div class="wcp-ring-wrap">
        <svg class="wcp-ring" width="70" height="70" viewBox="0 0 70 70">
          <circle class="wcp-ring-bg" cx="35" cy="35" r="${radius}"/>
          <circle class="wcp-ring-fill" cx="35" cy="35" r="${radius}"
            stroke-dasharray="${circ}" stroke-dashoffset="${circ}" id="wcpRingFill"/>
        </svg>
        <div class="wcp-ring-text">
          <span class="wcp-ring-num">${doneDays}<span style="font-size:0.8rem">/7</span></span>
          <span class="wcp-ring-lbl">days</span>
        </div>
      </div>
      <div class="wcp-summary-text">
        <h4>Weekly Class Progress</h4>
        <p>${summaryMsg}</p>
      </div>
    </div>
    <div class="wcp-days">${daysHTML}</div>
    ${todayHTML}`;

  setTimeout(() => {
    const fill = document.getElementById('wcpRingFill');
    if (fill) fill.style.strokeDashoffset = offset;
  }, 150);

  const linkEl = document.getElementById('wcpLink');
  if (linkEl && hasTodayClass && todayClasses.online.length > 0) {
    linkEl.href = 'online-classes.html';
    linkEl.textContent = 'Online Classes →';
  }
}
renderWeeklyClassProgress();

// ── TOAST ──
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}