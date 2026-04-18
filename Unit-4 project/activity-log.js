// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}
setTimeout(animateCounters, 300);

// ===== DEFAULT LOG DATA =====
const defaultLogs = [
  { id: 1, name: 'Upper Body Strength', type: 'strength', icon: '🏋️', duration: 58, calories: 420, trainer: 'Arjun Sharma', notes: 'New PR on bench press — 90kg!', mood: '💪', date: getDateStr(0) },
  { id: 2, name: 'HIIT Blast', type: 'cardio', icon: '⚡', duration: 45, calories: 380, trainer: 'Vikram Singh', notes: 'Tough session but pushed through.', mood: '😤', date: getDateStr(1) },
  { id: 3, name: 'Yoga Flow & Mobility', type: 'wellness', icon: '🧘', duration: 60, calories: 180, trainer: 'Priya Nair', notes: 'Great for recovery day.', mood: '😌', date: getDateStr(1) },
  { id: 4, name: 'Boxing Fundamentals', type: 'combat', icon: '🥊', duration: 60, calories: 520, trainer: 'Rahul Verma', notes: 'Combinations are improving.', mood: '😤', date: getDateStr(2) },
  { id: 5, name: 'Deadlift & Back Day', type: 'strength', icon: '🏋️', duration: 65, calories: 450, trainer: 'Arjun Sharma', notes: '5 sets of 5 at 120kg.', mood: '💪', date: getDateStr(3) },
  { id: 6, name: 'Tabata Intervals', type: 'cardio', icon: '⚡', duration: 30, calories: 310, trainer: 'Vikram Singh', notes: 'Short but absolutely brutal.', mood: '😅', date: getDateStr(3) },
  { id: 7, name: 'MMA Conditioning', type: 'combat', icon: '🥊', duration: 60, calories: 540, trainer: 'Rahul Verma', notes: '', mood: '😤', date: getDateStr(5) },
  { id: 8, name: 'Squat & Leg Day', type: 'strength', icon: '🏋️', duration: 60, calories: 410, trainer: 'Arjun Sharma', notes: 'Legs destroyed 🔥', mood: '💪', date: getDateStr(6) },
  { id: 9, name: 'Sunday Morning Yoga', type: 'wellness', icon: '🧘', duration: 75, calories: 200, trainer: 'Priya Nair', notes: 'Perfect way to start the week.', mood: '😌', date: getDateStr(7) },
  { id: 10, name: 'Bench Press & Chest', type: 'strength', icon: '🏋️', duration: 55, calories: 390, trainer: 'Arjun Sharma', notes: '', mood: '💪', date: getDateStr(8) },
];

function getDateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  const yesterday = new Date(today); yesterday.setDate(today.getDate()-1);
  const target = new Date(dateStr + 'T00:00:00');
  if (target.toDateString() === today.toDateString()) return 'Today';
  if (target.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' });
}

// ===== LOAD LOGS =====
function getLogs() {
  const stored = localStorage.getItem('ironforge_logs');
  return stored ? JSON.parse(stored) : defaultLogs;
}
function saveLogs(logs) {
  localStorage.setItem('ironforge_logs', JSON.stringify(logs));
}

// ===== FILTER & SORT =====
let currentFilter = 'all';

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderLog();
  });
});

function renderLog() {
  let logs = getLogs();
  const sort = document.getElementById('sortSelect').value;

  // Filter
  if (currentFilter !== 'all') logs = logs.filter(l => l.type === currentFilter);

  // Sort
  if (sort === 'newest') logs.sort((a,b) => new Date(b.date) - new Date(a.date));
  if (sort === 'oldest') logs.sort((a,b) => new Date(a.date) - new Date(b.date));
  if (sort === 'calories') logs.sort((a,b) => b.calories - a.calories);
  if (sort === 'duration') logs.sort((a,b) => b.duration - a.duration);

  const list = document.getElementById('logList');

  if (logs.length === 0) {
    list.innerHTML = `<div class="empty-state"><span class="empty-icon">📋</span><h3>No sessions logged yet</h3><p>Hit the "+ Log Workout" button to record your first session!</p></div>`;
    return;
  }

  // Group by date
  const grouped = {};
  logs.forEach(l => {
    if (!grouped[l.date]) grouped[l.date] = [];
    grouped[l.date].push(l);
  });

  list.innerHTML = Object.keys(grouped).sort((a,b) => {
    if (sort === 'oldest') return new Date(a) - new Date(b);
    return new Date(b) - new Date(a);
  }).map(date => `
    <div class="date-group">
      <div class="date-label"><span>${formatDate(date)}</span> · ${grouped[date].length} session${grouped[date].length>1?'s':''}</div>
      ${grouped[date].map(log => `
        <div class="log-entry ${log.type}" onclick="expandEntry(this)">
          <div class="log-entry-icon">${log.icon}</div>
          <div class="log-entry-main">
            <h4>${log.name}</h4>
            <div class="log-entry-meta">
              <span class="log-meta-chip">⏱️ ${log.duration} min</span>
              ${log.trainer ? `<span class="log-meta-chip">👤 ${log.trainer}</span>` : ''}
              <span class="log-meta-chip">${log.type.charAt(0).toUpperCase()+log.type.slice(1)}</span>
            </div>
            ${log.notes ? `<div class="log-notes">"${log.notes}"</div>` : ''}
          </div>
          <div class="log-entry-stats">
            <div class="log-stat"><span class="log-stat-num">${log.calories}</span><span class="log-stat-label">kcal</span></div>
            <div class="log-stat"><span class="log-stat-num">${log.duration}</span><span class="log-stat-label">min</span></div>
          </div>
          <div class="log-mood">${log.mood}</div>
          <button class="log-delete" onclick="deleteLog(event,${log.id})">🗑️</button>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function deleteLog(e, id) {
  e.stopPropagation();
  const logs = getLogs().filter(l => l.id !== id);
  saveLogs(logs);
  renderLog();
  showToast('Session removed');
}

function expandEntry(el) {
  el.classList.toggle('expanded');
}

// ===== LOG MODAL =====
function openLogModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });

// Mood buttons
document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

function saveLog() {
  const name = document.getElementById('logName').value.trim();
  const type = document.getElementById('logType').value;
  const duration = parseInt(document.getElementById('logDuration').value) || 0;
  const calories = parseInt(document.getElementById('logCalories').value) || 0;
  const trainer = document.getElementById('logTrainer').value.trim();
  const notes = document.getElementById('logNotes').value.trim();
  const mood = document.querySelector('.mood-btn.active')?.getAttribute('data-mood') || '💪';

  if (!name) { showToast('⚠️ Please enter a workout name', 'warn'); return; }
  if (!duration) { showToast('⚠️ Please enter the duration', 'warn'); return; }

  const icons = { strength:'🏋️', cardio:'⚡', combat:'🥊', wellness:'🧘' };
  const logs = getLogs();
  const newLog = {
    id: Date.now(),
    name, type, icon: icons[type] || '🏃',
    duration, calories, trainer, notes, mood,
    date: new Date().toISOString().split('T')[0]
  };
  logs.unshift(newLog);
  saveLogs(logs);

  // Reset form
  document.getElementById('logName').value = '';
  document.getElementById('logDuration').value = '';
  document.getElementById('logCalories').value = '';
  document.getElementById('logTrainer').value = '';
  document.getElementById('logNotes').value = '';

  closeModal();
  renderLog();
  showToast(`✅ Session logged: ${name}`);
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== INIT =====
if (!localStorage.getItem('ironforge_logs')) saveLogs(defaultLogs);
renderLog();