// ===== RESET PASSWORD PAGE =====
// URL format: reset-password.html?email=user@example.com

const params   = new URLSearchParams(window.location.search);
const email    = params.get('email') || '';
let   resetDone = false;

// Pre-fill email display if present
window.addEventListener('DOMContentLoaded', () => {
  const emailDisplay = document.getElementById('resetEmailDisplay');
  if (emailDisplay && email) {
    emailDisplay.textContent = decodeURIComponent(email);
  }

  // Password strength meter wiring
  const newPwInput = document.getElementById('newPassword');
  if (newPwInput) {
    newPwInput.addEventListener('input', () => updateStrength(newPwInput.value));
  }
});

// ===== PASSWORD VISIBILITY TOGGLES =====
function toggleVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}

// ===== PASSWORD STRENGTH =====
function updateStrength(pw) {
  const bar   = document.getElementById('strengthBar');
  const label = document.getElementById('strengthLabel');
  if (!bar || !label) return;

  let score = 0;
  if (pw.length >= 8)              score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))   score++;
  if (pw.length >= 12)             score++;

  const levels = [
    { label: '',         color: 'transparent', width: '0%'   },
    { label: 'Weak',     color: '#ef4444',      width: '25%'  },
    { label: 'Fair',     color: '#ff9800',      width: '50%'  },
    { label: 'Good',     color: '#FFD700',      width: '75%'  },
    { label: 'Strong',   color: '#00c851',      width: '90%'  },
    { label: 'Very Strong', color: '#00c851',   width: '100%' },
  ];

  const lvl = levels[score] || levels[0];
  bar.style.width       = lvl.width;
  bar.style.background  = lvl.color;
  label.textContent     = lvl.label;
  label.style.color     = lvl.color;
}

// ===== MAIN RESET HANDLER =====
function handleReset() {
  const newPw     = (document.getElementById('newPassword')?.value     || '').trim();
  const confirmPw = (document.getElementById('confirmPassword')?.value || '').trim();
  const btn       = document.getElementById('resetBtn');

  // Validation
  if (!newPw) {
    showError('Please enter a new password.');
    return;
  }
  if (newPw.length < 8) {
    showError('Password must be at least 8 characters.');
    return;
  }
  if (newPw !== confirmPw) {
    showError('Passwords do not match.');
    return;
  }

  // Simulate saving (in a real app this would hit an API)
  if (btn) {
    btn.textContent = '⏳ Updating…';
    btn.disabled    = true;
  }

  setTimeout(() => {
    // Mark reset as done so the success view can show
    resetDone = true;
    showSuccessView();
  }, 1000);
}

// ===== SUCCESS VIEW =====
function showSuccessView() {
  // Try to swap to a success panel if it exists in HTML
  const formPanel    = document.getElementById('resetFormPanel');
  const successPanel = document.getElementById('resetSuccessPanel');

  if (formPanel && successPanel) {
    formPanel.style.display    = 'none';
    successPanel.style.display = 'block';
  } else {
    // Fallback: show an inline success message then redirect
    showToast('✅ Password updated! Redirecting to login…');
    setTimeout(goToLogin, 2000);
  }
}

// ===== NAVIGATION =====
// Called by the "Back to Login" / "Go to Login" button in the success panel
function goToLogin() {
  window.location.href = 'login.html';
}

// ===== ERROR HELPER =====
function showError(msg) {
  const errEl = document.getElementById('resetError');
  if (errEl) {
    errEl.textContent = msg;
    errEl.style.display = 'block';
    setTimeout(() => { errEl.style.display = 'none'; }, 4000);
  } else {
    showToast('⚠️ ' + msg, 'warn');
  }
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed;bottom:30px;left:50%;
      transform:translateX(-50%) translateY(100px);
      background:#00c851;color:#fff;padding:1rem 2rem;
      border-radius:10px;font-size:0.9rem;font-weight:700;
      box-shadow:0 10px 30px rgba(0,0,0,0.4);z-index:99999;
      transition:transform 0.4s ease,opacity 0.4s ease;opacity:0;
      font-family:'Montserrat',sans-serif;white-space:nowrap;`;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 3000);
}
