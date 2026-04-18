// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== AVATAR COLORS =====
const avatarColors = ['#ff4500','#e91e8c','#3b82f6','#00c851','#ff9800','#8b5cf6','#06b6d4','#f59e0b'];
function getColor(name) { let h = 0; for (let c of name) h = (h * 31 + c.charCodeAt(0)) % avatarColors.length; return avatarColors[h]; }
function getInitials(name) { return name.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase(); }

// ===== SEED POSTS =====
const seedPosts = [
  { id:1, user:'Arjun Sharma', type:'pr', content:'New personal record on the Squat today! 5 years of training and I finally hit 140kg for 3 reps. Never stop pushing. 💪🔥', highlight:{ weight:'140', reps:'3', exercise:'Squat' }, tags:['#PR','#squat','#legs','#strength'], likes:47, comments:[{ user:'Priya Menon', text:'Absolute beast! 🔥 Congrats Arjun!' },{ user:'Vikram Iyer', text:'Legends only 💪' }], time:'2 hours ago' },
  { id:2, user:'Priya Menon', type:'workout', content:"Smashed a full upper body session this morning. Hit chest, back and shoulders. 4 exercises per muscle group, progressive overload on everything. Rest days are for the weak 😂", highlight:{ duration:'68', sets:'18', calories:'520' }, tags:['#upperbody','#chest','#back','#shoulders'], likes:31, comments:[{ user:'Sneha Pillai', text:'Those are rookie numbers, get them up 😂' }], time:'4 hours ago' },
  { id:3, user:'Rahul Nair', type:'tip', content:"FORM OVER WEIGHT — always. I spent 6 months ego-lifting and got a shoulder injury that set me back a year. Dropped the weight 30%, fixed my form, and I'm actually stronger now than ever. Your ego has no place in the gym.", tags:['#tip','#form','#injuryprevention','#gymwisdom'], likes:89, comments:[{ user:'Arjun Sharma', text:'Hard lesson but a valuable one. Every beginner needs to hear this.' },{ user:'Meera Kapoor', text:'Sharing this with my entire batch of new students!' }], time:'6 hours ago' },
  { id:4, user:'Sneha Pillai', type:'milestone', content:"🎯 100 WORKOUTS LOGGED! Started from zero 7 months ago — couldn't do a single push-up. Today I hit 100 sessions on IronForge and I feel stronger than I ever thought possible. Thank you to this community! 🙏", tags:['#milestone','#100workouts','#transformation','#community'], likes:124, comments:[{ user:'Priya Menon', text:'This made my day 😭 So proud of you!' },{ user:'Rahul Nair', text:'From zero to HERO 🔥🔥🔥' },{ user:'Coach Arjun', text:'One of my most dedicated students. Well deserved!' }], time:'Yesterday' },
  { id:5, user:'Vikram Iyer', type:'workout', content:"Morning cardio done. 5AM club hitting different this week — 6km run, battle ropes, sled push. The discipline is the reward.", highlight:{ duration:'45', calories:'480', distance:'6km' }, tags:['#cardio','#morningworkout','#5amclub','#discipline'], likes:56, comments:[], time:'Yesterday' },
  { id:6, user:'Meera Kapoor', type:'tip', content:"PROTEIN TIMING MATTERS. Here's what worked for me: 30g within 30 min of waking up, 40g post-workout, and spreading the rest evenly across 4 meals. Hit 160g daily consistently and the muscle gains have been undeniable. Stop guessing, start tracking.", tags:['#nutrition','#protein','#tip','#gains'], likes:73, comments:[{ user:'Sneha Pillai', text:'This is gold. Been struggling with protein timing for months!' }], time:'2 days ago' },
  { id:7, user:'Coach Arjun', type:'milestone', content:"🏆 IronForge just hit 500 ACTIVE MEMBERS! When we started this gym 8 years ago in a small garage, I never imagined building this community. Thank you all for being part of this journey. Free group class for everyone this Saturday! 💪🔥", tags:['#milestone','#ironforge','#community','#500members'], likes:198, comments:[{ user:'Priya Menon', text:"LET'S GOOO 🔥🔥🔥" },{ user:'Rahul Nair', text:'8 years and counting — legends!' },{ user:'Vikram Iyer', text:'See you all Saturday! 💪' }], time:'3 days ago' },
];

// ===== TOP MEMBERS =====
const topMembers = [
  { name:'Coach Arjun', points:4820, streak:45 },
  { name:'Sneha Pillai', points:3910, streak:38 },
  { name:'Vikram Iyer', points:3540, streak:30 },
  { name:'Priya Menon', points:3210, streak:22 },
  { name:'Rahul Nair', points:2980, streak:18 },
];

const trendingTags = [
  { tag:'#strength', count:142 },{ tag:'#cardio', count:118 },{ tag:'#nutrition', count:97 },
  { tag:'#PR', count:84 },{ tag:'#transformation', count:76 },{ tag:'#morningworkout', count:65 },
  { tag:'#legs', count:61 },{ tag:'#tip', count:58 },{ tag:'#milestone', count:52 },{ tag:'#gains', count:49 },
];

// ===== STATE =====
let posts = JSON.parse(localStorage.getItem('ironforge_community_posts') || 'null') || [...seedPosts];
let activeTab = 'all';
let selectedPostType = 'workout';
let liked = JSON.parse(localStorage.getItem('ironforge_liked_posts') || '[]');

function savePosts() { localStorage.setItem('ironforge_community_posts', JSON.stringify(posts)); }

// ===== RENDER POSTS =====
function renderPosts() {
  const filtered = activeTab === 'all' ? posts : posts.filter(p => p.type === activeTab);
  const feed = document.getElementById('postsFeed');
  if (filtered.length === 0) {
    feed.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--muted);font-size:0.88rem;">No posts in this category yet. Be the first! ✍️</div>`;
    return;
  }
  feed.innerHTML = filtered.map((p, i) => buildPostHTML(p, i)).join('');
}

function buildPostHTML(p, i) {
  const color = getColor(p.user);
  const initials = getInitials(p.user);
  const isLiked = liked.includes(p.id);
  const typeLabels = { workout:'🏋️ Workout', pr:'🏆 Personal Record', tip:'💡 Tip', milestone:'🎯 Milestone', question:'❓ Question' };
  const typeClass = `type-${p.type}`;

  let highlightHTML = '';
  if (p.highlight) {
    const hItems = Object.entries(p.highlight).map(([k,v]) => {
      const labels = { weight:'Weight (kg)', reps:'Reps', exercise:'Exercise', duration:'Duration (min)', sets:'Sets', calories:'Calories', distance:'Distance' };
      return `<div class="ph-stat"><strong>${v}</strong><span>${labels[k]||k}</span></div><div class="ph-divider"></div>`;
    }).join('').replace(/<div class="ph-divider"><\/div>$/, '');
    highlightHTML = `<div class="post-highlight">${hItems}</div>`;
  }

  const tagsHTML = p.tags ? `<div class="post-tags">${p.tags.map(t => `<span class="post-tag">${t}</span>`).join('')}</div>` : '';

  const commentsHTML = p.comments && p.comments.length > 0
    ? p.comments.map(c => `
        <div class="comment">
          <div class="comment-avatar" style="background:${getColor(c.user)}">${getInitials(c.user)}</div>
          <div class="comment-bubble"><strong>${c.user}</strong><span>${c.text}</span></div>
        </div>`).join('')
    : '';

  return `
    <div class="post-card" style="animation-delay:${i * 0.06}s" id="post-${p.id}">
      <div class="post-header">
        <div class="post-user">
          <div class="post-user-avatar" style="background:${color}">${initials}</div>
          <div class="post-user-info">
            <strong>${p.user}</strong>
            <span>${p.time}</span>
          </div>
        </div>
        <span class="post-type-badge ${typeClass}">${typeLabels[p.type] || p.type}</span>
      </div>
      <div class="post-body">
        <p class="post-text">${p.content}</p>
        ${highlightHTML}
        ${tagsHTML}
      </div>
      <div class="post-footer">
        <button class="post-action ${isLiked ? 'liked' : ''}" onclick="toggleLike(${p.id}, this)">
          <span class="act-icon">${isLiked ? '🔥' : '🤍'}</span> <span class="like-count">${p.likes}</span>
        </button>
        <button class="post-action" onclick="toggleComments(${p.id})">
          <span class="act-icon">💬</span> ${p.comments ? p.comments.length : 0}
        </button>
        <button class="post-action" onclick="sharePost(${p.id})">
          <span class="act-icon">↗️</span> Share
        </button>
        <span class="post-time">${p.time}</span>
      </div>
      <div class="comments-section" id="comments-${p.id}" style="display:none">
        <div id="commentsList-${p.id}">${commentsHTML}</div>
        <div class="comment-input-row">
          <input class="comment-input" id="commentInput-${p.id}" placeholder="Add a comment..." onkeydown="if(event.key==='Enter')addComment(${p.id})">
          <button class="comment-submit" onclick="addComment(${p.id})">Post</button>
        </div>
      </div>
    </div>`;
}

// ===== INTERACTIONS =====
function toggleLike(id, btn) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  if (liked.includes(id)) {
    liked = liked.filter(l => l !== id);
    post.likes--;
    btn.classList.remove('liked');
    btn.querySelector('.act-icon').textContent = '🤍';
  } else {
    liked.push(id);
    post.likes++;
    btn.classList.add('liked');
    btn.querySelector('.act-icon').textContent = '🔥';
  }
  btn.querySelector('.like-count').textContent = post.likes;
  localStorage.setItem('ironforge_liked_posts', JSON.stringify(liked));
  savePosts();
}

function toggleComments(id) {
  const el = document.getElementById(`comments-${id}`);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function addComment(id) {
  const input = document.getElementById(`commentInput-${id}`);
  const text = input.value.trim();
  if (!text) return;
  const post = posts.find(p => p.id === id);
  if (!post) return;
  if (!post.comments) post.comments = [];
  const comment = { user: 'Mohithhra P', text };
  post.comments.push(comment);
  savePosts();
  const list = document.getElementById(`commentsList-${id}`);
  const div = document.createElement('div');
  div.className = 'comment';
  div.innerHTML = `<div class="comment-avatar" style="background:var(--primary)">RK</div><div class="comment-bubble"><strong>Mohithhra P</strong><span>${text}</span></div>`;
  list.appendChild(div);
  input.value = '';
  // Update comment count
  const btn = document.querySelector(`#post-${id} .post-action:nth-child(2)`);
  if (btn) btn.innerHTML = `<span class="act-icon">💬</span> ${post.comments.length}`;
  showToast('Comment posted!');
}

function sharePost(id) { showToast('🔗 Link copied to clipboard!'); }

// ===== SWITCH TAB =====
function switchTab(btn, tab) {
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeTab = tab;
  renderPosts();
}

// ===== SUBMIT POST MODAL =====
function openPostModal(type) {
  if (type) {
    selectedPostType = type;
    document.querySelectorAll('.ptype-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-type') === type);
    });
  }
  updateExtraFields(selectedPostType);
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('postContent').focus(), 100);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function selectType(btn) {
  document.querySelectorAll('.ptype-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedPostType = btn.getAttribute('data-type');
  updateExtraFields(selectedPostType);
}

function updateExtraFields(type) {
  const extra = document.getElementById('extraFields');
  if (type === 'workout') {
    extra.innerHTML = `
      <div class="input-row-2">
        <div class="input-group"><label>Duration (min)</label><input type="number" id="efDuration" class="modal-input" placeholder="60"></div>
        <div class="input-group"><label>Calories Burned</label><input type="number" id="efCalories" class="modal-input" placeholder="450"></div>
      </div>`;
  } else if (type === 'pr') {
    extra.innerHTML = `
      <div class="input-row-2">
        <div class="input-group"><label>Exercise</label><input type="text" id="efExercise" class="modal-input" placeholder="Bench Press"></div>
        <div class="input-group"><label>Weight (kg)</label><input type="number" id="efWeight" class="modal-input" placeholder="100"></div>
      </div>
      <div class="input-group" style="margin-top:0.5rem"><label>Reps</label><input type="number" id="efReps" class="modal-input" placeholder="5"></div>`;
  } else {
    extra.innerHTML = '';
  }
}

function submitPost() {
  const content = document.getElementById('postContent').value.trim();
  if (!content) { showToast('⚠️ Write something first!', 'warn'); return; }
  const tagsRaw = document.getElementById('postTags').value.trim();
  const tags = tagsRaw ? tagsRaw.split(/\s+/).filter(t => t.startsWith('#')) : [];

  let highlight = null;
  if (selectedPostType === 'workout') {
    const dur = document.getElementById('efDuration')?.value;
    const cal = document.getElementById('efCalories')?.value;
    if (dur || cal) highlight = { ...(dur ? { duration: dur } : {}), ...(cal ? { calories: cal } : {}) };
  } else if (selectedPostType === 'pr') {
    const ex = document.getElementById('efExercise')?.value;
    const wt = document.getElementById('efWeight')?.value;
    const rp = document.getElementById('efReps')?.value;
    if (ex || wt) highlight = { ...(ex ? { exercise: ex } : {}), ...(wt ? { weight: wt } : {}), ...(rp ? { reps: rp } : {}) };
  }

  const newPost = {
    id: Date.now(), user: 'Mohithhra P', type: selectedPostType,
    content, highlight, tags, likes: 0, comments: [], time: 'Just now'
  };

  posts.unshift(newPost);
  savePosts();
  closeModal();
  document.getElementById('postContent').value = '';
  document.getElementById('postTags').value = '';

  // Switch to all tab to show new post
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  document.querySelector('.ftab[data-tab="all"]').classList.add('active');
  activeTab = 'all';
  renderPosts();
  showToast('🚀 Post shared with the community!');
}

// ===== CHALLENGE JOIN =====
function joinChallenge(btn) {
  if (btn.classList.contains('joined')) { showToast('Already joined!', 'warn'); return; }
  btn.classList.add('joined');
  btn.textContent = '✓ In';
  showToast('🔥 Challenge joined! Let\'s go!');
}

// ===== RENDER SIDEBAR =====
function renderTopMembers() {
  const rankClass = ['gold','silver','bronze','',''];
  document.getElementById('topMembersList').innerHTML = topMembers.map((m, i) => `
    <div class="top-member">
      <span class="tm-rank ${rankClass[i]}">${i + 1}</span>
      <div class="tm-avatar" style="background:${getColor(m.name)}">${getInitials(m.name)}</div>
      <div class="tm-info">
        <strong>${m.name}</strong>
        <span>🔥 ${m.streak} day streak</span>
      </div>
      <span class="tm-pts">${m.points.toLocaleString()}</span>
    </div>
  `).join('');
}

function renderTags() {
  document.getElementById('tagsCloud').innerHTML = trendingTags.map(t => `
    <span class="trend-tag">${t.tag}<span class="tag-count">${t.count}</span></span>
  `).join('');
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
renderPosts();
renderTopMembers();
renderTags();
updateExtraFields('workout');