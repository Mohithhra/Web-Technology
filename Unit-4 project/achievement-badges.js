// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== BADGE DATABASE (48 badges) =====
const ALL_BADGES = [
  // ── STREAK ──
  { id:'s1',  cat:'streak',    icon:'🔥', name:'First Flame',      rarity:'common',    xp:50,   desc:'Log your very first workout and ignite the journey.',         req:'Complete 1 workout',                progress:1,  goal:1  },
  { id:'s2',  cat:'streak',    icon:'🔥', name:'Week Warrior',     rarity:'common',    xp:100,  desc:'7 days straight of showing up. Habits are being formed.',      req:'Maintain a 7-day streak',            progress:7,  goal:7  },
  { id:'s3',  cat:'streak',    icon:'🔥', name:'Fortnight Fire',   rarity:'rare',      xp:200,  desc:'14 days without missing a session. The streak is real.',       req:'Maintain a 14-day streak',           progress:12, goal:14 },
  { id:'s4',  cat:'streak',    icon:'🔥', name:'Month of Iron',    rarity:'rare',      xp:400,  desc:'30 consecutive days. You are no longer a beginner.',           req:'Maintain a 30-day streak',           progress:12, goal:30 },
  { id:'s5',  cat:'streak',    icon:'⚡', name:'60-Day Inferno',   rarity:'epic',      xp:800,  desc:'Two solid months of consistency. Legends are made like this.', req:'Maintain a 60-day streak',           progress:12, goal:60 },
  { id:'s6',  cat:'streak',    icon:'💎', name:'100-Day Diamond',  rarity:'legendary', xp:2000, desc:'100 days without breaking. You are an IronForge legend.',      req:'Maintain a 100-day streak',          progress:12, goal:100},
  { id:'s7',  cat:'streak',    icon:'🌅', name:'Early Bird',       rarity:'common',    xp:75,   desc:'10 workouts logged before 7AM. The sunrise belongs to you.',   req:'Log 10 morning workouts (before 7AM)',progress:4,  goal:10 },
  { id:'s8',  cat:'streak',    icon:'🌙', name:'Night Owl',        rarity:'common',    xp:75,   desc:'10 workouts after 8PM. The gym is yours when it\'s quiet.',    req:'Log 10 evening workouts (after 8PM)', progress:3,  goal:10 },

  // ── STRENGTH ──
  { id:'w1',  cat:'strength',  icon:'💪', name:'Iron Initiate',    rarity:'common',    xp:50,   desc:'Your first strength session is in the books. Welcome to the iron.',  req:'Log your first strength workout',    progress:1,  goal:1  },
  { id:'w2',  cat:'strength',  icon:'🏋️', name:'10 Rep Club',     rarity:'common',    xp:100,  desc:'10 strength sessions completed. You\'re building something real.',   req:'Complete 10 strength workouts',      progress:10, goal:10 },
  { id:'w3',  cat:'strength',  icon:'🏋️', name:'Iron 25',         rarity:'common',    xp:150,  desc:'25 sessions under the bar. Form is improving.',                      req:'Complete 25 strength workouts',      progress:25, goal:25 },
  { id:'w4',  cat:'strength',  icon:'⚡', name:'Iron 50',          rarity:'rare',      xp:300,  desc:'50 strength sessions. You know your way around a barbell.',          req:'Complete 50 strength workouts',      progress:47, goal:50 },
  { id:'w5',  cat:'strength',  icon:'🔥', name:'Century Lifter',   rarity:'epic',      xp:750,  desc:'100 strength sessions. You are stronger than 95% of the world.',    req:'Complete 100 strength workouts',     progress:47, goal:100},
  { id:'w6',  cat:'strength',  icon:'💎', name:'Iron Legion',      rarity:'legendary', xp:2500, desc:'250 strength sessions. An unbreakable wall of muscle and will.',     req:'Complete 250 strength workouts',     progress:47, goal:250},
  { id:'w7',  cat:'strength',  icon:'🏆', name:'First PR',         rarity:'common',    xp:100,  desc:'You logged your first personal record. The numbers don\'t lie.',     req:'Log your first PR',                  progress:1,  goal:1  },
  { id:'w8',  cat:'strength',  icon:'🏆', name:'PR Machine',       rarity:'rare',      xp:350,  desc:'10 personal records logged across any lift.',                        req:'Log 10 PRs total',                   progress:8,  goal:10 },
  { id:'w9',  cat:'strength',  icon:'👑', name:'PR Royalty',       rarity:'epic',      xp:900,  desc:'25 PRs. Every single one was earned through hard work.',             req:'Log 25 PRs total',                   progress:8,  goal:25 },

  // ── CARDIO ──
  { id:'c1',  cat:'cardio',    icon:'🏃', name:'First Mile',       rarity:'common',    xp:50,   desc:'Your first cardio session done. The heart is getting stronger.',    req:'Complete your first cardio session',  progress:1,  goal:1  },
  { id:'c2',  cat:'cardio',    icon:'🏃', name:'Cardio Rookie',    rarity:'common',    xp:100,  desc:'10 cardio sessions complete. Your lungs thank you.',                 req:'Complete 10 cardio sessions',        progress:9,  goal:10 },
  { id:'c3',  cat:'cardio',    icon:'⚡', name:'Cardio Warrior',   rarity:'rare',      xp:250,  desc:'25 cardio sessions. Endurance is your new superpower.',              req:'Complete 25 cardio sessions',        progress:9,  goal:25 },
  { id:'c4',  cat:'cardio',    icon:'🔥', name:'Cardio Machine',   rarity:'epic',      xp:600,  desc:'50 cardio sessions. Your VO2 max is off the charts.',                req:'Complete 50 cardio sessions',        progress:9,  goal:50 },
  { id:'c5',  cat:'cardio',    icon:'💎', name:'Endurance Legend', rarity:'legendary', xp:1500, desc:'100 cardio sessions. You could run a marathon in your sleep.',       req:'Complete 100 cardio sessions',       progress:9,  goal:100},
  { id:'c6',  cat:'cardio',    icon:'🌊', name:'Calorie Crusher',  rarity:'rare',      xp:300,  desc:'Burned 10,000 calories total across all sessions.',                  req:'Burn 10,000 total calories',         progress:7840,goal:10000},
  { id:'c7',  cat:'cardio',    icon:'🔥', name:'Inferno Mode',     rarity:'epic',      xp:700,  desc:'Burned 50,000 calories. You\'re basically a furnace.',               req:'Burn 50,000 total calories',         progress:7840,goal:50000},

  // ── NUTRITION ──
  { id:'n1',  cat:'nutrition', icon:'🥗', name:'First Log',        rarity:'common',    xp:50,   desc:'You logged your first meal. Awareness is the first step.',           req:'Log your first meal',                progress:1,  goal:1  },
  { id:'n2',  cat:'nutrition', icon:'🥗', name:'7-Day Logger',     rarity:'common',    xp:150,  desc:'7 days of consistent nutrition logging. You know what you\'re eating.',req:'Log meals for 7 consecutive days',  progress:7,  goal:7  },
  { id:'n3',  cat:'nutrition', icon:'🥗', name:'30-Day Logger',    rarity:'rare',      xp:400,  desc:'30 days of tracking. Your macros are dialled in.',                   req:'Log meals for 30 consecutive days',  progress:14, goal:30 },
  { id:'n4',  cat:'nutrition', icon:'💪', name:'Protein King',     rarity:'rare',      xp:250,  desc:'Hit your protein goal 14 days in a row. Muscles are growing.',       req:'Hit protein goal 14 days in a row',  progress:6,  goal:14 },
  { id:'n5',  cat:'nutrition', icon:'💧', name:'Hydration Hero',   rarity:'common',    xp:100,  desc:'Drank 8 glasses of water for 7 consecutive days.',                   req:'Hit water goal 7 days in a row',     progress:5,  goal:7  },
  { id:'n6',  cat:'nutrition', icon:'🌟', name:'Macro Master',     rarity:'epic',      xp:600,  desc:'Hit all macros (protein, carbs, fat) on the same day — 5 times.',   req:'Hit all macro goals 5 times',        progress:2,  goal:5  },
  { id:'n7',  cat:'nutrition', icon:'🥑', name:'Clean Eater',      rarity:'rare',      xp:300,  desc:'Logged under 2000 calories while hitting protein goal — 7 days.',   req:'Hit protein goal while under 2000 kcal, 7 times',progress:4,goal:7},

  // ── COMMUNITY ──
  { id:'co1', cat:'community', icon:'👥', name:'Social Butterfly',  rarity:'common',    xp:75,   desc:'Your first post in the community feed. Welcome to the tribe.',      req:'Post in the community feed',          progress:1,  goal:1  },
  { id:'co2', cat:'community', icon:'🔥', name:'Hype Machine',      rarity:'common',    xp:100,  desc:'Liked 25 posts in the community. Spreading the energy.',             req:'Like 25 community posts',             progress:14, goal:25 },
  { id:'co3', cat:'community', icon:'💬', name:'Conversationalist', rarity:'rare',      xp:200,  desc:'Left 20 comments. Your wisdom is valued here.',                      req:'Comment on 20 posts',                 progress:8,  goal:20 },
  { id:'co4', cat:'community', icon:'🏆', name:'Challenge Champ',   rarity:'rare',      xp:350,  desc:'Completed 3 community challenges from start to finish.',             req:'Complete 3 community challenges',     progress:1,  goal:3  },
  { id:'co5', cat:'community', icon:'👑', name:'Community Legend',  rarity:'legendary', xp:2000, desc:'100 posts, 500 likes received. You are the heartbeat of IronForge.', req:'Get 500 likes on your posts',         progress:47, goal:500},
  { id:'co6', cat:'community', icon:'🌟', name:'Top 10',            rarity:'epic',      xp:800,  desc:'Reached the Top 10 on any leaderboard category.',                   req:'Rank in the Top 10 on leaderboard',   progress:1,  goal:1  },

  // ── SPECIAL ──
  { id:'sp1', cat:'special',   icon:'🎯', name:'First Month',       rarity:'common',    xp:200,  desc:'One full month as an IronForge member. The journey begins.',        req:'Be a member for 30 days',             progress:1,  goal:1  },
  { id:'sp2', cat:'special',   icon:'🎯', name:'Quarter Century',   rarity:'rare',      xp:500,  desc:'6 months with IronForge. You\'re in it for the long haul.',         req:'Be a member for 180 days',            progress:1,  goal:1  },
  { id:'sp3', cat:'special',   icon:'💎', name:'One Year Strong',   rarity:'epic',      xp:1200, desc:'A full year of IronForge. Most people quit in week 2.',              req:'Be a member for 365 days',            progress:0,  goal:1  },
  { id:'sp4', cat:'special',   icon:'⚡', name:'Pro Upgrade',       rarity:'rare',      xp:300,  desc:'You upgraded to Pro. Unlocking the full power of IronForge.',       req:'Upgrade to Pro or Elite plan',        progress:1,  goal:1  },
  { id:'sp5', cat:'special',   icon:'👑', name:'Elite Member',      rarity:'epic',      xp:1000, desc:'Elite status unlocked. The pinnacle of IronForge membership.',       req:'Upgrade to Elite plan',               progress:0,  goal:1  },
  { id:'sp6', cat:'special',   icon:'🔥', name:'All-Rounder',       rarity:'epic',      xp:750,  desc:'Logged strength, cardio and nutrition in the same week.',            req:'Log strength, cardio & nutrition in 1 week',progress:1,goal:1},
  { id:'sp7', cat:'special',   icon:'🏆', name:'Perfect Week',      rarity:'legendary', xp:1500, desc:'7 days: workouts every day + all macros hit + 8 glasses water.',    req:'Hit all daily goals for 7 straight days',progress:0,goal:7},
  { id:'sp8', cat:'special',   icon:'💎', name:'IronForge Legend',  rarity:'legendary', xp:5000, desc:'The ultimate badge. Only the most dedicated members earn this.',     req:'Earn 30 other badges',                progress:18, goal:30 },
];

// Which badges are earned
const EARNED_IDS = ['s1','s2','s3','s7','w1','w2','w3','w7','c1','n1','n2','n5','co1','sp1','sp4','sp6','w4','co2'];
const NEW_IDS    = ['w4','co2','n2']; // recently unlocked (show banner)

// ===== STATE =====
let activeFilter = 'all';

// ===== FILTER =====
function setFilter(btn, filter) {
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = filter;
  renderBadges();
}

// ===== RENDER PROFILE HERO =====
function renderHero() {
  const earned = EARNED_IDS.length;
  const total  = ALL_BADGES.length;
  const xp     = ALL_BADGES.filter(b => EARNED_IDS.includes(b.id)).reduce((a, b) => a + b.xp, 0);
  const level  = Math.floor(xp / 1000) + 1;
  const levelXP = (level - 1) * 1000;
  const nextXP  = level * 1000;
  const pct     = ((xp - levelXP) / (nextXP - levelXP)) * 100;

  document.getElementById('phsEarned').textContent  = earned;
  document.getElementById('phsTotal').textContent   = total;
  document.getElementById('phsPoints').textContent  = xp.toLocaleString();
  document.getElementById('phsLevel').textContent   = level;
  document.getElementById('xpLevelLabel').textContent  = `Level ${level}`;
  document.getElementById('xpNextLabel').textContent   = `Level ${level + 1}`;
  document.getElementById('xpProgressLabel').textContent = `${xp.toLocaleString()} / ${nextXP.toLocaleString()} XP`;
  setTimeout(() => { document.getElementById('xpBarFill').style.width = pct + '%'; }, 200);
}

// ===== RENDER RECENT UNLOCKS BANNER =====
function renderRecent() {
  const recent = ALL_BADGES.filter(b => NEW_IDS.includes(b.id));
  if (!recent.length) return;
  document.getElementById('recentUnlocks').innerHTML = `
    <div style="width:100%;padding:0 0 0.5rem;font-size:0.68rem;font-weight:700;letter-spacing:3px;color:var(--accent);">🎉 NEWLY UNLOCKED</div>
    ${recent.map(b => `
      <div class="unlock-pill">
        <span class="unlock-pill-icon">${b.icon}</span>
        <div class="unlock-pill-text">
          <strong>${b.name}</strong>
          <span>+${b.xp} XP · ${b.cat}</span>
        </div>
      </div>`).join('')}`;
}

// ===== RENDER BADGES GRID =====
function renderBadges() {
  let list = ALL_BADGES;
  if (activeFilter === 'earned') list = list.filter(b =>  EARNED_IDS.includes(b.id));
  else if (activeFilter === 'locked') list = list.filter(b => !EARNED_IDS.includes(b.id));
  else if (!['all','earned','locked'].includes(activeFilter)) list = list.filter(b => b.cat === activeFilter);

  document.getElementById('filterCount').textContent = `${list.length} badge${list.length !== 1 ? 's' : ''}`;

  const rarityOrder = { legendary:0, epic:1, rare:2, common:3 };
  list = [...list].sort((a, b) => {
    const ae = EARNED_IDS.includes(a.id), be = EARNED_IDS.includes(b.id);
    if (ae !== be) return ae ? -1 : 1;
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  });

  document.getElementById('badgesGrid').innerHTML = list.map((b, i) => {
    const earned = EARNED_IDS.includes(b.id);
    const isNew  = NEW_IDS.includes(b.id);
    const pct    = Math.min((b.progress / b.goal) * 100, 100);
    const barColor = { streak:'var(--primary)', strength:'var(--blue)', cardio:'var(--green)', nutrition:'var(--accent)', community:'var(--purple)', special:'var(--primary)' }[b.cat];
    const rarityLabel = { common:'Common', rare:'Rare', epic:'Epic', legendary:'Legendary' }[b.rarity];

    return `
      <div class="badge-card ${earned ? 'earned' : 'locked'} cat-${b.cat} rarity-${b.rarity} ${isNew ? 'new-unlock' : ''}"
           style="animation-delay:${i * 0.04}s" onclick="openModal('${b.id}')">
        <span class="badge-xp-chip">+${b.xp} XP</span>
        <div class="badge-icon-wrap">
          <span class="badge-icon">${b.icon}</span>
          ${!earned ? '<div class="badge-lock-overlay">🔒</div>' : ''}
        </div>
        <div class="badge-rarity">${rarityLabel}</div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-short-desc">${b.desc}</div>
        <div class="badge-card-progress">
          <div class="bcp-bar-bg"><div class="bcp-bar-fill" style="width:${pct}%;background:${barColor}"></div></div>
          <div class="bcp-label"><span>${b.req.length > 28 ? b.req.slice(0,28)+'…' : b.req}</span><span>${b.progress}/${b.goal}</span></div>
        </div>
        ${earned ? `<div class="badge-earned-date">✅ Earned</div>` : ''}
      </div>`;
  }).join('');
}

// ===== MODAL =====
function openModal(id) {
  const b = ALL_BADGES.find(x => x.id === id);
  if (!b) return;
  const earned = EARNED_IDS.includes(b.id);
  const pct = Math.min((b.progress / b.goal) * 100, 100);
  const rarityColors = { common:'var(--muted-2)', rare:'var(--blue)', epic:'var(--purple)', legendary:'var(--gold)' };
  const catColors    = { streak:'var(--primary)', strength:'var(--blue)', cardio:'var(--green)', nutrition:'var(--accent)', community:'var(--purple)', special:'var(--primary)' };
  const rarityLabel  = { common:'Common', rare:'Rare ✦', epic:'Epic ✦✦', legendary:'Legendary ✦✦✦' }[b.rarity];

  document.getElementById('modalBadgeHero').innerHTML = `
    <span class="big-icon">${b.icon}</span>
    <div style="font-size:0.68rem;font-weight:700;letter-spacing:3px;color:${rarityColors[b.rarity]};text-transform:uppercase;margin-bottom:0.3rem">${rarityLabel}</div>`;

  document.getElementById('modalBadgeName').textContent = b.name;
  document.getElementById('modalBadgeCat').textContent  = b.cat.charAt(0).toUpperCase() + b.cat.slice(1) + ' Achievement';
  document.getElementById('modalBadgeDesc').textContent  = b.desc;

  document.getElementById('modalBadgeReq').innerHTML = `<h5>Requirement</h5><p>${b.req}</p>`;

  document.getElementById('modalBadgeProgress').innerHTML = `
    <div class="mp-bar-bg"><div class="mp-bar-fill" style="width:0%;background:${catColors[b.cat]}"></div></div>
    <div class="mp-label"><span>${earned ? '✅ Completed!' : `${b.progress} / ${b.goal}`}</span><span>${Math.round(pct)}%</span></div>`;

  document.getElementById('modalBadgeReward').innerHTML = `
    <span class="reward-icon">⚡</span>
    <div><strong>+${b.xp} XP Points</strong><span>Awarded upon completion</span></div>`;

  document.getElementById('modalBadgeEarned').style.display = earned ? 'block' : 'none';
  document.getElementById('modalBadgeEarned').textContent   = '🎉 You\'ve earned this badge!';

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const fill = document.querySelector('#modalBadgeProgress .mp-bar-fill');
    if (fill) fill.style.width = pct + '%';
  }, 100);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
renderHero();
renderRecent();
renderBadges();