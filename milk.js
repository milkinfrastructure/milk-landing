const copy = document.querySelector("#copy");
const state = document.querySelector("#copy-state");

copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("OPENAI_BASE_URL=https://parlor.milkinfrastructure.com/v1\nOPENAI_API_KEY=<your Milk key>");
    state.textContent = "copied · replace the key placeholder";
  } catch {
    state.textContent = "Select the two lines to copy them.";
  }
});

const motion = document.querySelector("#motion");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
function setPaused(paused) {
  document.body.classList.toggle("paused", paused);
  motion.textContent = paused ? "play motion" : "pause motion";
  motion.setAttribute("aria-pressed", String(paused));
}
motion.hidden = false;
setPaused(reduced.matches);
document.body.classList.add("motion-ready");
motion.addEventListener("click", () => setPaused(!document.body.classList.contains("paused")));
reduced.addEventListener("change", event => setPaused(event.matches));
