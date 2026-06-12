// Scroll reveal
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

// Video modal
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
