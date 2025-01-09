import BASE_API_URL from "./config.js";

const generateButton = document.getElementById("generate-button");
const imagePrompt = document.getElementById("image-prompt");
const imageResult = document.getElementById("image-result");

generateButton.addEventListener("click", async () => {
  const prompt = imagePrompt.value;

  if (!prompt.trim()) {
    alert("Por favor, insira uma descrição.");
    return;
  }

  imageResult.innerHTML = "Gerando imagem...";

  try {
    const response = await fetch(`${BASE_API_URL}/api/image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) throw new Error("Erro ao gerar imagem.");

    const data = await response.json();
    const imageUrl = data.generated_image; // Substitua pelo campo correto da API
    imageResult.innerHTML = `<img src="${imageUrl}" alt="Generated Image" class="img-fluid">`;
  } catch (error) {
    imageResult.innerHTML = `<span class="text-danger">${error.message}</span>`;
  }
});