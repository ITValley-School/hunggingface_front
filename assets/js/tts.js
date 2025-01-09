import BASE_API_URL from "./config.js";

const speakButton = document.getElementById("tts-button");
const textInput = document.getElementById("tts-input");
const audioResult = document.getElementById("audio-player");

speakButton.addEventListener("click", async () => {
  const text = textInput.value;

  if (!text.trim()) {
    alert("Por favor, insira um texto.");
    return;
  }

  audioResult.innerHTML = "Processando...";

  try {
    const response = await fetch(`${BASE_API_URL}/api/text-to-speech`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error("Erro ao converter texto em fala.");

    const data = await response.json();
    const audioUrl = data.audio_url; // Substitua pelo campo correto retornado pela API
    audioResult.innerHTML = `
      <audio controls>
        <source src="${audioUrl}" type="audio/mpeg">
        Seu navegador não suporta o elemento de áudio.
      </audio>
    `;
  } catch (error) {
    audioResult.innerHTML = `<span class="text-danger">${error.message}</span>`;
  }
});