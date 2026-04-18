// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== SECTION SWITCH =====
function switchSection(btn, section) {
  document.querySelectorAll('.snav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${section}`).classList.add('active');
  if (section === 'fitness') renderBMI();
  if (section === 'nutrition') renderTDEE();
}

// ===== AVATAR COLOR PICKER =====
const avatarColors = ['#ff4500','#e91e8c','#3b82f6','#00c851','#ff9800','#8b5cf6','#06b6d4','#f59e0b'];
let selectedAvatarColor = '#ff4500';

function renderAvatarColors() {
  document.getElementById('avatarColorRow').innerHTML = avatarColors.map(c => `
    <div class="av-color ${c === selectedAvatarColor ? 'selected' : ''}" style="background:${c}"
         onclick="selectAvatarColor('${c}')"></div>`).join('');
}

function selectAvatarColor(color) {
  selectedAvatarColor = color;
  document.getElementById('bigAvatar').style.background = `linear-gradient(135deg, ${color}, ${color}cc)`;
  document.querySelectorAll('.av-color').forEach(el => el.classList.toggle('selected', el.style.background === color || el.style.background.includes(color)));
  renderAvatarColors();
}

// ===== PASSWORD TOGGLE =====
function togglePw(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else { input.type = 'password'; btn.textContent = '👁'; }
}

function changePassword() {
  const cur = document.getElementById('currentPw').value;
  const nw  = document.getElementById('newPw').value;
  const cf  = document.getElementById('confirmPw').value;
  if (!cur) { showToast('⚠️ Enter your current password', 'warn'); return; }
  if (nw.length < 8) { showToast('⚠️ New password must be at least 8 characters', 'warn'); return; }
  if (nw !== cf) { showToast('⚠️ Passwords do not match', 'warn'); return; }
  document.getElementById('currentPw').value = '';
  document.getElementById('newPw').value = '';
  document.getElementById('confirmPw').value = '';
  showToast('🔑 Password updated successfully!');
}

// ===== BMI CALC =====
function renderBMI() {
  const h = parseFloat(document.getElementById('height')?.value) || 178;
  const w = parseFloat(document.getElementById('currentWeight')?.value) || 74.2;
  const bmi = w / ((h / 100) ** 2);
  let cat, color, pct;
  if (bmi < 18.5) { cat = 'Underweight'; color = '#3b82f6'; pct = (bmi / 18.5) * 20; }
  else if (bmi < 25) { cat = 'Normal Weight'; color = '#00c851'; pct = 20 + ((bmi - 18.5) / 6.5) * 30; }
  else if (bmi < 30) { cat = 'Overweight'; color = '#ff9800'; pct = 50 + ((bmi - 25) / 5) * 25; }
  else { cat = 'Obese'; color = '#ef4444'; pct = Math.min(75 + ((bmi - 30) / 10) * 25, 100); }
  document.getElementById('bmiCard').innerHTML = `
    <div>
      <div class="bmi-value">${bmi.toFixed(1)}</div>
      <div class="bmi-label">BMI Score</div>
    </div>
    <div class="bmi-bar-wrap">
      <div class="bmi-category" style="color:${color}">${cat}</div>
      <div class="bmi-bar-track"><div class="bmi-bar-fill" style="width:${pct}%;background:${color}"></div></div>
      <div class="bmi-bar-labels"><span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span></div>
    </div>
    <div style="font-size:0.78rem;color:var(--muted-2);line-height:1.7;">Height: ${h}cm<br>Weight: ${w}kg</div>`;
  // Animate bar
  setTimeout(() => {
    const fill = document.querySelector('.bmi-bar-fill');
    if (fill) fill.style.width = pct + '%';
  }, 100);
}

// ===== TDEE CALC =====
function calcTDEE() {
  const h = parseFloat(document.getElementById('height')?.value) || 178;
  const w = parseFloat(document.getElementById('currentWeight')?.value) || 74.2;
  const dob = document.getElementById('dob')?.value || '1995-08-14';
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  // Mifflin-St Jeor for male
  const bmr = 10 * w + 6.25 * h - 5 * age + 5;
  const actMultipliers = { sedentary:1.2, light:1.375, moderate:1.55, very:1.725, extra:1.9 };
  const level = document.getElementById('activityLevel')?.value || 'moderate';
  const tdee = Math.round(bmr * actMultipliers[level]);
  const goal = document.getElementById('primaryGoal')?.value || 'fat-loss';
  const calTarget = goal === 'fat-loss' ? tdee - 400 : goal === 'muscle' ? tdee + 300 : tdee;
  document.getElementById('calGoal').value = calTarget;
  document.getElementById('proteinGoal').value = Math.round(w * 2.2);
  document.getElementById('carbGoal').value = Math.round((calTarget * 0.45) / 4);
  document.getElementById('fatGoal').value = Math.round((calTarget * 0.25) / 9);
  renderTDEE();
  showToast('⚡ Goals auto-calculated from your stats!');
}

function renderTDEE() {
  const h = parseFloat(document.getElementById('height')?.value) || 178;
  const w = parseFloat(document.getElementById('currentWeight')?.value) || 74.2;
  const dob = document.getElementById('dob')?.value || '1995-08-14';
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  const bmr = 10 * w + 6.25 * h - 5 * age + 5;
  const level = document.getElementById('activityLevel')?.value || 'moderate';
  const actMultipliers = { sedentary:1.2, light:1.375, moderate:1.55, very:1.725, extra:1.9 };
  const tdee = Math.round(bmr * (actMultipliers[level] || 1.55));
  document.getElementById('tdeeBanner').innerHTML = `
    <div><div class="tdee-value">${tdee}</div><div class="tdee-label">TDEE (kcal/day)</div></div>
    <div class="tdee-desc">Your estimated Total Daily Energy Expenditure. Based on your height, weight, age and activity level. Use "Auto-Calculate" below to set goals from this number.</div>`;
}

// ===== ACCENT COLOR =====
function setAccent(el, color) {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  document.documentElement.style.setProperty('--primary', color);
  showToast('🎨 Accent colour updated!');
}

// ===== SAVE ALL =====
function saveAll() {
  const settings = {
    profile: {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      city: document.getElementById('city').value,
      bio: document.getElementById('bio').value,
    },
    fitness: {
      primaryGoal: document.getElementById('primaryGoal')?.value,
      expLevel: document.getElementById('expLevel')?.value,
      currentWeight: document.getElementById('currentWeight')?.value,
      targetWeight: document.getElementById('targetWeight')?.value,
      height: document.getElementById('height')?.value,
      workoutsPerWeek: document.getElementById('workoutsPerWeek')?.value,
    },
    nutrition: {
      calGoal: document.getElementById('calGoal')?.value,
      proteinGoal: document.getElementById('proteinGoal')?.value,
      carbGoal: document.getElementById('carbGoal')?.value,
      fatGoal: document.getElementById('fatGoal')?.value,
      waterGoal: document.getElementById('waterGoal')?.value,
    },
  };
  localStorage.setItem('ironforge_settings', JSON.stringify(settings));

  // Pulse save button
  const btn = document.getElementById('globalSaveBtn');
  btn.textContent = '✅ Saved!';
  btn.style.background = '#00c851';
  setTimeout(() => { btn.textContent = '💾 Save Changes'; btn.style.background = ''; }, 2000);
  showToast('✅ All settings saved!');
}

// ===== LOAD SAVED =====
function loadSaved() {
  const s = JSON.parse(localStorage.getItem('ironforge_settings') || '{}');
  if (s.profile) {
    Object.keys(s.profile).forEach(k => {
      const el = document.getElementById(k);
      if (el) el.value = s.profile[k];
    });
  }
  if (s.fitness) Object.keys(s.fitness).forEach(k => { const el = document.getElementById(k); if (el) el.value = s.fitness[k]; });
  if (s.nutrition) Object.keys(s.nutrition).forEach(k => { const el = document.getElementById(k); if (el) el.value = s.nutrition[k]; });
}

// ===== ACCOUNT ACTIONS =====
let pendingAction = null;

function confirmReset() {
  pendingAction = 'reset';
  showConfirm('🗑️', 'Reset All Progress?', 'This will permanently delete all your workout logs, measurements and achievements. This cannot be undone.');
}

function confirmDelete() {
  pendingAction = 'delete';
  showConfirm('⚠️', 'Delete Account?', 'Your account and all data will be permanently removed. This action cannot be undone.');
}

function showConfirm(icon, title, text) {
  document.getElementById('confirmIcon').textContent = icon;
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmText').textContent = text;
  document.getElementById('confirmOverlay').classList.add('open');
}

function closeConfirm() {
  document.getElementById('confirmOverlay').classList.remove('open');
  pendingAction = null;
}

function confirmAction() {
  if (pendingAction === 'reset') {
    ['ironforge_logs','ironforge_nutrition','ironforge_weight','ironforge_fat',
     'ironforge_prs','ironforge_measurements','ironforge_community_posts','ironforge_workouts'].forEach(k => localStorage.removeItem(k));
    closeConfirm();
    showToast('🗑️ All progress data cleared');
  } else if (pendingAction === 'delete') {
    closeConfirm();
    showToast('Account deletion requested — redirecting...');
    setTimeout(() => window.location.href = 'login.html', 2000);
  }
}

function exportData() {
  const data = {
    profile: { name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', exported: new Date().toISOString() },
    activityLogs: JSON.parse(localStorage.getItem('ironforge_logs') || '[]'),
    nutrition: JSON.parse(localStorage.getItem('ironforge_nutrition') || '{}'),
    weightHistory: JSON.parse(localStorage.getItem('ironforge_weight') || '[]'),
    prs: JSON.parse(localStorage.getItem('ironforge_prs') || '[]'),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'ironforge-export.json'; a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Data exported successfully!');
}

function logout() {
  localStorage.removeItem('ironforge_member');
  window.location.href = 'login.html';
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : type === 'error' ? '#ef4444' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
renderAvatarColors();
loadSaved();
renderBMI();
renderTDEE();