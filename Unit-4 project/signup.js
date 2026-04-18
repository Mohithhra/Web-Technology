// Toggle password visibility
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');
togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
});

// Floating label + glow effect
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    if (input.previousElementSibling) input.previousElementSibling.style.color = '#FFD700';
    input.style.boxShadow = '0 0 10px var(--primary)';
  });
  input.addEventListener('blur', () => {
    if (input.previousElementSibling) input.previousElementSibling.style.color = '#ccc';
    input.style.boxShadow = 'none';
  });
});

// Password strength meter
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');
passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  let strength = 0;
  if (val.length >= 6) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  const levels = [
    { width: '0%',   label: 'Too Weak',    color: '#ff4500' },
    { width: '25%',  label: 'Weak',        color: '#ff4500' },
    { width: '50%',  label: 'Moderate',    color: '#FFA500' },
    { width: '75%',  label: 'Strong',      color: '#FFD700' },
    { width: '100%', label: 'Very Strong', color: '#00ff00' },
  ];
  strengthBar.style.width = levels[strength].width;
  strengthBar.style.background = levels[strength].color;
  strengthText.textContent = levels[strength].label;
});

// Form validation & submit
const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirm = document.querySelector('#confirmPassword').value.trim();

  if (!name || !email || !password || !confirm) {
    alert('Please fill all fields!');
    return;
  }
  if (password !== confirm) {
    alert('Passwords do not match!');
    return;
  }

  alert('Signup successful! Redirecting to login...');
  window.location.href = 'login.html';
});

// Social buttons
document.querySelector('.google-btn').addEventListener('click', () => alert('Google SignUp (Demo)'));
document.querySelector('.facebook-btn').addEventListener('click', () => alert('Facebook SignUp (Demo)'));

// Card hover animation
const authCard = document.querySelector('.auth-card');
authCard.addEventListener('mouseenter', () => {
  authCard.style.transform = 'scale(1.02)';
  authCard.style.transition = 'transform 0.3s ease';
});
authCard.addEventListener('mouseleave', () => {
  authCard.style.transform = 'scale(1)';
});