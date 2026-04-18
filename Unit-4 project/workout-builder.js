// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== EXERCISE DATABASE =====
const exercises = [
  // CHEST
  { id:1, name:'Bench Press', icon:'🏋️', group:'chest', tags:['Compound','Barbell'], sets:4, reps:8, weight:80, restSec:90 },
  { id:2, name:'Incline Dumbbell Press', icon:'💪', group:'chest', tags:['Compound','Dumbbell'], sets:3, reps:10, weight:30, restSec:90 },
  { id:3, name:'Cable Flyes', icon:'🔗', group:'chest', tags:['Isolation','Cable'], sets:3, reps:15, weight:15, restSec:60 },
  { id:4, name:'Push-Ups', icon:'⬆️', group:'chest', tags:['Bodyweight'], sets:3, reps:20, weight:0, restSec:60 },
  // BACK
  { id:5, name:'Deadlift', icon:'🏋️', group:'back', tags:['Compound','Barbell'], sets:5, reps:5, weight:120, restSec:120 },
  { id:6, name:'Pull-Ups', icon:'🤸', group:'back', tags:['Bodyweight','Compound'], sets:4, reps:10, weight:0, restSec:90 },
  { id:7, name:'Barbell Row', icon:'🏋️', group:'back', tags:['Compound','Barbell'], sets:4, reps:8, weight:70, restSec:90 },
  { id:8, name:'Lat Pulldown', icon:'⬇️', group:'back', tags:['Compound','Machine'], sets:3, reps:12, weight:60, restSec:60 },
  // SHOULDERS
  { id:9, name:'Overhead Press', icon:'🙌', group:'shoulders', tags:['Compound','Barbell'], sets:4, reps:8, weight:60, restSec:90 },
  { id:10, name:'Lateral Raises', icon:'↔️', group:'shoulders', tags:['Isolation','Dumbbell'], sets:4, reps:15, weight:12, restSec:60 },
  { id:11, name:'Front Raises', icon:'⬆️', group:'shoulders', tags:['Isolation','Dumbbell'], sets:3, reps:12, weight:10, restSec:60 },
  { id:12, name:'Face Pulls', icon:'🔗', group:'shoulders', tags:['Isolation','Cable'], sets:3, reps:20, weight:20, restSec:60 },
  // ARMS
  { id:13, name:'Barbell Curl', icon:'💪', group:'arms', tags:['Isolation','Barbell'], sets:4, reps:10, weight:40, restSec:60 },
  { id:14, name:'Tricep Dips', icon:'⬇️', group:'arms', tags:['Compound','Bodyweight'], sets:4, reps:12, weight:0, restSec:60 },
  { id:15, name:'Hammer Curl', icon:'🔨', group:'arms', tags:['Isolation','Dumbbell'], sets:3, reps:12, weight:20, restSec:60 },
  { id:16, name:'Skull Crushers', icon:'💀', group:'arms', tags:['Isolation','Barbell'], sets:3, reps:10, weight:35, restSec:60 },
  // LEGS
  { id:17, name:'Squat', icon:'🦵', group:'legs', tags:['Compound','Barbell'], sets:5, reps:5, weight:100, restSec:120 },
  { id:18, name:'Romanian Deadlift', icon:'🏋️', group:'legs', tags:['Compound','Barbell'], sets:4, reps:8, weight:80, restSec:90 },
  { id:19, name:'Leg Press', icon:'🦵', group:'legs', tags:['Compound','Machine'], sets:4, reps:12, weight:120, restSec:90 },
  { id:20, name:'Lunges', icon:'🚶', group:'legs', tags:['Compound','Bodyweight'], sets:3, reps:12, weight:20, restSec:60 },
  { id:21, name:'Calf Raises', icon:'⬆️', group:'legs', tags:['Isolation'], sets:4, reps:20, weight:40, restSec:45 },
  // CORE
  { id:22, name:'Plank', icon:'📏', group:'core', tags:['Isometric','Bodyweight'], sets:3, reps:60, weight:0, restSec:45 },
  { id:23, name:'Cable Crunch', icon:'🔗', group:'core', tags:['Isolation','Cable'], sets:4, reps:15, weight:30, restSec:45 },
  { id:24, name:'Hanging Leg Raise', icon:'🤸', group:'core', tags:['Compound','Bodyweight'], sets:4, reps:12, weight:0, restSec:60 },
  { id:25, name:'Russian Twists', icon:'🔄', group:'core', tags:['Rotation','Dumbbell'], sets:3, reps:20, weight:10, restSec:45 },
  // CARDIO
  { id:26, name:'Treadmill Run', icon:'🏃', group:'cardio', tags:['Endurance'], sets:1, reps:20, weight:0, restSec:0 },
  { id:27, name:'Jump Rope', icon:'🪢', group:'cardio', tags:['HIIT'], sets:5, reps:60, weight:0, restSec:30 },
  { id:28, name:'Burpees', icon:'🔥', group:'cardio', tags:['HIIT','Bodyweight'], sets:5, reps:10, weight:0, restSec:30 },
  { id:29, name:'Box Jumps', icon:'📦', group:'cardio', tags:['Power','Plyometric'], sets:4, reps:8, weight:0, restSec:60 },
  { id:30, name:'Battle Ropes', icon:'🌊', group:'cardio', tags:['HIIT','Endurance'], sets:4, reps:30, weight:0, restSec:45 },
];

// ===== STATE =====
let currentWorkout = []; // { exercise, sets: [{reps, weight}] }
let activeGroup = 'all';
let searchQuery = '';

// ===== RENDER EXERCISES =====
function filterExercises() {
  searchQuery = document.getElementById('exerciseSearch').value.toLowerCase();
  renderExercises();
}

function renderExercises() {
  let filtered = exercises;
  if (activeGroup !== 'all') filtered = filtered.filter(e => e.group === activeGroup);
  if (searchQuery) filtered = filtered.filter(e => e.name.toLowerCase().includes(searchQuery) || e.tags.some(t => t.toLowerCase().includes(searchQuery)));

  const addedIds = currentWorkout.map(w => w.exercise.id);
  document.getElementById('exerciseList').innerHTML = filtered.map(ex => `
    <div class="exercise-item ${addedIds.includes(ex.id) ? 'added' : ''}" onclick="addExercise(${ex.id})">
      <div class="ex-icon">${ex.icon}</div>
      <div class="ex-info">
        <strong>${ex.name}</strong>
        <span>${ex.sets} sets · ${ex.reps} ${ex.group==='cardio'&&ex.reps>15?'sec':'reps'}${ex.weight?` · ${ex.weight}kg`:''}</span>
        <div class="ex-tags">${ex.tags.map(t=>`<span class="ex-tag">${t}</span>`).join('')}</div>
      </div>
      <button class="ex-add-btn">${addedIds.includes(ex.id) ? '✓' : '+'}</button>
    </div>
  `).join('') || `<div style="text-align:center;padding:2rem;color:var(--muted);">No exercises found</div>`;
}

// Muscle tabs
document.querySelectorAll('.mtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeGroup = tab.getAttribute('data-group');
    renderExercises();
  });
});

// ===== ADD EXERCISE =====
function addExercise(id) {
  if (currentWorkout.find(w => w.exercise.id === id)) {
    showToast('Already in workout!', 'warn'); return;
  }
  const ex = exercises.find(e => e.id === id);
  const sets = [];
  for (let i = 0; i < ex.sets; i++) sets.push({ reps: ex.reps, weight: ex.weight });
  currentWorkout.push({ exercise: ex, sets });
  renderCanvas();
  renderExercises();
  updateMeta();
  showToast(`✅ Added: ${ex.name}`);
}

// ===== REMOVE EXERCISE =====
function removeExercise(id) {
  currentWorkout = currentWorkout.filter(w => w.exercise.id !== id);
  renderCanvas();
  renderExercises();
  updateMeta();
}

// ===== ADD SET =====
function addSet(id) {
  const w = currentWorkout.find(w => w.exercise.id === id);
  if (w) { w.sets.push({ reps: w.exercise.reps, weight: w.exercise.weight }); renderCanvas(); }
}

// ===== RENDER CANVAS =====
function renderCanvas() {
  const canvas = document.getElementById('workoutCanvas');
  const empty = document.getElementById('canvasEmpty');
  document.getElementById('workoutCount').textContent = `${currentWorkout.length} exercise${currentWorkout.length !== 1 ? 's' : ''}`;

  if (currentWorkout.length === 0) {
    canvas.innerHTML = ''; canvas.appendChild(empty); empty.style.display = 'flex'; return;
  }
  empty.style.display = 'none';

  canvas.innerHTML = currentWorkout.map((w, idx) => `
    <div class="canvas-ex" id="cex-${w.exercise.id}">
      <div class="canvas-ex-header">
        <div class="canvas-ex-num">${idx + 1}</div>
        <span class="canvas-ex-icon">${w.exercise.icon}</span>
        <span class="canvas-ex-name">${w.exercise.name}</span>
        <button class="canvas-ex-remove" onclick="removeExercise(${w.exercise.id})">✕</button>
      </div>
      <div class="canvas-ex-sets">
        ${w.sets.map((s, si) => `
          <div class="set-row">
            <span class="set-label">Set ${si+1}</span>
            <input class="set-input" type="number" value="${s.reps}" min="1" onchange="updateSet(${w.exercise.id},${si},'reps',this.value)">
            <span class="set-unit">${w.exercise.group==='cardio'&&s.reps>15?'sec':'reps'}</span>
            ${s.weight > 0 ? `<span class="set-label" style="margin-left:4px;">×</span><input class="set-input" type="number" value="${s.weight}" min="0" step="2.5" onchange="updateSet(${w.exercise.id},${si},'weight',this.value)"><span class="set-unit">kg</span>` : ''}
          </div>
        `).join('')}
        <button class="btn-add-set" onclick="addSet(${w.exercise.id})">+ Set</button>
      </div>
    </div>
  `).join('');
  canvas.appendChild(empty);
}

function updateSet(exId, setIdx, field, value) {
  const w = currentWorkout.find(w => w.exercise.id === exId);
  if (w) w.sets[setIdx][field] = parseFloat(value);
  updateMeta();
}

function updateMeta() {
  const totalSets = currentWorkout.reduce((a, w) => a + w.sets.length, 0);
  const estMins = Math.round(totalSets * 2.5 + currentWorkout.reduce((a,w) => a + w.sets.length * w.exercise.restSec/60, 0));
  const estCals = Math.round(totalSets * 12);
  document.getElementById('estDuration').textContent = `${estMins} min`;
  document.getElementById('estCalories').textContent = `${estCals} kcal`;
}

// ===== SAVE / CLEAR =====
function saveWorkout() {
  if (currentWorkout.length === 0) { showToast('⚠️ Add exercises first!', 'warn'); return; }
  const name = document.getElementById('workoutName').value.trim() || 'My Workout';
  const type = document.getElementById('workoutType').value;
  const diff = document.getElementById('workoutDiff').value;
  const saved = JSON.parse(localStorage.getItem('ironforge_workouts') || '[]');
  saved.unshift({ id: Date.now(), name, type, diff, exercises: currentWorkout.map(w => ({ id: w.exercise.id, name: w.exercise.name, sets: w.sets })), savedAt: new Date().toLocaleDateString() });
  localStorage.setItem('ironforge_workouts', JSON.stringify(saved));
  renderSaved();
  showToast(`💾 Saved: ${name}`);
}

function clearWorkout() {
  currentWorkout = [];
  renderCanvas();
  renderExercises();
  updateMeta();
  showToast('Workout cleared');
}

// ===== SAVED WORKOUTS =====
function renderSaved() {
  const saved = JSON.parse(localStorage.getItem('ironforge_workouts') || '[]');
  document.getElementById('savedCount').textContent = `${saved.length} saved`;
  const grid = document.getElementById('savedGrid');
  if (saved.length === 0) {
    grid.innerHTML = `<div class="saved-empty">No saved workouts yet. Build one and save it!</div>`;
    return;
  }
  grid.innerHTML = saved.map(w => `
    <div class="saved-card">
      <div class="saved-card-header">
        <span class="saved-card-name">${w.name}</span>
        <button class="saved-card-del" onclick="deleteSaved(${w.id}, event)">🗑️</button>
      </div>
      <div class="saved-card-meta">${w.exercises.length} exercises · ${w.diff} · saved ${w.savedAt}</div>
      <div class="saved-card-tags">
        ${w.exercises.slice(0,3).map(e => `<span class="saved-tag">${e.name}</span>`).join('')}
        ${w.exercises.length > 3 ? `<span class="saved-tag">+${w.exercises.length-3} more</span>` : ''}
      </div>
      <button class="saved-card-btn" onclick="loadWorkout(${w.id})">▶ Load & Start</button>
    </div>
  `).join('');
}

function deleteSaved(id, e) {
  e.stopPropagation();
  const saved = JSON.parse(localStorage.getItem('ironforge_workouts') || '[]').filter(w => w.id !== id);
  localStorage.setItem('ironforge_workouts', JSON.stringify(saved));
  renderSaved();
}

function loadWorkout(id) {
  const saved = JSON.parse(localStorage.getItem('ironforge_workouts') || '[]').find(w => w.id === id);
  if (!saved) return;
  currentWorkout = saved.exercises.map(se => {
    const ex = exercises.find(e => e.id === se.id) || { id: se.id, name: se.name, icon: '🏋️', group: 'strength', restSec: 90 };
    return { exercise: ex, sets: se.sets };
  });
  document.getElementById('workoutName').value = saved.name;
  renderCanvas();
  renderExercises();
  updateMeta();
  showToast(`✅ Loaded: ${saved.name}`);
}

// ===== WORKOUT MODE =====
let wmIndex = 0;
let wmTimer = null;
let wmSeconds = 0;
let restTimer = null;

function startWorkout() {
  if (currentWorkout.length === 0) { showToast('⚠️ Add exercises first!', 'warn'); return; }
  wmIndex = 0; wmSeconds = 0;
  document.getElementById('workoutMode').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderWMExercise();
  startWMTimer();
}

function startWMTimer() {
  clearInterval(wmTimer);
  wmTimer = setInterval(() => {
    wmSeconds++;
    const m = String(Math.floor(wmSeconds/60)).padStart(2,'0');
    const s = String(wmSeconds%60).padStart(2,'0');
    document.getElementById('wmTimer').textContent = `${m}:${s}`;
  }, 1000);
}

function renderWMExercise() {
  const w = currentWorkout[wmIndex];
  document.getElementById('wmTitle').textContent = document.getElementById('workoutName').value || 'Workout';
  document.getElementById('wmSubtitle').textContent = `Exercise ${wmIndex+1} of ${currentWorkout.length}`;
  document.getElementById('wmExIcon').textContent = w.exercise.icon;
  document.getElementById('wmExName').textContent = w.exercise.name;
  document.getElementById('wmExDetail').textContent = `${w.sets.length} sets · ${w.sets[0].reps} reps${w.sets[0].weight ? ` · ${w.sets[0].weight}kg` : ''}`;
  const pct = ((wmIndex) / currentWorkout.length) * 100;
  document.getElementById('wmProgressFill').style.width = pct + '%';
  document.getElementById('wmRest').style.display = 'none';

  document.getElementById('wmSets').innerHTML = w.sets.map((s,i) => `
    <button class="wm-set-btn" onclick="completeSet(this,${i})">Set ${i+1}: ${s.reps} ${w.exercise.group==='cardio'&&s.reps>15?'sec':'reps'}${s.weight?` · ${s.weight}kg`:''}</button>
  `).join('');
}

function completeSet(btn, setIdx) {
  btn.classList.toggle('done');
  const allDone = Array.from(document.querySelectorAll('.wm-set-btn')).every(b => b.classList.contains('done'));
  if (allDone && wmIndex < currentWorkout.length - 1) startRest();
}

function startRest() {
  const w = currentWorkout[wmIndex];
  let remaining = w.exercise.restSec || 60;
  document.getElementById('wmRest').style.display = 'block';
  document.getElementById('restTimer').textContent = remaining;
  clearInterval(restTimer);
  restTimer = setInterval(() => {
    remaining--;
    document.getElementById('restTimer').textContent = remaining;
    if (remaining <= 0) { clearInterval(restTimer); skipRest(); }
  }, 1000);
}

function skipRest() {
  clearInterval(restTimer);
  document.getElementById('wmRest').style.display = 'none';
}

function nextExercise() {
  if (wmIndex >= currentWorkout.length - 1) { finishWorkout(); return; }
  wmIndex++;
  renderWMExercise();
}

function prevExercise() {
  if (wmIndex > 0) { wmIndex--; renderWMExercise(); }
}

function exitWorkout() {
  clearInterval(wmTimer); clearInterval(restTimer);
  document.getElementById('workoutMode').classList.remove('open');
  document.body.style.overflow = '';
}

function finishWorkout() {
  clearInterval(wmTimer); clearInterval(restTimer);
  document.getElementById('workoutMode').classList.remove('open');
  const mins = Math.floor(wmSeconds / 60);
  const cals = currentWorkout.reduce((a,w) => a + w.sets.length * 12, 0);
  document.getElementById('completeSummary').textContent = `You completed all ${currentWorkout.length} exercises. Incredible work!`;
  document.getElementById('completeStats').innerHTML = `
    <div class="complete-stat"><strong>${mins}</strong><span>Minutes</span></div>
    <div class="complete-stat"><strong>${cals}</strong><span>Calories</span></div>
    <div class="complete-stat"><strong>${currentWorkout.length}</strong><span>Exercises</span></div>
  `;
  document.getElementById('completeOverlay').classList.add('open');
}

function logCompleted() {
  const mins = Math.floor(wmSeconds / 60);
  const cals = currentWorkout.reduce((a,w) => a + w.sets.length * 12, 0);
  const name = document.getElementById('workoutName').value || 'Workout';
  const logs = JSON.parse(localStorage.getItem('ironforge_logs') || '[]');
  logs.unshift({ id: Date.now(), name, type: 'strength', icon:'🏋️', duration: mins, calories: cals, trainer:'', notes:`Completed via Workout Builder`, mood:'💪', date: new Date().toISOString().split('T')[0] });
  localStorage.setItem('ironforge_logs', JSON.stringify(logs));
  closeComplete();
  showToast('✅ Logged to Activity Log!');
}

function closeComplete() {
  document.getElementById('completeOverlay').classList.remove('open');
  document.body.style.overflow = '';
  wmSeconds = 0;
}

// ===== TOAST =====
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
renderExercises();
renderSaved();