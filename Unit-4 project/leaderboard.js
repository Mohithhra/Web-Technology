// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== HELPERS =====
const avatarColors = ['#ff4500','#e91e8c','#3b82f6','#00c851','#ff9800','#8b5cf6','#06b6d4','#f59e0b','#ef4444','#10b981'];
function getColor(name) { let h = 0; for (let c of name) h = (h * 31 + c.charCodeAt(0)) % avatarColors.length; return avatarColors[h]; }
function getInitials(name) { return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase(); }

// ===== MEMBER DATA =====
const members = [
  { id:1,  name:'Coach Arjun',    plan:'Elite',   badges:['🔥','⚡','🏆','💎'], weekly:{points:1240,workouts:7,calories:4820,streak:45,pr:3}, monthly:{points:4820,workouts:28,calories:19600,streak:45,pr:8}, alltime:{points:18400,workouts:312,calories:96000,streak:45,pr:24}, trend:'up',   delta:'+2' },
  { id:2,  name:'Sneha Pillai',   plan:'Pro',     badges:['🔥','🏆','⚡'],      weekly:{points:1080,workouts:6,calories:3910,streak:38,pr:2}, monthly:{points:3910,workouts:24,calories:15200,streak:38,pr:5}, alltime:{points:14200,workouts:241,calories:72000,streak:38,pr:18}, trend:'up',   delta:'+1' },
  { id:3,  name:'Vikram Iyer',    plan:'Elite',   badges:['🔥','⚡'],           weekly:{points:940, workouts:6,calories:3540,streak:30,pr:1}, monthly:{points:3540,workouts:22,calories:13800,streak:30,pr:4}, alltime:{points:12800,workouts:198,calories:68000,streak:30,pr:15}, trend:'down', delta:'-1' },
  { id:4,  name:'Priya Menon',    plan:'Pro',     badges:['🔥','🏆'],           weekly:{points:820, workouts:5,calories:3210,streak:22,pr:2}, monthly:{points:3210,workouts:20,calories:12400,streak:22,pr:6}, alltime:{points:11200,workouts:174,calories:58000,streak:22,pr:19}, trend:'up',   delta:'+3' },
  { id:5,  name:'Rahul Nair',     plan:'Pro',     badges:['⚡'],                weekly:{points:760, workouts:5,calories:2980,streak:18,pr:1}, monthly:{points:2980,workouts:19,calories:11600,streak:18,pr:3}, alltime:{points:9800,workouts:152,calories:48000,streak:18,pr:11},  trend:'same', delta:'—'  },
  { id:6,  name:'Meera Kapoor',   plan:'Elite',   badges:['🔥','🏆','⚡'],      weekly:{points:720, workouts:4,calories:2720,streak:15,pr:1}, monthly:{points:2720,workouts:16,calories:10800,streak:15,pr:4}, alltime:{points:8600,workouts:138,calories:42000,streak:15,pr:13},  trend:'up',   delta:'+2' },
  { id:7,  name:'Kiran Reddy',    plan:'Starter', badges:['⚡'],                weekly:{points:680, workouts:4,calories:2540,streak:14,pr:0}, monthly:{points:2540,workouts:15,calories:9800,streak:14,pr:2},  alltime:{points:7400,workouts:112,calories:36000,streak:14,pr:7},   trend:'up',   delta:'+4' },
  { id:8,  name:'Deepa Singh',    plan:'Pro',     badges:['🏆'],                weekly:{points:620, workouts:4,calories:2320,streak:12,pr:1}, monthly:{points:2320,workouts:14,calories:8900,streak:12,pr:3},  alltime:{points:6800,workouts:98,calories:32000,streak:12,pr:9},    trend:'down', delta:'-2' },
  { id:9,  name:'Mohithhra P',   plan:'Pro',     badges:['🔥'],                weekly:{points:580, workouts:4,calories:2180,streak:12,pr:1}, monthly:{points:2180,workouts:13,calories:8400,streak:12,pr:3},  alltime:{points:6200,workouts:87,calories:28000,streak:12,pr:8},    trend:'up',   delta:'+1', isYou:true },
  { id:10, name:'Ananya Iyer',    plan:'Starter', badges:[],                    weekly:{points:520, workouts:3,calories:1980,streak:9,pr:0},  monthly:{points:1980,workouts:12,calories:7600,streak:9,pr:1},   alltime:{points:5400,workouts:74,calories:24000,streak:9,pr:4},     trend:'up',   delta:'+2' },
  { id:11, name:'Suresh Kumar',   plan:'Starter', badges:[],                    weekly:{points:480, workouts:3,calories:1840,streak:8,pr:0},  monthly:{points:1840,workouts:11,calories:7000,streak:8,pr:1},   alltime:{points:4800,workouts:62,calories:21000,streak:8,pr:3},     trend:'down', delta:'-1' },
  { id:12, name:'Nisha Verma',    plan:'Pro',     badges:['🏆'],                weekly:{points:440, workouts:3,calories:1680,streak:7,pr:1},  monthly:{points:1680,workouts:10,calories:6400,streak:7,pr:2},   alltime:{points:4200,workouts:54,calories:18000,streak:7,pr:6},     trend:'same', delta:'—'  },
  { id:13, name:'Aditya Rao',     plan:'Starter', badges:[],                    weekly:{points:400, workouts:2,calories:1520,streak:6,pr:0},  monthly:{points:1520,workouts:9,calories:5800,streak:6,pr:0},    alltime:{points:3600,workouts:46,calories:15000,streak:6,pr:2},     trend:'up',   delta:'+3' },
  { id:14, name:'Lakshmi Nair',   plan:'Starter', badges:[],                    weekly:{points:360, workouts:2,calories:1380,streak:5,pr:0},  monthly:{points:1380,workouts:8,calories:5200,streak:5,pr:1},    alltime:{points:3000,workouts:38,calories:12000,streak:5,pr:1},     trend:'down', delta:'-3' },
  { id:15, name:'Ravi Shankar',   plan:'Elite',   badges:['⚡','🏆'],           weekly:{points:320, workouts:2,calories:1240,streak:4,pr:1},  monthly:{points:1240,workouts:7,calories:4600,streak:4,pr:2},    alltime:{points:2400,workouts:29,calories:9000,streak:4,pr:4},      trend:'up',   delta:'+5' },
];

// ===== STATE =====
let activePeriod = 'weekly';
let activeCategory = 'points';
let searchQuery = '';

// ===== CATEGORY / PERIOD CONTROLS =====
function setPeriod(btn, period) {
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activePeriod = period;
  render();
}
function setCategory(btn, cat) {
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeCategory = cat;
  render();
}

// ===== SORT + SCORE =====
function getScore(m) { return m[activePeriod][activeCategory]; }
function getSortedMembers() {
  return [...members].sort((a, b) => getScore(b) - getScore(a));
}
function getScoreLabel() {
  return { points:'pts', workouts:'sessions', streak:'days', calories:'kcal', pr:'PRs' }[activeCategory];
}

// ===== RENDER PODIUM =====
function renderPodium(sorted) {
  const top3 = sorted.slice(0, 3);
  const order = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd layout
  const placeClass = ['second','first','third'];
  const medals = ['🥈','🥇','🥉'];
  const crowns = ['','👑',''];

  document.getElementById('podium').innerHTML = order.map((m, i) => {
    if (!m) return '';
    const realRank = order === order ? [2,1,3][i] : i+1;
    const color = getColor(m.name);
    const score = getScore(m);
    const label = getScoreLabel();
    const blockNums = ['2','1','3'];
    return `
      <div class="podium-place ${placeClass[i]}">
        <div class="podium-card">
          ${crowns[i] ? `<div class="podium-crown">${crowns[i]}</div>` : ''}
          <div class="podium-rank-medal">${medals[i]}</div>
          <div class="podium-avatar" style="background:${color}">${getInitials(m.name)}</div>
          <div class="podium-name">${m.name.split(' ')[0]}</div>
          <div class="podium-score">${score.toLocaleString()}</div>
          <div class="podium-score-label">${label}</div>
          <div class="podium-badge-row">${m.badges.map(b => `<span class="podium-badge">${b}</span>`).join('')}</div>
        </div>
        <div class="podium-block">
          <span class="podium-block-num">${blockNums[i]}</span>
        </div>
      </div>`;
  }).join('');
}

// ===== RENDER YOUR RANK BANNER =====
function renderYourRank(sorted) {
  const you = members.find(m => m.isYou);
  if (!you) return;
  const rank = sorted.findIndex(m => m.isYou) + 1;
  const score = getScore(you);
  const label = getScoreLabel();
  const above = sorted[rank - 2];
  const gap = above ? getScore(above) - score : 0;

  document.getElementById('yourRankBanner').innerHTML = `
    <div>
      <div class="yrb-label">Your Rank</div>
      <div class="yrb-rank">#${rank}</div>
    </div>
    <div class="yrb-divider"></div>
    <div class="yrb-info">
      <strong>${you.name}</strong>
      <span>${you.plan} Member · 🔥 ${you[activePeriod].streak} day streak</span>
    </div>
    <div class="yrb-stats">
      <div class="yrb-stat"><strong>${score.toLocaleString()}</strong><span>${label}</span></div>
      <div class="yrb-stat"><strong>${you[activePeriod].workouts}</strong><span>Workouts</span></div>
      ${above ? `<div class="yrb-stat"><strong>${gap.toLocaleString()}</strong><span>${label} to #${rank-1}</span></div>` : '<div class="yrb-stat"><strong>👑</strong><span>Top Rank!</span></div>'}
    </div>
    <div class="yrb-trend ${you.trend}">${you.trend === 'up' ? '▲' : you.trend === 'down' ? '▼' : '—'} ${you.delta} places this week</div>
  `;
}

// ===== RENDER TABLE =====
function renderTable(sorted) {
  const q = searchQuery.toLowerCase();
  const filtered = q ? sorted.filter(m => m.name.toLowerCase().includes(q)) : sorted;
  const label = getScoreLabel();

  const head = `
    <div class="lb-table-head">
      <span class="lb-th">Rank</span>
      <span class="lb-th">Member</span>
      <span class="lb-th right">Badges</span>
      <span class="lb-th right">Score</span>
      <span class="lb-th right">Streak</span>
      <span class="lb-th right">Trend</span>
    </div>`;

  const rows = filtered.map((m, filtIdx) => {
    const realRank = sorted.findIndex(s => s.id === m.id) + 1;
    const rankClass = realRank === 1 ? 'r1' : realRank === 2 ? 'r2' : realRank === 3 ? 'r3' : m.isYou ? 'you-rank' : '';
    const rowClass = m.isYou ? 'you' : realRank <= 3 ? 'top3' : '';
    const scoreClass = realRank === 1 ? 'gold' : realRank === 2 ? 'silver' : realRank === 3 ? 'bronze' : m.isYou ? 'you-score' : '';
    const trendIcon = m.trend === 'up' ? `▲ ${m.delta}` : m.trend === 'down' ? `▼ ${m.delta}` : '— Same';
    const score = getScore(m);

    return `
      <div class="lb-row ${rowClass}">
        <span class="lb-rank ${rankClass}">${realRank <= 3 ? ['🥇','🥈','🥉'][realRank-1] : '#'+realRank}</span>
        <div class="lb-user">
          <div class="lb-avatar" style="background:${getColor(m.name)}">${getInitials(m.name)}</div>
          <div class="lb-user-info">
            <strong>${m.name}${m.isYou ? ' <span style="color:var(--primary);font-size:0.68rem">(You)</span>' : ''}</strong>
            <span>${m.plan} · ${m[activePeriod].workouts} sessions</span>
          </div>
        </div>
        <div class="lb-badges">${m.badges.map(b => `<span class="lb-badge-icon">${b}</span>`).join('') || '<span style="color:var(--muted);font-size:0.75rem">—</span>'}</div>
        <span class="lb-score ${scoreClass}">${score.toLocaleString()} <span style="font-size:0.65rem;color:var(--muted)">${label}</span></span>
        <div class="lb-streak">🔥 ${m[activePeriod].streak}d</div>
        <span class="lb-trend ${m.trend}">${trendIcon}</span>
      </div>`;
  }).join('');

  document.getElementById('lbTable').innerHTML = head + rows;
}

// ===== FILTER TABLE =====
function filterTable() {
  searchQuery = document.getElementById('searchInput').value;
  renderTable(getSortedMembers());
}

// ===== FULL RENDER =====
function render() {
  const sorted = getSortedMembers();
  renderPodium(sorted);
  renderYourRank(sorted);
  renderTable(sorted);
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
render();