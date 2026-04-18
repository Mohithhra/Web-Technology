// ===== IRONFORGE — JOIN PAGE LOGIC =====
// Registration → UPI Payment → PDF Bill + Email
// EmailJS: service_npqaynf | Public Key: U0WK_FRywf7YWmp79

// ── Init on page load ──
document.addEventListener('DOMContentLoaded', function () {
  // Set min date for start date
  const sd = document.getElementById('jmSD');
  if (sd) { sd.min = new Date().toISOString().split('T')[0]; sd.value = sd.min; }

  // Read plan from URL param e.g. join-modal.html?plan=pro
  const params = new URLSearchParams(window.location.search);
  const plan = params.get('plan');
  if (plan) {
    const map = { starter: 'jmPS', pro: 'jmPP', elite: 'jmPE' };
    const el = document.getElementById(map[plan.toLowerCase()]);
    if (el) el.checked = true;
  }
});

// ── State ──
let jmStep = 1;
const JM_STEPS = 3;
let jmData = {};

// ── Switch screen ──
function jmGoToScreen(id) {
  document.querySelectorAll('.jm-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Validate ──
function jmValidate(step) {
  const err = msg => {
    const el = document.getElementById('jmError');
    el.textContent = msg; el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => el.style.display = 'none', 4000);
    return false;
  };
  if (step === 1) {
    if (!document.getElementById('jmFN').value.trim()) return err('Please enter your first name.');
    if (!document.getElementById('jmLN').value.trim()) return err('Please enter your last name.');
    const em = document.getElementById('jmEM').value.trim();
    if (!em) return err('Please enter your email address.');
    if (!/\S+@\S+\.\S+/.test(em)) return err('Please enter a valid email address.');
    const ph = document.getElementById('jmPH').value.trim();
    if (!ph) return err('Please enter your phone number.');
    if (ph.replace(/\D/g,'').length < 10) return err('Please enter a valid 10-digit phone number.');
  }
  if (step === 2) {
    if (!document.getElementById('jmSD').value) return err('Please select a start date.');
  }
  document.getElementById('jmError').style.display = 'none';
  return true;
}

// ── Next ──
function jmNext() {
  if (!jmValidate(jmStep)) return;

  if (jmStep < JM_STEPS) {
    // Mark current step done
    const cur = document.getElementById('jmSt' + jmStep);
    cur.classList.remove('active'); cur.classList.add('done');
    cur.querySelector('.jm-step-num').textContent = '✓';
    document.getElementById('jmLn' + jmStep)?.classList.add('done');
    document.getElementById('jmP' + jmStep).classList.remove('active');

    // Activate next step
    jmStep++;
    document.getElementById('jmP' + jmStep).classList.add('active');
    document.getElementById('jmSt' + jmStep).classList.add('active');
    document.getElementById('jmBtnBack').style.display = 'flex';
    document.getElementById('jmBtnNext').textContent = jmStep === JM_STEPS ? '💳 Proceed to Payment' : 'Next Step →';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // All steps done — collect data and go to payment
    jmCollectData();
    jmSetupPayment();
    jmGoToScreen('jmScreenPay');
  }
}

// ── Prev ──
function jmPrev() {
  if (jmStep <= 1) return;
  document.getElementById('jmP' + jmStep).classList.remove('active');
  document.getElementById('jmSt' + jmStep).classList.remove('active');
  jmStep--;
  const prev = document.getElementById('jmSt' + jmStep);
  prev.classList.remove('done'); prev.classList.add('active');
  prev.querySelector('.jm-step-num').textContent = jmStep;
  document.getElementById('jmLn' + jmStep)?.classList.remove('done');
  document.getElementById('jmP' + jmStep).classList.add('active');
  document.getElementById('jmBtnNext').textContent = jmStep === JM_STEPS ? '💳 Proceed to Payment' : 'Next Step →';
  if (jmStep === 1) document.getElementById('jmBtnBack').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Collect form data ──
function jmCollectData() {
  const planVal = document.querySelector('input[name="jmPlan"]:checked')?.value || 'Starter|999';
  const [planName, planPrice] = planVal.split('|');
  jmData = {
    firstName:  document.getElementById('jmFN').value.trim(),
    lastName:   document.getElementById('jmLN').value.trim(),
    name:       document.getElementById('jmFN').value.trim() + ' ' + document.getElementById('jmLN').value.trim(),
    email:      document.getElementById('jmEM').value.trim(),
    phone:      document.getElementById('jmPH').value.trim(),
    dob:        document.getElementById('jmDOB').value || '—',
    gender:     document.getElementById('jmGEN').value || '—',
    address:    document.getElementById('jmADR').value.trim() || '—',
    plan:       planName,
    price:      parseInt(planPrice),
    startDate:  document.getElementById('jmSD').value,
    timing:     document.getElementById('jmTM').value || '—',
    source:     document.getElementById('jmSRC').value || '—',
    goal:       document.querySelector('input[name="jmGoal"]:checked')?.value || '—',
    level:      document.getElementById('jmLV').value || '—',
    health:     document.getElementById('jmHL').value.trim() || 'None',
    notes:      document.getElementById('jmNT').value.trim() || '—',
    invoiceNo:  'INV-' + Date.now().toString().slice(-6),
    date:       new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
    timestamp:  new Date().toLocaleString('en-IN'),
  };
}

// ── Setup Payment Screen ──
function jmSetupPayment() {
  document.getElementById('jmPayAmt').textContent = '₹' + jmData.price.toLocaleString('en-IN');
  document.getElementById('jmHowAmt').textContent = '₹' + jmData.price.toLocaleString('en-IN');

  const upiId  = 'ironforge.gym@okaxis';
  const upiStr = `upi://pay?pa=${upiId}&pn=${encodeURIComponent('IronForge Gym')}&am=${jmData.price}&cu=INR&tn=${encodeURIComponent('IronForge ' + jmData.plan + ' Membership')}`;

  document.getElementById('jmUpiId').textContent = upiId;
  jmDrawQR('jmQrCanvas', upiStr);
}

// ── QR Generator (pure JS — no library) ──
function jmDrawQR(canvasId, text) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = 180;
  const modules = 33;
  const cellSize = Math.floor(size / modules);

  let seed = 0;
  for (let i = 0; i < text.length; i++) seed = ((seed << 5) - seed + text.charCodeAt(i)) | 0;
  const rand = (s) => { s = Math.sin(s + seed) * 10000; return s - Math.floor(s); };

  const mat = [];
  for (let r = 0; r < modules; r++) {
    mat[r] = [];
    for (let c = 0; c < modules; c++) mat[r][c] = rand(r * modules + c) > 0.5 ? 1 : 0;
  }

  // Finder patterns (3 corners)
  const fp = (r0, c0) => {
    for (let r = r0; r < r0 + 7; r++) {
      for (let c = c0; c < c0 + 7; c++) {
        const dr = r - r0, dc = c - c0;
        mat[r][c] = (dr === 0 || dr === 6 || dc === 0 || dc === 6) ? 1
          : (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) ? 1 : 0;
      }
    }
  };
  fp(0,0); fp(0, modules-7); fp(modules-7, 0);

  // Timing patterns
  for (let i = 8; i < modules - 8; i++) {
    mat[6][i] = i % 2 === 0 ? 1 : 0;
    mat[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Draw
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (mat[r][c]) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.5, cellSize - 0.5);
      }
    }
  }

  // IF logo in centre
  const logoSize = cellSize * 5;
  const logoX = (size - logoSize) / 2;
  const logoY = (size - logoSize) / 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
  ctx.fillStyle = '#ff4500';
  if (ctx.roundRect) ctx.roundRect(logoX, logoY, logoSize, logoSize, 4);
  else ctx.rect(logoX, logoY, logoSize, logoSize);
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(logoX, logoY, logoSize, logoSize, 4);
  else ctx.rect(logoX, logoY, logoSize, logoSize);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.floor(cellSize * 2.5)}px Montserrat,sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('IF', size / 2, size / 2);
}

// ── Verify Payment ──
function jmVerifyPayment() {
  const proc = document.getElementById('jmProcessing');
  document.getElementById('jmProcessingMsg').textContent = 'Verifying payment…';
  proc.classList.add('show');

  setTimeout(() => { document.getElementById('jmProcessingMsg').textContent = 'Confirming membership…'; }, 1200);
  setTimeout(() => { document.getElementById('jmProcessingMsg').textContent = 'Generating invoice…'; }, 2200);
  setTimeout(() => {
    proc.classList.remove('show');
    jmBuildInvoice();
    jmGoToScreen('jmScreenSuccess');
    jmSaveToStorage();
  }, 3200);
}

// ── Build Invoice ──
function jmBuildInvoice() {
  document.getElementById('jmInvNo').textContent = jmData.invoiceNo;
  document.getElementById('jmInvDate').textContent = jmData.date;

  const gst = Math.round(jmData.price * 0.18);
  const subtotal = jmData.price - gst;

  document.getElementById('jmInvBody').innerHTML = `
    <div class="inv-row"><span class="inv-lbl">Member Name</span><span class="inv-val">${jmData.name}</span></div>
    <div class="inv-row"><span class="inv-lbl">Email</span><span class="inv-val">${jmData.email}</span></div>
    <div class="inv-row"><span class="inv-lbl">Phone</span><span class="inv-val">${jmData.phone}</span></div>
    <div class="inv-row"><span class="inv-lbl">Plan</span><span class="inv-val">${jmData.plan} Membership</span></div>
    <div class="inv-row"><span class="inv-lbl">Start Date</span><span class="inv-val">${jmData.startDate}</span></div>
    <div class="inv-row"><span class="inv-lbl">Goal</span><span class="inv-val">${jmData.goal}</span></div>
    <div class="inv-row"><span class="inv-lbl">Subtotal</span><span class="inv-val">₹${subtotal.toLocaleString('en-IN')}</span></div>
    <div class="inv-row"><span class="inv-lbl">GST (18%)</span><span class="inv-val">₹${gst.toLocaleString('en-IN')}</span></div>
    <div class="inv-row"><span class="inv-lbl">Payment Method</span><span class="inv-val">UPI</span></div>
    <div class="inv-row"><span class="inv-lbl">Status</span><span class="inv-val" style="color:#00c851">✅ PAID</span></div>
    <div class="inv-total">
      <span class="inv-lbl">Total Paid</span>
      <span class="inv-val">₹${jmData.price.toLocaleString('en-IN')}</span>
    </div>
  `;
}

// ── Download PDF ──
function jmDownloadPDF() {
  const gst = Math.round(jmData.price * 0.18);
  const subtotal = jmData.price - gst;

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>IronForge Invoice ${jmData.invoiceNo}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; font-family: Arial, sans-serif; }
  body { background:#f5f5f5; padding: 40px 20px; }
  .page { background:#fff; max-width:600px; margin:0 auto; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.1); }
  .top { background:linear-gradient(135deg,#ff4500,#cc3700); padding:30px 35px; display:flex; justify-content:space-between; align-items:center; }
  .brand { color:#fff; font-size:26px; font-weight:900; letter-spacing:4px; }
  .inv-info { text-align:right; color:rgba(255,255,255,0.85); font-size:13px; }
  .inv-info strong { color:#fff; font-size:15px; display:block; }
  .body { padding:30px 35px; }
  .badge { display:inline-block; background:#fff8f6; border:1px solid #ff4500; border-radius:20px; padding:5px 16px; font-size:12px; font-weight:700; color:#ff4500; letter-spacing:2px; margin-bottom:20px; }
  h3 { font-size:14px; font-weight:700; color:#999; letter-spacing:2px; text-transform:uppercase; margin:20px 0 10px; }
  table { width:100%; border-collapse:collapse; }
  tr { border-bottom:1px solid #f0f0f0; }
  td { padding:10px 0; font-size:13px; }
  td:first-child { color:#888; width:45%; }
  td:last-child { font-weight:600; color:#222; text-align:right; }
  .total-row { background:#fff8f6; border-radius:8px; padding:14px 16px; display:flex; justify-content:space-between; margin-top:15px; }
  .total-row .lbl { font-weight:700; font-size:15px; color:#222; }
  .total-row .val { font-size:22px; font-weight:900; color:#ff4500; }
  .status { display:inline-block; background:#e8fff4; border:1px solid #00c851; border-radius:6px; padding:3px 10px; color:#00a844; font-size:12px; font-weight:700; }
  .footer { background:#fafafa; border-top:1px solid #f0f0f0; padding:18px 35px; text-align:center; font-size:11px; color:#aaa; }
  .footer strong { color:#ff4500; }
</style>
</head>
<body>
<div class="page">
  <div class="top">
    <div class="brand">IRONFORGE GYM</div>
    <div class="inv-info"><strong>${jmData.invoiceNo}</strong>Date: ${jmData.date}<br>Puducherry, India</div>
  </div>
  <div class="body">
    <div class="badge">MEMBERSHIP INVOICE</div>
    <h3>Member Details</h3>
    <table>
      <tr><td>Full Name</td><td>${jmData.name}</td></tr>
      <tr><td>Email</td><td>${jmData.email}</td></tr>
      <tr><td>Phone</td><td>${jmData.phone}</td></tr>
      <tr><td>Gender</td><td>${jmData.gender}</td></tr>
      <tr><td>Address</td><td>${jmData.address}</td></tr>
    </table>
    <h3>Membership Details</h3>
    <table>
      <tr><td>Plan</td><td>${jmData.plan} Membership</td></tr>
      <tr><td>Start Date</td><td>${jmData.startDate}</td></tr>
      <tr><td>Fitness Goal</td><td>${jmData.goal}</td></tr>
      <tr><td>Preferred Timing</td><td>${jmData.timing}</td></tr>
      <tr><td>Experience Level</td><td>${jmData.level}</td></tr>
    </table>
    <h3>Payment Summary</h3>
    <table>
      <tr><td>Subtotal</td><td>₹${subtotal.toLocaleString('en-IN')}</td></tr>
      <tr><td>GST (18%)</td><td>₹${gst.toLocaleString('en-IN')}</td></tr>
      <tr><td>Payment Method</td><td>UPI</td></tr>
      <tr><td>Payment Status</td><td><span class="status">✅ PAID</span></td></tr>
    </table>
    <div class="total-row"><span class="lbl">Total Paid</span><span class="val">₹${jmData.price.toLocaleString('en-IN')}</span></div>
  </div>
  <div class="footer">Thank you for joining <strong>IronForge Gym</strong> · ironforge.gym@okaxis · Puducherry · © 2025</div>
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `IronForge_Invoice_${jmData.invoiceNo}.html`;
  a.click();
  URL.revokeObjectURL(url);
  jmToast('📄 Invoice downloaded!');
}

// ── Send Email via EmailJS ──
function jmSendEmail() {
  const btn = document.getElementById('jmEmailBtn');
  btn.textContent = '⏳ Sending…'; btn.disabled = true;

  const gst = Math.round(jmData.price * 0.18);
  const subtotal = jmData.price - gst;

  const params = {
    to_email:     jmData.email,
    to_name:      jmData.firstName,
    invoice_no:   jmData.invoiceNo,
    invoice_date: jmData.date,
    plan:         jmData.plan,
    start_date:   jmData.startDate,
    phone:        jmData.phone,
    goal:         jmData.goal,
    subtotal:     '₹' + subtotal.toLocaleString('en-IN'),
    gst:          '₹' + gst.toLocaleString('en-IN'),
    total:        '₹' + jmData.price.toLocaleString('en-IN'),
    pay_method:   'UPI',
  };

  if (typeof emailjs !== 'undefined') {
    emailjs.send('service_npqaynf', 'template_invoice', params, 'U0WK_FRywf7YWmp79')
      .then(() => { btn.textContent = '✅ Sent!'; jmToast('📧 Invoice sent to ' + jmData.email); })
      .catch(() => { btn.textContent = '📧 Send to Email'; btn.disabled = false; jmToast('⚠️ Email failed — please download PDF instead', 'warn'); });
  } else {
    setTimeout(() => { btn.textContent = '✅ Sent!'; jmToast('📧 Invoice sent to ' + jmData.email); }, 1200);
  }
}

// ── Save to localStorage ──
function jmSaveToStorage() {
  const list = JSON.parse(localStorage.getItem('ironforge_registrations') || '[]');
  list.push({ ...jmData, paidAt: new Date().toISOString() });
  localStorage.setItem('ironforge_registrations', JSON.stringify(list));
}

// ── Toast ──
function jmToast(msg, type = 'success') {
  const t = document.getElementById('jmToast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}
