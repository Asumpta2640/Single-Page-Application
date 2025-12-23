
/*
body {
  font-family: Arial, sans-serif;
  background: #f0f4f8;
  text-align: center;
  padding: 20px;
}

h1 {
  color: #333;
}

form {
  margin-bottom: 20px;
}

input {
  padding: 8px;
  width: 250px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 12px;
  margin-left: 5px;
  border-radius: 4px;
  border: none;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #3730a3;
}

.card {
  background: #fff;
  padding: 20px;
  margin: auto;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.info-row {
  margin-bottom: 10px;
}

.loading {
  font-style: italic;
}

.error {
  color: red;
  font-weight: bold;
}
*/


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
 