import BASE_API_URL from "./config.js";

const embedButton = document.getElementById("embed-button");
const textInput = document.getElementById("text-input");
const embeddingResult = document.getElementById("embedding-result");

embedButton.addEventListener("click", async () => {
  const text = textInput.value;

  if (!text.trim()) {
    alert("Por favor, insira um texto.");
    return;
  }

  embeddingResult.innerHTML = "Carregando...";

  try {
    const response = await fetch(`${BASE_API_URL}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error("Erro ao obter embeddings.");

    const data = await response.json();
    embeddingResult.innerHTML = `<strong>Embeddings:</strong> ${JSON.stringify(data.embeddings, null, 2)}`;
  } catch (error) {
    embeddingResult.innerHTML = `<span class="text-danger">${error.message}</span>`;
  }
});