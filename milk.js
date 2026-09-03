const copy = document.querySelector("#copy");
const state = document.querySelector("#copy-state");

copy.addEventListener("click", async () => {
  await navigator.clipboard.writeText("OPENAI_BASE_URL=https://parlor.milkinfrastructure.com/v1\nOPENAI_API_KEY=<your Milk key>");
  state.textContent = "copied";
});
