const text = document.querySelector("#copy");
const source = text.textContent;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced) {
  text.textContent = "";
  const started = performance.now();
  const duration = 4000;
  const type = now => {
    const index = Math.min(source.length, Math.ceil(source.length * (now - started) / duration));
    text.textContent = source.slice(0, index);
    if (index < source.length) requestAnimationFrame(type);
  };
  requestAnimationFrame(type);
}

setInterval(() => {
  text.classList.toggle("cursor-hidden");
}, 400);
