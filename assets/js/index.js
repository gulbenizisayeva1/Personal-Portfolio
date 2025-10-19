let _timerId = null;

export function startTyping(words) {
  const el = document.getElementById("role");
  if (!el || !Array.isArray(words) || words.length === 0) return;
  if (_timerId) { clearTimeout(_timerId); _timerId = null; }
  el.textContent = "";

  let wordIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  const typingSpeed      = 40;
  const deletingSpeed    = 40;
  const holdAfterType    = 1200;
  const holdAfterDelete  = 500;

  function loop() {
    const word = words[wordIndex];

    if (!deleting) {
      el.textContent = word.slice(0, ++charIndex);
      if (charIndex === word.length) {
        deleting = true;
        _timerId = setTimeout(loop, holdAfterType);
        return;
      }
    } else {
      el.textContent = word.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        _timerId = setTimeout(loop, holdAfterDelete);
        return;
      }
    }

    _timerId = setTimeout(loop, deleting ? deletingSpeed : typingSpeed);
  }

  loop();
}













































































