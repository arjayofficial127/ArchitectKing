document.addEventListener('DOMContentLoaded', () => {
  window.requestAnimationFrame(() => {
    document.body.classList.add('is-ready');
  });
});