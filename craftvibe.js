function reactFake(btn) {
  btn.classList.add('active');
  setTimeout(() => btn.classList.remove('active'), 280);
}
