// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

// ── Video modal ──
const backdrop = document.getElementById('videoModal');
const iframe   = document.getElementById('modalIframe');
const closeBtn = document.getElementById('modalClose');

document.querySelectorAll('.project-card[data-video]').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.video;
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  backdrop.classList.remove('open');
  iframe.src = '';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Contact form ──
// Sign up free at formspree.io, create a form, and paste your form ID below.
const FORMSPREE_ID = 'YOUR_FORM_ID';

const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('formSubmit');
const statusEl   = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  statusEl.className = 'form-status';
  statusEl.textContent = '';

  try {
    const data = new FormData(form);
    const res  = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      statusEl.className = 'form-status form-status--ok';
      statusEl.textContent = "Got it — I'll be in touch within 24 hours.";
      form.reset();
    } else {
      throw new Error('server');
    }
  } catch {
    statusEl.className = 'form-status form-status--err';
    statusEl.textContent = 'Something went wrong. Email me directly at brianmatthewmedia@gmail.com';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send It';
  }
});
