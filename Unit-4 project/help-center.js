// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== FAQ DATABASE =====
const FAQ_DATA = [
  // GETTING STARTED
  { id:'gs1', cat:'getting-started', icon:'🚀', q:'How do I get started with IronForge?',
    a:`<p>Welcome to IronForge! Here's how to hit the ground running:</p>
    <ul><li>Complete your profile in <a onclick="window.location.href='settings-profile.html'">Settings</a> — add your weight, height and fitness goal.</li>
    <li>Head to the <strong>Dashboard</strong> to get an overview of your activity.</li>
    <li>Log your first workout in the <strong>Activity Log</strong> or build one in the <strong>Workout Builder</strong>.</li>
    <li>Set your calorie and macro targets in <strong>Nutrition Settings</strong>.</li></ul>
    <p>Your streak starts the moment you log your first workout. Keep it alive daily!</p>`,
    article: { title:'Getting Started Guide', steps:['Set up your profile', 'Log your first workout', 'Set nutrition goals', 'Explore the community'] }
  },
  { id:'gs2', cat:'getting-started', icon:'📱', q:'Is IronForge available as a mobile app?',
    a:`<p>IronForge is a fully responsive web application that works beautifully on any device — phone, tablet or desktop.</p>
    <p>On mobile, you can add it to your home screen for an app-like experience:</p>
    <ul><li><strong>iOS (Safari):</strong> Tap the Share icon → Add to Home Screen</li>
    <li><strong>Android (Chrome):</strong> Tap the ⋮ menu → Add to Home Screen</li></ul>
    <p>A dedicated native app is on our roadmap for 2026!</p>` },
  { id:'gs3', cat:'getting-started', icon:'🎯', q:'How does the streak system work?',
    a:`<p>Your streak increments by 1 for every day you log at least one workout or activity. Miss a day and your streak resets to zero.</p>
    <div class="tip-box">💡 Tip: Log at least a 10-minute walk or stretch session to keep your streak alive on rest days.</div>
    <p>Milestones: 7-day, 14-day, 30-day, 60-day and 100-day streaks each unlock special badges and XP rewards.</p>` },
  { id:'gs4', cat:'getting-started', icon:'🏆', q:'What are XP points and levels?',
    a:`<p>XP (Experience Points) are earned by completing workouts, logging nutrition, earning badges and participating in the community.</p>
    <p>Every 1,000 XP advances you to the next level. Higher levels unlock profile customisation options and leaderboard recognition.</p>
    <ul><li>Workout logged: 20–50 XP depending on duration</li>
    <li>Badge earned: 50–5,000 XP depending on rarity</li>
    <li>Community post: 10 XP · Like received: 2 XP</li></ul>` },

  // WORKOUTS
  { id:'w1', cat:'workouts', icon:'🏋️', q:'How do I log a workout?',
    a:`<p>There are two ways to log a workout:</p>
    <ul><li><strong>Activity Log:</strong> Tap "Log Workout", fill in the type, duration, calories and trainer. Great for quick logging.</li>
    <li><strong>Workout Builder:</strong> Build a full session with exercises, sets, reps and weights. Then use Active Workout Mode to track live.</li></ul>
    <p>Both methods count towards your streak and XP.</p>` },
  { id:'w2', cat:'workouts', icon:'📋', q:'How do I use the Workout Builder?',
    a:`<p>The Workout Builder lets you create, save and repeat customised routines:</p>
    <ul><li>Browse 30+ exercises in the left panel — filter by muscle group or search by name.</li>
    <li>Click an exercise to add it to your workout canvas on the right.</li>
    <li>Set your reps, sets and weight for each exercise.</li>
    <li>Click <strong>Start Workout</strong> to enter Active Mode — a fullscreen timer with set completion tracking.</li>
    <li>Save your routine to reuse it next session.</li></ul>` },
  { id:'w3', cat:'workouts', icon:'📚', q:'Can I create my own exercises?',
    a:`<p>The Exercise Library currently contains 60 curated exercises across 8 muscle groups with full technique guides.</p>
    <p>Custom exercise creation is coming in the next major update. For now, you can log any workout manually through the Activity Log using a custom name.</p>` },
  { id:'w4', cat:'workouts', icon:'🔥', q:'How are calories burned calculated?',
    a:`<p>Calorie estimates in the Activity Log and Workout Builder are based on MET (Metabolic Equivalent of Task) values combined with your body weight from Settings.</p>
    <div class="warn-box">⚠️ These are estimates only. Actual calorie burn varies based on fitness level, heart rate and individual metabolism.</div>
    <p>For accurate tracking, we recommend using a heart rate monitor and entering your actual calorie data.</p>` },
  { id:'w5', cat:'workouts', icon:'📅', q:'How do I book a class from the Schedule?',
    a:`<p>Head to the <strong>Schedule</strong> page from the main navigation. Browse the 7-day timetable, pick a class and click <strong>Book Now</strong>.</p>
    <ul><li>Enter your name and email in the booking form.</li>
    <li>Your bookings appear in the "My Bookings" section at the bottom of the page.</li>
    <li>You can cancel any booking up to 2 hours before the class.</li></ul>` },

  // NUTRITION
  { id:'n1', cat:'nutrition', icon:'🥗', q:'How do I set up my nutrition goals?',
    a:`<p>Go to <strong>Settings → Nutrition Goals</strong>. You can manually set your daily calorie, protein, carb and fat targets — or click <strong>Auto-Calculate</strong> to have IronForge estimate them from your weight, height, age, activity level and primary goal.</p>
    <p>These targets appear as your daily rings and bars in the Nutrition Tracker.</p>` },
  { id:'n2', cat:'nutrition', icon:'📊', q:'How do I log my meals?',
    a:`<p>Open the <strong>Nutrition Tracker</strong> from the sidebar. Each day is divided into Breakfast, Lunch, Dinner and Snacks.</p>
    <ul><li>Click <strong>Add Food</strong> in any meal section.</li>
    <li>Search from 30 pre-loaded foods or add a custom entry with your own values.</li>
    <li>Use the date navigation arrows to log for any day.</li></ul>
    <p>Your macros and calorie ring update in real time as you log.</p>` },
  { id:'n3', cat:'nutrition', icon:'💧', q:'How does the water tracker work?',
    a:`<p>The water tracker shows 8 glasses by default (you can change this target in Settings). Click each glass to fill it. Click a filled glass to unfill it.</p>
    <p>Hit your water goal 7 days in a row to earn the 💧 Hydration Hero badge!</p>` },
  { id:'n4', cat:'nutrition', icon:'🔥', q:'What is TDEE and how is it calculated?',
    a:`<p>TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including exercise.</p>
    <p>IronForge uses the <strong>Mifflin-St Jeor formula</strong> to calculate your BMR (Basal Metabolic Rate), then multiplies it by your activity factor:</p>
    <ul><li>Sedentary: ×1.2 · Lightly Active: ×1.375</li>
    <li>Moderately Active: ×1.55 · Very Active: ×1.725</li></ul>
    <p>Your TDEE is shown in the Nutrition Settings panel and updates when you change your stats.</p>` },

  // MEMBERSHIP
  { id:'m1', cat:'membership', icon:'⚡', q:'What are the differences between plans?',
    a:`<p>IronForge offers four plans:</p>
    <ul><li><strong>Starter ₹999/mo</strong> — Gym access (3 days/week), basic workout tracking, nutrition log.</li>
    <li><strong>Pro ₹1,999/mo</strong> — Unlimited gym access, all dashboard features, community, leaderboard.</li>
    <li><strong>Elite ₹3,499/mo</strong> — Everything in Pro + personal trainer sessions, priority class booking, meal planning.</li>
    <li><strong>Digital ₹499/mo</strong> — App-only access, no physical gym visits.</li></ul>
    <p>Switch plans anytime from the <a onclick="window.location.href='membership-plans.html'">Membership Plans</a> page.</p>` },
  { id:'m2', cat:'membership', icon:'💰', q:'How do I upgrade or downgrade my plan?',
    a:`<p>Visit <strong>Membership Plans</strong> from the main navigation. Click the plan you want and complete the checkout. Changes take effect immediately.</p>
    <p>Downgrading mid-cycle will apply at your next renewal date. Upgrading is immediate with prorated billing.</p>` },
  { id:'m3', cat:'membership', icon:'🔄', q:'Can I pause my membership?',
    a:`<p>Yes! You can pause your membership for up to 30 days per year. Contact our support team to request a pause. Your streak and progress data are preserved during the pause.</p>
    <div class="tip-box">💡 Pausing is different from cancelling — your data stays safe and you pick up right where you left off.</div>` },
  { id:'m4', cat:'membership', icon:'💳', q:'What payment methods are accepted?',
    a:`<p>We accept all major payment methods:</p>
    <ul><li>UPI (GPay, PhonePe, Paytm)</li><li>Credit & Debit Cards (Visa, Mastercard, RuPay)</li>
    <li>Net Banking</li><li>EMI options for Elite plan</li></ul>
    <p>All payments are processed securely through Razorpay. We never store your card details.</p>` },

  // ACCOUNT
  { id:'a1', cat:'account', icon:'🔑', q:'How do I reset my password?',
    a:`<p>Click <strong>Forgot Password</strong> on the login page. Enter your registered email address and we'll send you a reset link within 2 minutes.</p>
    <p>The link expires after 30 minutes. If you don't receive the email, check your spam folder or <a onclick="openTicket()">contact support</a>.</p>
    <p>You can also change your password while logged in at <strong>Settings → Change Password</strong>.</p>` },
  { id:'a2', cat:'account', icon:'👤', q:'How do I update my profile information?',
    a:`<p>Go to <strong>Settings → Profile</strong>. You can update your name, email, phone, city, date of birth, gender and bio.</p>
    <p>Click <strong>Save Changes</strong> in the top-right to confirm. Your display name updates immediately across the community and leaderboard.</p>` },
  { id:'a3', cat:'account', icon:'📥', q:'How do I export my data?',
    a:`<p>Go to <strong>Settings → Account → Export My Data</strong>. A JSON file containing all your workout logs, nutrition data, measurements and PRs will download to your device.</p>
    <p>We're working on CSV and PDF export formats — coming soon!</p>` },
  { id:'a4', cat:'account', icon:'🗑️', q:'How do I delete my account?',
    a:`<p>Account deletion is permanent and cannot be undone. All your data — workouts, nutrition, progress, community posts — will be erased.</p>
    <p>If you're sure, go to <strong>Settings → Account → Delete Account</strong>.</p>
    <div class="warn-box">⚠️ Consider exporting your data first. After deletion, recovery is not possible.</div>
    <p>If you're leaving due to a specific issue, please <a onclick="openTicket()">contact our support team</a> first — we'd love to help resolve it.</p>` },

  // COMMUNITY
  { id:'co1', cat:'community', icon:'👥', q:'How does the community feed work?',
    a:`<p>The Community Feed is a shared space for all IronForge members to share workouts, PRs, tips and milestones.</p>
    <ul><li>Use the compose box at the top to create a post.</li>
    <li>Filter posts by type: Workouts, PRs, Tips, Milestones.</li>
    <li>Like posts with the 🔥 button · expand to comment.</li>
    <li>Share your own achievements using the Share button.</li></ul>` },
  { id:'co2', cat:'community', icon:'🏆', q:'How does the leaderboard work?',
    a:`<p>The Leaderboard ranks all members across 5 categories: Points, Workouts, Streak, Calories Burned and PRs. Toggle between Weekly, Monthly and All Time views.</p>
    <p>Your rank is calculated in real time. The Your Rank banner at the top shows how many points you need to overtake the person above you.</p>
    <p>Reaching the Top 10 on any leaderboard category earns the 🌟 Top 10 achievement badge.</p>` },
  { id:'co3', cat:'community', icon:'🎖️', q:'How do I earn achievement badges?',
    a:`<p>Badges are earned automatically when you hit specific milestones — streaks, workout counts, PR records, nutrition consistency and more.</p>
    <p>Visit the <strong>Achievements</strong> page to see all 48 badges, your progress on locked ones, and your total XP and level.</p>
    <p>Newly unlocked badges appear at the top of the page and trigger a push notification (if enabled).</p>` },

  // TECHNICAL
  { id:'t1', cat:'technical', icon:'🔧', q:'My data isn\'t saving — what do I do?',
    a:`<p>IronForge uses your browser's local storage to save data. If data isn't persisting, try these steps:</p>
    <ul><li>Make sure you're not in Private/Incognito mode — local storage is cleared when the session ends.</li>
    <li>Check that your browser isn't set to clear cookies/storage on close.</li>
    <li>Try a hard refresh: <strong>Ctrl+Shift+R</strong> (Windows) or <strong>Cmd+Shift+R</strong> (Mac).</li></ul>
    <div class="warn-box">⚠️ Clearing browser data or cache will also clear your IronForge data. Export your data regularly as a backup.</div>` },
  { id:'t2', cat:'technical', icon:'📶', q:'Does IronForge work offline?',
    a:`<p>Some features work offline (reading cached pages), but logging workouts, updating nutrition and syncing leaderboard data require an internet connection.</p>
    <p>Offline mode with local-first sync is on our development roadmap.</p>` },
  { id:'t3', cat:'technical', icon:'🌐', q:'Which browsers are supported?',
    a:`<p>IronForge works best on modern browsers:</p>
    <ul><li>Chrome 90+ (Recommended)</li><li>Safari 14+</li><li>Firefox 88+</li><li>Edge 90+</li></ul>
    <p>Internet Explorer is not supported. If you're on an older browser, please update for the best experience.</p>` },
  { id:'t4', cat:'technical', icon:'🐛', q:'How do I report a bug?',
    a:`<p>We appreciate bug reports! Use the <strong>Send a Message</strong> form on this page and select <strong>Bug Report</strong> as the subject.</p>
    <p>Please include:</p>
    <ul><li>What you were trying to do</li><li>What happened instead</li><li>Your browser and device</li><li>A screenshot if possible</li></ul>
    <p>We aim to fix critical bugs within 24 hours.</p>` },
];

// ===== STATE =====
let activeCategory = 'all';
let currentArticleId = null;

// ===== RENDER FAQ =====
function renderFAQ(list) {
  const container = document.getElementById('faqWrap');
  if (!list.length) {
    container.innerHTML = '<div class="no-results"><span>🔍</span><p>No articles found. Try a different search or browse categories.</p></div>';
    return;
  }

  // Group by category
  const groups = {};
  const catLabels = {
    'getting-started':'🚀 Getting Started', workouts:'🏋️ Workouts & Training',
    nutrition:'🥗 Nutrition', membership:'⚡ Membership & Plans',
    account:'👤 Account & Profile', community:'👥 Community & Gamification', technical:'🔧 Technical'
  };

  list.forEach(item => {
    if (!groups[item.cat]) groups[item.cat] = [];
    groups[item.cat].push(item);
  });

  container.innerHTML = Object.keys(groups).map(cat => `
    <div class="faq-group">
      <div class="faq-group-title">${catLabels[cat] || cat}</div>
      ${groups[cat].map(item => `
        <div class="faq-item" id="faq-${item.id}">
          <div class="faq-question" onclick="toggleFAQ('${item.id}')">
            <div class="faq-q-left">
              <span class="faq-q-icon">${item.icon}</span>
              <span class="faq-q-text">${item.q}</span>
            </div>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-answer">
            ${item.a}
            ${item.article ? `<span class="faq-read-more" onclick="openArticle('${item.id}')">📄 Full Guide →</span>` : ''}
          </div>
        </div>`).join('')}
    </div>`).join('');
}

// ===== TOGGLE FAQ ITEM =====
function toggleFAQ(id) {
  const item = document.getElementById(`faq-${id}`);
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== CATEGORY FILTER =====
function switchToCategory(cat, btn) {
  activeCategory = cat;
  if (btn) {
    document.querySelectorAll('.hcat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  } else {
    // Called programmatically
    document.querySelectorAll('.hcat').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
  }
  clearSearch();
  const filtered = cat === 'all' ? FAQ_DATA : FAQ_DATA.filter(f => f.cat === cat);
  renderFAQ(filtered);
  document.getElementById('faqWrap').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ===== LIVE SEARCH =====
function liveSearch() {
  const q = document.getElementById('helpSearch').value.trim().toLowerCase();
  document.getElementById('searchClear').style.display = q ? 'block' : 'none';

  const main = document.getElementById('mainContent');
  const cats = document.getElementById('helpCats');
  const faq  = document.getElementById('faqWrap');
  const resultsWrap = document.getElementById('searchResultsWrap');

  if (!q) {
    resultsWrap.style.display = 'none';
    main.style.display = '';
    cats.style.display = '';
    faq.style.display = '';
    return;
  }

  main.style.display = 'none';
  cats.style.display = 'none';
  faq.style.display  = 'none';
  resultsWrap.style.display = 'block';

  const results = FAQ_DATA.filter(f =>
    f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
  );

  const catLabels = {
    'getting-started':'Getting Started', workouts:'Workouts', nutrition:'Nutrition',
    membership:'Membership', account:'Account', community:'Community', technical:'Technical'
  };

  document.getElementById('searchResultsHeader').innerHTML =
    results.length
      ? `Found <strong>${results.length}</strong> result${results.length !== 1 ? 's' : ''} for "<strong>${q}</strong>"`
      : `No results for "<strong>${q}</strong>"`;

  document.getElementById('searchResultsList').innerHTML = results.length
    ? results.map(r => `
        <div class="search-result-item" onclick="openArticleInline('${r.id}')">
          <span class="sri-icon">${r.icon}</span>
          <div class="sri-body">
            <strong>${r.q}</strong>
            <span>${r.a.replace(/<[^>]*>/g,'').slice(0,90)}…</span>
          </div>
          <span class="sri-cat">${catLabels[r.cat]}</span>
        </div>`).join('')
    : '<div class="no-results"><span>🤷</span><p>No articles match your search. Try different keywords or <button style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:inherit" onclick="openTicket()">contact support</button>.</p></div>';
}

function quickSearch(term) {
  document.getElementById('helpSearch').value = term;
  liveSearch();
}

function clearSearch() {
  document.getElementById('helpSearch').value = '';
  document.getElementById('searchClear').style.display = 'none';
  document.getElementById('searchResultsWrap').style.display = 'none';
  document.getElementById('mainContent').style.display = '';
  document.getElementById('helpCats').style.display = '';
  document.getElementById('faqWrap').style.display = '';
}

// ===== ARTICLE MODAL (inline from search) =====
function openArticleInline(id) {
  const item = FAQ_DATA.find(f => f.id === id);
  if (!item) return;
  currentArticleId = id;

  document.getElementById('articleContent').innerHTML = `
    <h2>${item.q}</h2>
    <div class="article-meta">${getCatLabel(item.cat)} · Last updated March 2026</div>
    ${item.a}`;

  document.getElementById('articleModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openArticle(id) { openArticleInline(id); }

function closeArticle() {
  document.getElementById('articleModal').classList.remove('open');
  document.body.style.overflow = '';
}

function markHelpful(yes) {
  showToast(yes ? '👍 Thanks for the feedback!' : '👎 We\'ll improve this article');
  closeArticle();
}

function getCatLabel(cat) {
  return { 'getting-started':'Getting Started', workouts:'Workouts', nutrition:'Nutrition',
    membership:'Membership', account:'Account', community:'Community', technical:'Technical' }[cat] || cat;
}

// ===== TICKET / CONTACT =====
function openTicket() {
  document.getElementById('ticketCard').scrollIntoView({ behavior:'smooth', block:'center' });
  document.getElementById('ticketMessage').focus();
}

function submitTicket() {
  const subject = document.getElementById('ticketSubject').value;
  const message = document.getElementById('ticketMessage').value.trim();
  if (!subject) { showToast('⚠️ Please select a subject', 'warn'); return; }
  if (!message || message.length < 10) { showToast('⚠️ Please enter a message (min 10 characters)', 'warn'); return; }

  const btn = document.querySelector('.btn-submit');
  btn.textContent = '⏳ Sending…';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('ticketSubject').value = '';
    document.getElementById('ticketMessage').value = '';
    btn.textContent = '📩 Send Message';
    btn.disabled = false;
    showToast('✅ Message sent! We\'ll reply within 2 hours.');
  }, 1200);
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ===== KEYBOARD SHORTCUT =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeArticle();
    clearSearch();
  }
});

// ===== INIT =====
renderFAQ(FAQ_DATA);