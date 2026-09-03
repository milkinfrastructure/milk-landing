const text = document.querySelector("#copy");
const source = text.textContent;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced) {
  text.textContent = "";
  let index = 0;
  const type = () => {
    text.textContent += source[index++];
    if (index < source.length) setTimeout(type, 25);
  };
  type();
}

setInterval(() => {
  text.classList.toggle("cursor-hidden");
}, 400);
