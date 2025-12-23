// updated dictionary app

const form = document.getElementById("searchForm");
const input = document.getElementById("wordInput");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = input.value.trim();
  if (!word) return;

  result.innerHTML = `<div class="loading">Loading...</div>`;

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      throw new Error("Word not found. Try another word.");
    }

    const data = await response.json();
    const entry = data[0];
    const meaning = entry.meanings[0];
    const definition = meaning.definitions[0];

    result.innerHTML = `
      <div class="card">
        <h2>${entry.word}</h2>

        <div class="info-row">
          <strong>Pronunciation:</strong>
          <span>${entry.phonetics[0]?.text || "N/A"}</span>
        </div>

        <div class="info-row">
          <strong>Definition:</strong>
          <span>${definition.definition}</span>
        </div>

        <div class="info-row">
          <strong>Example:</strong>
          <span>${definition.example || "No example available"}</span>
        </div>
      </div>
    `;
  } catch (error) {
    result.innerHTML = `<div class="error">${error.message}</div>`;
  }
});
 