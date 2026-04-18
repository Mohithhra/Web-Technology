// ===== EMAILJS CONFIG =====
const EMAILJS_SERVICE_ID  = 'service_npqaynf';
const EMAILJS_TEMPLATE_ID = 'template_6ix8fkc';
const EMAILJS_PUBLIC_KEY  = 'U0WK_FRywf7YWmp79';

// ===== ELEMENTS =====
const forgotForm   = document.querySelector('#forgotForm');
const emailInput   = document.querySelector('#email');
const step1        = document.querySelector('#step1');
const step2        = document.querySelector('#step2');
const sentEmailSpan = document.querySelector('#sentEmail');

// ===== INIT EMAILJS =====
emailjs.init(EMAILJS_PUBLIC_KEY);

// ===== FLOATING LABEL + GLOW =====
emailInput.addEventListener('focus', () => {
  emailInput.previousElementSibling.style.color = '#FFD700';
  emailInput.style.boxShadow = '0 0 10px #ff4500';
});
emailInput.addEventListener('blur', () => {
  emailInput.previousElementSibling.style.color = '#ccc';
  emailInput.style.boxShadow = 'none';
});

// ===== FORM SUBMIT =====
forgotForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!email) { showError('Please enter your email address!'); return; }
  if (!isValidEmail(email)) { showError('Please enter a valid email address!'); return; }

  const submitBtn = forgotForm.querySelector('.btn');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // EmailJS send
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    to_email:   email,
    to_name:    email.split('@')[0],   // use part before @ as name
    reset_link: `https://keen-boba-5ce194.netlify.app/reset-password.html?email=${encodeURIComponent(email)}`
  })
  .then(() => {
    // Success — show step 2
    sentEmailSpan.textContent = email;
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    startResendTimer();
  })
  .catch(err => {
    console.error('EmailJS error:', JSON.stringify(err));
    const msg = err?.text || err?.message || 'Unknown error';
    showError(`Failed to send email: ${msg}`);
    submitBtn.textContent = 'Send Reset Link';
    submitBtn.disabled = false;
  });
});

// ===== RESEND =====
let resendTimeout = null;

function resendEmail() {
  const email = sentEmailSpan.textContent;
  const resendBtn = step2.querySelector('.btn');
  resendBtn.disabled = true;
  resendBtn.textContent = 'Sending...';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    to_email:   email,
    to_name:    email.split('@')[0],
    reset_link: `https://keen-boba-5ce194.netlify.app/reset-password.html?email=${encodeURIComponent(email)}`
  })
  .then(() => {
    resendBtn.textContent = 'Resend Email';
    showToast('Reset link resent! Check your inbox.');
    startResendTimer();
  })
  .catch(() => {
    resendBtn.textContent = 'Resend Email';
    resendBtn.disabled = false;
    showToast('Failed to resend. Try again.', true);
  });
}

function startResendTimer() {
  const resendBtn = step2.querySelector('.btn');
  let timerEl = document.querySelector('.resend-timer');
  if (!timerEl) {
    timerEl = document.createElement('p');
    timerEl.className = 'resend-timer';
    resendBtn.insertAdjacentElement('afterend', timerEl);
  }

  let seconds = 30;
  resendBtn.disabled = true;
  clearInterval(resendTimeout);

  resendTimeout = setInterval(() => {
    timerEl.textContent = `Resend available in ${seconds}s`;
    seconds--;
    if (seconds < 0) {
      clearInterval(resendTimeout);
      timerEl.textContent = '';
      resendBtn.disabled = false;
      resendBtn.textContent = 'Resend Email';
    }
  }, 1000);
}

// ===== HELPERS =====
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(message) {
  const existing = document.querySelector('.error-msg');
  if (existing) existing.remove();

  const err = document.createElement('p');
  err.className = 'error-msg';
  err.textContent = message;
  err.style.cssText = 'color:#ff4500; font-size:0.85rem; margin-bottom:1rem; text-align:center;';
  forgotForm.insertBefore(err, forgotForm.querySelector('.btn'));
  setTimeout(() => { if (err) err.remove(); }, 3000);
}

function showToast(message, isError = false) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
    background: ${isError ? 'rgba(255,69,0,0.9)' : 'rgba(0,200,81,0.9)'};
    color: #fff; padding: 12px 24px; border-radius: 8px;
    font-size: 0.88rem; font-weight: 600;
    box-shadow: 0 5px 20px rgba(0,0,0,0.4); z-index: 999;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== CARD HOVER =====
const authCard = document.querySelector('.auth-card');
authCard.addEventListener('mouseenter', () => {
  authCard.style.transform = 'scale(1.02)';
  authCard.style.transition = 'transform 0.3s ease';
});
authCard.addEventListener('mouseleave', () => {
  authCard.style.transform = 'scale(1)';
});
