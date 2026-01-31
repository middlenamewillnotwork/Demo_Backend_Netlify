// script.js — handles form validation and submission via Fetch API

// Utility: show message in the UI
function showMessage(text, type = 'success'){
  const msg = document.getElementById('message');
  msg.textContent = text;
  msg.className = type === 'success' ? 'success' : 'error';
}

// Basic email validation (simple, beginner-friendly)
function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mobile validation: digits only, 10-15 characters
function isValidMobile(mobile){
  return /^\d{10,15}$/.test(mobile);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    // Prevent normal form submission / page reload
    e.preventDefault();

    // Clear previous message
    showMessage('', 'success');

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();

    // Frontend validation
    if (!fullName){ showMessage('Full Name is required.', 'error'); return; }
    if (!isValidMobile(mobile)){ showMessage('Mobile must be 10-15 digits (numbers only).', 'error'); return; }
    if (!isValidEmail(email)){ showMessage('Please enter a valid email address.', 'error'); return; }

    // Disable submit while sending
    submitBtn.disabled = true;

    try {
      // Send POST request to Netlify Function endpoint
      const res = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, mobile, email })
      });

      const data = await res.json();

      if (res.ok && data && data.success){
        showMessage(data.message || 'Form submitted successfully', 'success');
        form.reset();
      } else {
        showMessage(data.message || 'Submission failed', 'error');
      }
    } catch (err){
      showMessage('Network error. Try again later.', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
});
