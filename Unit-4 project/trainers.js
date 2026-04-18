// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== FILTER SYSTEM =====
const filterBtns = document.querySelectorAll('.filter-btn');
const trainerCards = document.querySelectorAll('.trainer-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    trainerCards.forEach((card, i) => {
      const category = card.getAttribute('data-category');
      const match = filter === 'all' || category === filter;

      if (match) {
        card.classList.remove('hidden');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});

// ===== TRAINER DATA =====
const trainerData = {
  arjun: { name: 'Arjun Sharma', role: 'Strength & Conditioning', avatar: '👨‍🦱' },
  priya: { name: 'Priya Nair', role: 'Yoga & Wellness Coach', avatar: '👩' },
  rahul: { name: 'Rahul Verma', role: 'Boxing & MMA Coach', avatar: '👨‍🦲' },
  sneha: { name: 'Sneha Kapoor', role: 'Nutrition & Diet Expert', avatar: '👩‍🦰' },
  vikram: { name: 'Vikram Singh', role: 'HIIT & Metabolic Training', avatar: '👨' },
  meera: { name: 'Meera Iyer', role: 'Functional Strength & Mobility', avatar: '👩‍🦳' }
};

// ===== MODAL =====
function openModal(trainerKey) {
  const trainer = trainerData[trainerKey];
  document.getElementById('modalAvatar').textContent = trainer.avatar;
  document.getElementById('modalName').textContent = trainer.name;
  document.getElementById('modalRole').textContent = trainer.role;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== SESSION & SLOT SELECTION =====
function selectSession(btn) {
  document.querySelectorAll('.session-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectSlot(btn) {
  if (btn.classList.contains('disabled')) return;
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ===== CONFIRM BOOKING =====
function confirmBooking() {
  const name = document.getElementById('modalName').textContent;
  const session = document.querySelector('.session-btn.active')?.textContent || 'Session';
  const slot = document.querySelector('.slot-btn.active')?.textContent || 'Selected Time';
  closeModal();
  showToast(`✅ Booked! ${session} with ${name} on ${slot}`);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ===== CARD HOVER GLOW =====
trainerCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 20px 60px rgba(255,69,0,0.15)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});