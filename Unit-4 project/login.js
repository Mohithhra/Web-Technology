// Toggle password visibility
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');
togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
});

// Floating label + glow effect (merged, no duplicates)
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    if (input.previousElementSibling) input.previousElementSibling.style.color = 'var(--accent)';
    input.style.boxShadow = '0 0 10px var(--primary)';
  });
  input.addEventListener('blur', () => {
    if (input.previousElementSibling) input.previousElementSibling.style.color = '#ccc';
    input.style.boxShadow = 'none';
  });
});

// Login form submission
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  if (email && password) {
    // Save user name for welcome message
    localStorage.setItem('ironforge_user', email.split('@')[0]);
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Please fill all fields!');
  }
});

// Social login buttons
document.querySelector('.google-btn').addEventListener('click', () => alert('Google Login (Demo)'));
document.querySelector('.facebook-btn').addEventListener('click', () => alert('Facebook Login (Demo)'));

// Card hover animation
const authCard = document.querySelector('.auth-card');
authCard.addEventListener('mouseenter', () => {
  authCard.style.transform = 'scale(1.02)';
  authCard.style.transition = 'transform 0.3s ease';
});
authCard.addEventListener('mouseleave', () => {
  authCard.style.transform = 'scale(1)';
});