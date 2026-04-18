// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

// ===== HAMBURGER =====
function toggleMenu() { document.getElementById('navLinks').classList.toggle('open'); }
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open')));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), i * 120); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== BILLING TOGGLE =====
let isAnnual = false;

function toggleBilling() {
  isAnnual = !isAnnual;
  const toggle = document.getElementById('billingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');

  toggle.classList.toggle('annual', isAnnual);
  monthlyLabel.classList.toggle('active', !isAnnual);
  annualLabel.classList.toggle('active', isAnnual);

  // Swap prices
  document.querySelectorAll('.monthly-price').forEach(el => el.style.display = isAnnual ? 'none' : 'inline');
  document.querySelectorAll('.annual-price').forEach(el => el.style.display = isAnnual ? 'inline' : 'none');
  document.querySelectorAll('.monthly-note').forEach(el => el.style.display = isAnnual ? 'none' : 'block');
  document.querySelectorAll('.annual-only').forEach(el => el.style.display = isAnnual ? 'block' : 'none');

  // Animate price change
  document.querySelectorAll('.amount').forEach(el => {
    el.style.transform = 'scale(1.2)';
    el.style.color = isAnnual ? 'var(--accent)' : 'var(--light)';
    setTimeout(() => el.style.transform = 'scale(1)', 200);
  });

  // Update online plan price
  const onlineMonthly = document.querySelector('.online-monthly');
  if (onlineMonthly) {
    onlineMonthly.textContent = isAnnual ? '399' : '499';
    onlineMonthly.style.transform = 'scale(1.2)';
    setTimeout(() => onlineMonthly.style.transform = 'scale(1)', 200);
  }
}

// Init monthly as active
document.getElementById('monthlyLabel').classList.add('active');

// ===== PLAN SELECTION & MODAL =====
const planIcons = { Starter: '🌱', Pro: '⚡', Elite: '👑', Digital: '📱' };

function selectPlan(planName, price) {
  document.getElementById('modalPlanName').textContent = planName;
  document.getElementById('modalPlanPrice').textContent = '₹' + (isAnnual ? Math.round(parseInt(price) * 0.8) : price);
  document.getElementById('modalIcon').textContent = planIcons[planName] || '🏋️';
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== CONFIRM SIGNUP =====
function confirmSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const phone = document.getElementById('signupPhone').value.trim();
  const goal = document.getElementById('signupGoal').value;
  const plan = document.getElementById('modalPlanName').textContent;

  if (!name || !email || !phone) { showToast('⚠️ Please fill in all required fields!', 'warn'); return; }
  if (!email.includes('@')) { showToast('⚠️ Please enter a valid email address!', 'warn'); return; }

  // Save to localStorage
  const member = { name, email, phone, goal, plan, joinedAt: new Date().toLocaleDateString(), trial: true };
  localStorage.setItem('ironforge_member', JSON.stringify(member));

  closeModal();
  showToast(`🎉 Welcome to IronForge, ${name}! Your free trial starts now.`);

  // Redirect to signup after toast
  setTimeout(() => { window.location.href = 'signup.html'; }, 2500);
}

// ===== FAQ ACCORDION =====
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ===== PLAN CARD HOVER GLOW =====
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (!card.classList.contains('popular')) card.style.boxShadow = '0 20px 60px rgba(255,69,0,0.1)';
  });
  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('popular')) card.style.boxShadow = '';
  });
});