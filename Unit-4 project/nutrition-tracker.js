// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== GOALS =====
const goals = { calories: 2400, protein: 180, carbs: 280, fats: 70, fiber: 35 };

// ===== FOOD DATABASE =====
const foodDB = [
  { name:'Chicken Breast (100g)', icon:'🍗', calories:165, protein:31, carbs:0, fats:3.6, fiber:0, serving:'100g' },
  { name:'Brown Rice (100g cooked)', icon:'🍚', calories:112, protein:2.6, carbs:24, fats:0.9, fiber:1.8, serving:'100g' },
  { name:'Whole Eggs (2)', icon:'🥚', calories:143, protein:12.6, carbs:0.8, fats:9.5, fiber:0, serving:'2 eggs' },
  { name:'Banana', icon:'🍌', calories:89, protein:1.1, carbs:23, fats:0.3, fiber:2.6, serving:'1 medium' },
  { name:'Greek Yogurt (150g)', icon:'🥛', calories:100, protein:10, carbs:6, fats:2, fiber:0, serving:'150g' },
  { name:'Oats (50g dry)', icon:'🥣', calories:190, protein:6.5, carbs:32, fats:3.5, fiber:5, serving:'50g' },
  { name:'Salmon (150g)', icon:'🐟', calories:280, protein:40, carbs:0, fats:12, fiber:0, serving:'150g' },
  { name:'Sweet Potato (150g)', icon:'🍠', calories:130, protein:3, carbs:30, fats:0.2, fiber:4, serving:'150g' },
  { name:'Broccoli (100g)', icon:'🥦', calories:34, protein:2.8, carbs:7, fats:0.4, fiber:2.6, serving:'100g' },
  { name:'Almonds (30g)', icon:'🌰', calories:174, protein:6.3, carbs:6, fats:15, fiber:3.5, serving:'30g' },
  { name:'Whey Protein Shake', icon:'💪', calories:120, protein:25, carbs:3, fats:1.5, fiber:0, serving:'1 scoop' },
  { name:'Avocado (half)', icon:'🥑', calories:120, protein:1.5, carbs:6.4, fats:11, fiber:5, serving:'half' },
  { name:'White Rice (100g cooked)', icon:'🍚', calories:130, protein:2.7, carbs:28, fats:0.3, fiber:0.4, serving:'100g' },
  { name:'Dal (lentils, 100g)', icon:'🍲', calories:116, protein:9, carbs:20, fats:0.4, fiber:8, serving:'100g' },
  { name:'Chapati (1 piece)', icon:'🫓', calories:70, protein:2, carbs:15, fats:0.5, fiber:1.5, serving:'1 piece' },
  { name:'Paneer (100g)', icon:'🧀', calories:265, protein:18, carbs:1.2, fats:20, fiber:0, serving:'100g' },
  { name:'Milk (250ml)', icon:'🥛', calories:148, protein:7.7, carbs:11.7, fats:8, fiber:0, serving:'250ml' },
  { name:'Apple', icon:'🍎', calories:82, protein:0.4, carbs:22, fats:0.2, fiber:3.8, serving:'1 medium' },
  { name:'Peanut Butter (2 tbsp)', icon:'🥜', calories:191, protein:7, carbs:7, fats:16, fiber:1.8, serving:'2 tbsp' },
  { name:'Idli (2 pieces)', icon:'🍚', calories:150, protein:4, carbs:30, fats:0.5, fiber:1, serving:'2 pieces' },
  { name:'Dosa (1 plain)', icon:'🥞', calories:168, protein:3.5, carbs:35, fats:1.5, fiber:0.8, serving:'1 dosa' },
  { name:'Rajma (100g cooked)', icon:'🫘', calories:127, protein:8.7, carbs:22, fats:0.5, fiber:7.4, serving:'100g' },
  { name:'Tuna (100g canned)', icon:'🐟', calories:116, protein:26, carbs:0, fats:1, fiber:0, serving:'100g' },
  { name:'Cottage Cheese (100g)', icon:'🧀', calories:72, protein:12.5, carbs:3.4, fats:1, fiber:0, serving:'100g' },
  { name:'Spinach (100g)', icon:'🥬', calories:23, protein:2.9, carbs:3.6, fats:0.4, fiber:2.2, serving:'100g' },
  { name:'Orange', icon:'🍊', calories:62, protein:1.2, carbs:15.4, fats:0.2, fiber:3.1, serving:'1 medium' },
  { name:'Protein Bar', icon:'🍫', calories:200, protein:20, carbs:22, fats:7, fiber:3, serving:'1 bar' },
  { name:'Boiled Chana (100g)', icon:'🫘', calories:164, protein:8.9, carbs:27, fats:2.6, fiber:7.6, serving:'100g' },
  { name:'Egg White (3)', icon:'🥚', calories:51, protein:10.8, carbs:0.7, fats:0.2, fiber:0, serving:'3 whites' },
  { name:'Coffee (black)', icon:'☕', calories:2, protein:0.3, carbs:0, fats:0, fiber:0, serving:'1 cup' },
];

// ===== DATE NAVIGATION =====
let currentDate = new Date();
currentDate.setHours(0,0,0,0);

function getDateKey(d) { return d.toISOString().split('T')[0]; }

function updateDateDisplay() {
  const today = new Date(); today.setHours(0,0,0,0);
  const diff = Math.round((currentDate - today) / 86400000);
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let label = diff === 0 ? 'Today' : diff === -1 ? 'Yesterday' : diff === 1 ? 'Tomorrow' : `${days[currentDate.getDay()]}, ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  document.getElementById('dateBadge').textContent = label;
  document.getElementById('dateDisplay').textContent = `${currentDate.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}`;
}

function prevDay() { currentDate.setDate(currentDate.getDate() - 1); updateDateDisplay(); renderAll(); }
function nextDay() { currentDate.setDate(currentDate.getDate() + 1); updateDateDisplay(); renderAll(); }

// ===== DATA =====
function getLog() {
  const all = JSON.parse(localStorage.getItem('ironforge_nutrition') || '{}');
  const key = getDateKey(currentDate);
  if (!all[key]) all[key] = { breakfast:[], lunch:[], dinner:[], snacks:[], water:0 };
  return { all, key, day: all[key] };
}
function saveLog(all) { localStorage.setItem('ironforge_nutrition', JSON.stringify(all)); }

// ===== SEED DEFAULT DATA =====
function seedDefaultData() {
  const key = getDateKey(new Date());
  const all = JSON.parse(localStorage.getItem('ironforge_nutrition') || '{}');
  if (all[key]) return;
  all[key] = {
    breakfast: [
      { id:Date.now()+1, name:'Oats (50g dry)', icon:'🥣', calories:190, protein:6.5, carbs:32, fats:3.5, fiber:5, serving:'50g' },
      { id:Date.now()+2, name:'Whole Eggs (2)', icon:'🥚', calories:143, protein:12.6, carbs:0.8, fats:9.5, fiber:0, serving:'2 eggs' },
      { id:Date.now()+3, name:'Banana', icon:'🍌', calories:89, protein:1.1, carbs:23, fats:0.3, fiber:2.6, serving:'1 medium' },
    ],
    lunch: [
      { id:Date.now()+4, name:'Chicken Breast (100g)', icon:'🍗', calories:165, protein:31, carbs:0, fats:3.6, fiber:0, serving:'100g' },
      { id:Date.now()+5, name:'Brown Rice (100g cooked)', icon:'🍚', calories:112, protein:2.6, carbs:24, fats:0.9, fiber:1.8, serving:'100g' },
      { id:Date.now()+6, name:'Broccoli (100g)', icon:'🥦', calories:34, protein:2.8, carbs:7, fats:0.4, fiber:2.6, serving:'100g' },
    ],
    dinner: [
      { id:Date.now()+7, name:'Salmon (150g)', icon:'🐟', calories:280, protein:40, carbs:0, fats:12, fiber:0, serving:'150g' },
      { id:Date.now()+8, name:'Sweet Potato (150g)', icon:'🍠', calories:130, protein:3, carbs:30, fats:0.2, fiber:4, serving:'150g' },
    ],
    snacks: [
      { id:Date.now()+9, name:'Whey Protein Shake', icon:'💪', calories:120, protein:25, carbs:3, fats:1.5, fiber:0, serving:'1 scoop' },
      { id:Date.now()+10, name:'Almonds (30g)', icon:'🌰', calories:174, protein:6.3, carbs:6, fats:15, fiber:3.5, serving:'30g' },
    ],
    water: 6
  };
  saveLog(all);
}

// ===== RENDER ALL =====
function renderAll() {
  const { day } = getLog();
  renderMeals(day);
  renderSummary(day);
  renderWater(day.water || 0);
}

function renderMeals(day) {
  ['breakfast','lunch','dinner','snacks'].forEach(meal => {
    const entries = day[meal] || [];
    const total = entries.reduce((a,e) => a + (e.calories||0), 0);
    document.getElementById(`${meal}Cals`).textContent = `${total} kcal`;
    const container = document.getElementById(`entries${meal.charAt(0).toUpperCase()+meal.slice(1)}`);
    if (entries.length === 0) {
      container.innerHTML = `<div class="meal-empty">No foods logged yet. Click "+ Add" to start.</div>`;
      return;
    }
    container.innerHTML = entries.map(e => `
      <div class="meal-entry">
        <div class="entry-icon">${e.icon}</div>
        <div class="entry-info">
          <strong>${e.name}</strong>
          <span>${e.serving || '100g'}</span>
        </div>
        <div class="entry-macros">
          <div class="entry-macro"><strong style="color:var(--protein)">${e.protein||0}g</strong><span>Prot</span></div>
          <div class="entry-macro"><strong style="color:var(--carbs)">${e.carbs||0}g</strong><span>Carb</span></div>
          <div class="entry-macro"><strong style="color:var(--fats)">${e.fats||0}g</strong><span>Fat</span></div>
        </div>
        <div class="entry-cals">${e.calories}</div>
        <button class="entry-del" onclick="deleteEntry('${meal}',${e.id})">🗑️</button>
      </div>
    `).join('');
  });
}

function renderSummary(day) {
  const all = [...(day.breakfast||[]), ...(day.lunch||[]), ...(day.dinner||[]), ...(day.snacks||[])];
  const totals = all.reduce((a,e) => ({
    calories: a.calories + (e.calories||0),
    protein: a.protein + (e.protein||0),
    carbs: a.carbs + (e.carbs||0),
    fats: a.fats + (e.fats||0),
    fiber: a.fiber + (e.fiber||0)
  }), { calories:0, protein:0, carbs:0, fats:0, fiber:0 });

  // Ring
  const pct = Math.min(totals.calories / goals.calories, 1);
  const circumference = 314;
  document.getElementById('calorieArc').style.strokeDashoffset = circumference - (pct * circumference);
  document.getElementById('ringConsumed').textContent = Math.round(totals.calories);
  document.getElementById('ringGoal').textContent = `/ ${goals.calories}`;
  const burned = 420;
  document.getElementById('rmBurned').textContent = burned;
  document.getElementById('rmRemaining').textContent = Math.max(0, goals.calories - Math.round(totals.calories) + burned);
  document.getElementById('rmGoal').textContent = goals.calories;

  // Macro bars
  const macros = ['protein','carbs','fats','fiber'];
  macros.forEach(m => {
    const eaten = Math.round(totals[m]);
    const goal = goals[m];
    document.getElementById(`${m}Eaten`).textContent = eaten;
    document.getElementById(`${m}Goal`).textContent = goal;
    document.getElementById(`${m}Bar`).style.width = Math.min((eaten/goal)*100, 100) + '%';
  });

  // Mini stats
  document.getElementById('mscProtein').textContent = Math.round(totals.protein) + 'g';
  document.getElementById('mscCarbs').textContent = Math.round(totals.carbs) + 'g';
  document.getElementById('mscFats').textContent = Math.round(totals.fats) + 'g';
  document.getElementById('mscCalories').textContent = Math.round(totals.calories);
}

// ===== WATER =====
function renderWater(count) {
  const container = document.getElementById('waterGlasses');
  container.innerHTML = Array.from({length:8}, (_,i) => `
    <div class="water-glass ${i < count ? 'filled' : ''}" onclick="toggleWater(${i})"></div>
  `).join('');
  document.getElementById('waterCount').textContent = count;
}

function toggleWater(idx) {
  const { all, key, day } = getLog();
  day.water = idx < day.water ? idx : idx + 1;
  all[key] = day;
  saveLog(all);
  renderWater(day.water);
}

// ===== DELETE ENTRY =====
function deleteEntry(meal, id) {
  const { all, key, day } = getLog();
  day[meal] = day[meal].filter(e => e.id !== id);
  all[key] = day;
  saveLog(all);
  renderAll();
  showToast('Entry removed');
}

// ===== MODAL =====
let selectedMeal = 'breakfast';

function openFoodModal(meal) {
  if (meal) {
    selectedMeal = meal;
    document.querySelectorAll('.meal-sel-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-meal') === meal);
    });
  }
  clearFoodModal();
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('foodSearch').focus(), 100);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function selectMeal(btn) {
  document.querySelectorAll('.meal-sel-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedMeal = btn.getAttribute('data-meal');
}

function searchFoods() {
  const q = document.getElementById('foodSearch').value.toLowerCase();
  const results = document.getElementById('foodResults');
  if (!q) { results.innerHTML = ''; return; }
  const matches = foodDB.filter(f => f.name.toLowerCase().includes(q)).slice(0, 8);
  results.innerHTML = matches.map(f => `
    <div class="food-result-item" onclick="quickAddFood(${JSON.stringify(f).replace(/"/g,'&quot;')})">
      <div class="fri-left">
        <strong>${f.icon} ${f.name}</strong>
        <span>${f.protein}g P · ${f.carbs}g C · ${f.fats}g F · ${f.serving}</span>
      </div>
      <div class="fri-cals">${f.calories}</div>
    </div>
  `).join('') || '<div style="padding:0.8rem;font-size:0.8rem;color:var(--muted)">No results found</div>';
}

function quickAddFood(food) {
  const { all, key, day } = getLog();
  day[selectedMeal].push({ ...food, id: Date.now() });
  all[key] = day;
  saveLog(all);
  closeModal();
  renderAll();
  showToast(`✅ Added: ${food.name}`);
}

function addFood() {
  const name = document.getElementById('foodName').value.trim();
  const cals = parseInt(document.getElementById('foodCals').value) || 0;
  const protein = parseFloat(document.getElementById('foodProtein').value) || 0;
  const carbs = parseFloat(document.getElementById('foodCarbs').value) || 0;
  const fats = parseFloat(document.getElementById('foodFats').value) || 0;
  const serving = document.getElementById('foodServing').value || '100g';
  if (!name) { showToast('⚠️ Please enter a food name', 'warn'); return; }
  const icons = { chicken:'🍗', rice:'🍚', egg:'🥚', fish:'🐟', protein:'💪', bread:'🍞', veg:'🥦', fruit:'🍎', milk:'🥛', other:'🍽️' };
  const icon = Object.keys(icons).find(k => name.toLowerCase().includes(k)) ? icons[Object.keys(icons).find(k => name.toLowerCase().includes(k))] : '🍽️';
  const { all, key, day } = getLog();
  day[selectedMeal].push({ id:Date.now(), name, icon, calories:cals, protein, carbs, fats, fiber:0, serving });
  all[key] = day;
  saveLog(all);
  closeModal();
  renderAll();
  showToast(`✅ Added: ${name}`);
}

function clearFoodModal() {
  document.getElementById('foodSearch').value = '';
  document.getElementById('foodResults').innerHTML = '';
  document.getElementById('foodName').value = '';
  document.getElementById('foodCals').value = '';
  document.getElementById('foodProtein').value = '';
  document.getElementById('foodCarbs').value = '';
  document.getElementById('foodFats').value = '';
  document.getElementById('foodServing').value = '';
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
seedDefaultData();
updateDateDisplay();
renderAll();