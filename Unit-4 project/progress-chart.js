// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== RANGE STATE =====
let activeRange = '1m';
function setRange(btn, range) {
  document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeRange = range;
  renderCharts();
}

// ===== DATA SEEDS =====
function seedData() {
  if (localStorage.getItem('ironforge_progress_seeded')) return;

  const weightData = [], fatData = [];
  const today = new Date();
  let w = 78, f = 19;
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    w = Math.max(70, w + (Math.random() - 0.52) * 0.3);
    f = Math.max(12, f + (Math.random() - 0.52) * 0.2);
    if (i % 3 === 0) {
      weightData.push({ date: d.toISOString().split('T')[0], val: +w.toFixed(1) });
      fatData.push({ date: d.toISOString().split('T')[0], val: +f.toFixed(1) });
    }
  }

  const workoutWeeks = [];
  for (let i = 51; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i * 7);
    workoutWeeks.push({ week: d.toISOString().split('T')[0], count: Math.floor(Math.random() * 4) + 2 });
  }

  const calsWeeks = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i * 7);
    calsWeeks.push({ week: d.toISOString().split('T')[0], cals: Math.floor(Math.random() * 800) + 1600 });
  }

  const prs = [
    { id:1, exercise:'Bench Press', weight:100, reps:5, notes:'Best set ever', date:'2025-10-12' },
    { id:2, exercise:'Squat', weight:130, reps:3, notes:'Depth was perfect', date:'2025-11-05' },
    { id:3, exercise:'Deadlift', weight:160, reps:2, notes:'New all-time best', date:'2025-12-01' },
    { id:4, exercise:'Overhead Press', weight:75, reps:5, notes:'Strict form', date:'2026-01-08' },
    { id:5, exercise:'Barbell Row', weight:90, reps:6, notes:'Controlled reps', date:'2026-02-14' },
    { id:6, exercise:'Pull-Ups', weight:20, reps:8, notes:'Weighted, clean', date:'2026-03-01' },
  ];

  const measurements = {
    chest: 100, waist: 82, hips: 95, arms: 38, thighs: 56, neck: 38,
    chestStart: 106, waistStart: 88, hipsStart: 100, armsStart: 36, thighsStart: 58, neckStart: 40
  };

  localStorage.setItem('ironforge_weight', JSON.stringify(weightData));
  localStorage.setItem('ironforge_fat', JSON.stringify(fatData));
  localStorage.setItem('ironforge_workout_weeks', JSON.stringify(workoutWeeks));
  localStorage.setItem('ironforge_cals_weeks', JSON.stringify(calsWeeks));
  localStorage.setItem('ironforge_prs', JSON.stringify(prs));
  localStorage.setItem('ironforge_measurements', JSON.stringify(measurements));
  localStorage.setItem('ironforge_progress_seeded', '1');
}

// ===== FILTER BY RANGE =====
function filterByRange(data, dateKey) {
  const days = { '1m': 30, '3m': 90, '6m': 180, '1y': 365 }[activeRange];
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days);
  return data.filter(d => new Date(d[dateKey]) >= cutoff);
}

// ===== SVG LINE CHART =====
function drawLineChart(containerId, datasets, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const W = container.offsetWidth || 500, H = container.offsetHeight || 200;
  const PAD = { top: 20, right: 20, bottom: 30, left: 40 };
  const CW = W - PAD.left - PAD.right, CH = H - PAD.top - PAD.bottom;

  const allVals = datasets.flatMap(ds => ds.data.map(d => d.val));
  const minVal = Math.min(...allVals) * 0.995;
  const maxVal = Math.max(...allVals) * 1.005;
  const allDates = datasets[0].data.map(d => new Date(d.date).getTime());
  const minDate = Math.min(...allDates), maxDate = Math.max(...allDates);

  const scaleX = d => PAD.left + ((new Date(d).getTime() - minDate) / (maxDate - minDate || 1)) * CW;
  const scaleY = v => PAD.top + (1 - (v - minVal) / (maxVal - minVal || 1)) * CH;

  let svg = `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;

  // Grid lines
  const gridCount = 4;
  for (let i = 0; i <= gridCount; i++) {
    const y = PAD.top + (i / gridCount) * CH;
    const val = maxVal - (i / gridCount) * (maxVal - minVal);
    svg += `<line class="chart-grid-line" x1="${PAD.left}" y1="${y}" x2="${W - PAD.right}" y2="${y}"/>`;
    svg += `<text class="chart-axis-label" x="${PAD.left - 4}" y="${y + 3}" text-anchor="end">${val.toFixed(1)}</text>`;
  }

  // X axis labels (show ~5 evenly spaced)
  const step = Math.floor(datasets[0].data.length / 5) || 1;
  datasets[0].data.forEach((d, i) => {
    if (i % step === 0 || i === datasets[0].data.length - 1) {
      const x = scaleX(d.date);
      const label = new Date(d.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      svg += `<text class="chart-axis-label" x="${x}" y="${H - 4}" text-anchor="middle">${label}</text>`;
    }
  });

  // Draw each dataset
  datasets.forEach(ds => {
    if (ds.data.length < 2) return;
    const pts = ds.data.map(d => `${scaleX(d.date)},${scaleY(d.val)}`).join(' ');
    const firstX = scaleX(ds.data[0].date), lastX = scaleX(ds.data[ds.data.length - 1].date);
    const bottomY = PAD.top + CH;

    // Area fill
    svg += `<polygon class="chart-area-fill" fill="${ds.color}" points="${firstX},${bottomY} ${pts} ${lastX},${bottomY}" opacity="0.12"/>`;

    // If goal line
    if (ds.isGoal) {
      const y = scaleY(ds.goalVal);
      svg += `<line stroke="${ds.color}" stroke-width="1.5" stroke-dasharray="6,4" x1="${PAD.left}" y1="${y}" x2="${W - PAD.right}" y2="${y}" opacity="0.6"/>`;
      svg += `<text class="chart-axis-label" x="${W - PAD.right - 2}" y="${y - 4}" text-anchor="end" fill="${ds.color}" opacity="0.8">Goal</text>`;
      return;
    }

    // Line
    svg += `<polyline class="chart-line" stroke="${ds.color}" points="${pts}"/>`;

    // Dots (only show every few for performance)
    const dotStep = Math.max(1, Math.floor(ds.data.length / 20));
    ds.data.forEach((d, i) => {
      if (i % dotStep === 0 || i === ds.data.length - 1) {
        const cx = scaleX(d.date), cy = scaleY(d.val);
        svg += `<circle class="chart-dot" cx="${cx}" cy="${cy}" r="3.5" fill="${ds.color}" stroke="var(--bg)" stroke-width="2" opacity="0.9">
          <title>${new Date(d.date).toLocaleDateString('en-IN',{month:'short',day:'numeric'})}: ${d.val}</title>
        </circle>`;
      }
    });
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

// ===== SVG BAR CHART =====
function drawBarChart(containerId, data, color, labelKey, valKey, unit = '') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const W = container.offsetWidth || 500, H = container.offsetHeight || 180;
  const PAD = { top: 15, right: 15, bottom: 28, left: 36 };
  const CW = W - PAD.left - PAD.right, CH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...data.map(d => d[valKey])) * 1.1 || 1;
  const barW = Math.floor(CW / data.length * 0.7);
  const gap = CW / data.length;

  let svg = `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;

  // Grid
  [0.25, 0.5, 0.75, 1].forEach(f => {
    const y = PAD.top + (1 - f) * CH;
    svg += `<line class="chart-grid-line" x1="${PAD.left}" y1="${y}" x2="${W - PAD.right}" y2="${y}"/>`;
    svg += `<text class="chart-axis-label" x="${PAD.left - 4}" y="${y + 3}" text-anchor="end">${Math.round(f * maxVal)}</text>`;
  });

  data.forEach((d, i) => {
    const x = PAD.left + i * gap + (gap - barW) / 2;
    const barH = (d[valKey] / maxVal) * CH;
    const y = PAD.top + CH - barH;
    const alpha = 0.5 + (d[valKey] / maxVal) * 0.5;

    svg += `<rect class="bar-rect" x="${x}" y="${y}" width="${barW}" height="${barH}" rx="4" fill="${color}" opacity="${alpha}">
      <title>${d[labelKey]}: ${d[valKey]}${unit}</title>
    </rect>`;

    // Value label on top
    if (barH > 20) {
      svg += `<text class="chart-axis-label" x="${x + barW / 2}" y="${y - 4}" text-anchor="middle" fill="${color}">${d[valKey]}</text>`;
    }

    // X label
    const label = typeof d[labelKey] === 'string' && d[labelKey].includes('-')
      ? new Date(d[labelKey]).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
      : d[labelKey];
    svg += `<text class="chart-axis-label" x="${x + barW / 2}" y="${H - 6}" text-anchor="middle">${label}</text>`;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

// ===== RENDER CHARTS =====
function renderCharts() {
  const weightRaw = JSON.parse(localStorage.getItem('ironforge_weight') || '[]');
  const fatRaw = JSON.parse(localStorage.getItem('ironforge_fat') || '[]');
  const workoutWeeks = JSON.parse(localStorage.getItem('ironforge_workout_weeks') || '[]');
  const calsWeeks = JSON.parse(localStorage.getItem('ironforge_cals_weeks') || '[]');

  const weight = filterByRange(weightRaw, 'date');
  const fat = filterByRange(fatRaw, 'date');

  const rangeLabels = { '1m': 'Last 30 days', '3m': 'Last 3 months', '6m': 'Last 6 months', '1y': 'Last year' };
  document.getElementById('weightRange').textContent = rangeLabels[activeRange];

  // Weight chart with goal line
  if (weight.length > 1) {
    const goalY = 72;
    const allPts = [...weight.map(d => d.val), goalY];
    drawLineChart('weightChart', [
      { data: weight, color: 'var(--primary)' },
      { data: [{ date: weight[0].date, val: goalY }, { date: weight[weight.length - 1].date, val: goalY }], color: 'var(--accent)', isGoal: true, goalVal: goalY }
    ]);
  }

  // Body fat chart
  if (fat.length > 1) drawLineChart('bodyFatChart', [{ data: fat, color: '#3b82f6' }]);

  // Workouts per week - show last N weeks based on range
  const wkCount = { '1m': 4, '3m': 12, '6m': 24, '1y': 52 }[activeRange];
  const wkSlice = workoutWeeks.slice(-wkCount);
  if (wkSlice.length) drawBarChart('workoutsChart', wkSlice, 'var(--primary)', 'week', 'count', ' sessions');

  // Calories burned
  drawBarChart('calsChart', calsWeeks, 'var(--accent)', 'week', 'cals', ' kcal');
}

// ===== RENDER PRs =====
function renderPRs() {
  const prs = JSON.parse(localStorage.getItem('ironforge_prs') || '[]');
  const grid = document.getElementById('prGrid');
  if (prs.length === 0) {
    grid.innerHTML = `<div style="color:var(--muted);font-size:0.82rem;padding:1rem;">No PRs logged yet. Add your first!</div>`;
    return;
  }
  grid.innerHTML = prs.map(pr => `
    <div class="pr-card">
      <div class="pr-card-ex">${pr.exercise}</div>
      <div class="pr-card-weight">${pr.weight}<span>kg</span></div>
      <div class="pr-card-reps">${pr.reps} rep${pr.reps !== 1 ? 's' : ''} · 1RM ≈ ${Math.round(pr.weight * (1 + pr.reps / 30))}kg</div>
      ${pr.notes ? `<div class="pr-card-date">${pr.notes}</div>` : ''}
      <div class="pr-card-date">📅 ${new Date(pr.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
      <button class="pr-card-del" onclick="deletePR(${pr.id})">🗑️</button>
    </div>
  `).join('');
}

function deletePR(id) {
  const prs = JSON.parse(localStorage.getItem('ironforge_prs') || '[]').filter(p => p.id !== id);
  localStorage.setItem('ironforge_prs', JSON.stringify(prs));
  renderPRs();
  showToast('PR removed');
}

// ===== RENDER MEASUREMENTS =====
function renderMeasurements() {
  const m = JSON.parse(localStorage.getItem('ironforge_measurements') || '{}');
  const items = [
    { icon: '💪', name: 'Chest', key: 'chest', startKey: 'chestStart', goal: 105, goalDir: 'up' },
    { icon: '⏳', name: 'Waist', key: 'waist', startKey: 'waistStart', goal: 78, goalDir: 'down' },
    { icon: '🍑', name: 'Hips', key: 'hips', startKey: 'hipsStart', goal: 95, goalDir: 'neutral' },
    { icon: '🦾', name: 'Arms', key: 'arms', startKey: 'armsStart', goal: 42, goalDir: 'up' },
    { icon: '🦵', name: 'Thighs', key: 'thighs', startKey: 'thighsStart', goal: 60, goalDir: 'up' },
    { icon: '🔵', name: 'Neck', key: 'neck', startKey: 'neckStart', goal: 40, goalDir: 'neutral' },
  ];

  document.getElementById('measurementsGrid').innerHTML = items.map(item => {
    const curr = m[item.key] || 0;
    const start = m[item.startKey] || curr;
    const diff = +(curr - start).toFixed(1);
    const pct = Math.min(Math.abs(curr / (item.goal || curr)) * 100, 100);
    let changeClass = 'neutral', changeLabel = `${diff > 0 ? '+' : ''}${diff} cm`;
    if (item.goalDir === 'up' && diff > 0) changeClass = 'good';
    else if (item.goalDir === 'down' && diff < 0) changeClass = 'good';
    else if (diff !== 0) changeClass = 'bad';
    return `
      <div class="measurement-row">
        <div class="mrow-left">
          <span class="mrow-icon">${item.icon}</span>
          <span class="mrow-name">${item.name}</span>
        </div>
        <div class="mrow-right">
          <div class="mrow-bar-wrap"><div class="mrow-bar" style="width:${pct}%"></div></div>
          <span class="mrow-change ${changeClass}">${changeLabel}</span>
          <span class="mrow-val">${curr}<small style="font-size:0.7rem;color:var(--muted)"> cm</small></span>
        </div>
      </div>
    `;
  }).join('');
}

// ===== LOG MEASUREMENT MODAL =====
function openLogModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('prModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function saveMeasurement() {
  const fields = { chest:'logChest', waist:'logWaist', hips:'logHips', arms:'logArms', thighs:'logThighs', neck:'logNeck' };
  const m = JSON.parse(localStorage.getItem('ironforge_measurements') || '{}');
  let updated = false;
  Object.keys(fields).forEach(k => {
    const v = parseFloat(document.getElementById(fields[k]).value);
    if (!isNaN(v) && v > 0) { m[k] = v; updated = true; }
  });
  const w = parseFloat(document.getElementById('logWeight').value);
  const bf = parseFloat(document.getElementById('logBodyFat').value);
  if (!isNaN(w) && w > 0) {
    const weightData = JSON.parse(localStorage.getItem('ironforge_weight') || '[]');
    weightData.push({ date: new Date().toISOString().split('T')[0], val: w });
    localStorage.setItem('ironforge_weight', JSON.stringify(weightData));
    updated = true;
  }
  if (!isNaN(bf) && bf > 0) {
    const fatData = JSON.parse(localStorage.getItem('ironforge_fat') || '[]');
    fatData.push({ date: new Date().toISOString().split('T')[0], val: bf });
    localStorage.setItem('ironforge_fat', JSON.stringify(fatData));
    updated = true;
  }
  if (!updated) { showToast('⚠️ Enter at least one value', 'warn'); return; }
  localStorage.setItem('ironforge_measurements', JSON.stringify(m));
  closeModal();
  renderCharts();
  renderMeasurements();
  showToast('✅ Measurement saved!');
}

// ===== PR MODAL =====
function openPRModal() {
  document.getElementById('prModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePRModal() {
  document.getElementById('prModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function savePR() {
  const exercise = document.getElementById('prExercise').value;
  const weight = parseFloat(document.getElementById('prWeight').value);
  const reps = parseInt(document.getElementById('prReps').value);
  const notes = document.getElementById('prNotes').value.trim();
  if (!exercise || isNaN(weight) || weight <= 0) { showToast('⚠️ Fill exercise and weight', 'warn'); return; }
  const prs = JSON.parse(localStorage.getItem('ironforge_prs') || '[]');
  prs.unshift({ id: Date.now(), exercise, weight, reps: reps || 1, notes, date: new Date().toISOString().split('T')[0] });
  localStorage.setItem('ironforge_prs', JSON.stringify(prs));
  closePRModal();
  renderPRs();
  showToast(`🏆 New PR logged: ${exercise} ${weight}kg!`);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
seedData();
renderCharts();
renderPRs();
renderMeasurements();

// Re-render charts on resize for responsive sizing
window.addEventListener('resize', () => {
  clearTimeout(window._resizeTimer);
  window._resizeTimer = setTimeout(renderCharts, 200);
});