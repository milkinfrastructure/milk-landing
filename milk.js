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
