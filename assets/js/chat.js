// importar o URL base da API
import BASE_API_URL from "./config.js";

const sendButton = document.getElementById("send-button");
const chatInput = document.getElementById("chat-input");
const chatResponse = document.getElementById("chat-response");

sendButton.addEventListener("click", async () =>{
    const userInput = chatInput.value;

    if (!userInput.trim()){
        alert("Por favor, insira um Prompt.");
        return;
    }

    chatResponse.innerHTML = "Carregando...";

    try {
        const response = await fetch(`${BASE_API_URL}/api/chat_completion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userInput }),
        });

        if (!response.ok) throw new Error ("Erro ao obter resposta da API.");

        const data = await response.json();
        chatResponse.innerHTML = `<strong>Resposta:<strong> ${data.message || "Nenhuma resposta encontrada."}`;

    } catch (error){
        chatResponse.innerHTML = `<span class="text-danger">${error.message}</span>`;
    }
    
})