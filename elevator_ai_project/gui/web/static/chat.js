async function send() {
  const msg = document.getElementById("msg").value;
  if (!msg) return;

  addMessage("Bạn", msg);

  const res = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({question: msg})
  });

  const data = await res.json();
  addMessage("Bot", data.answer);
}

function addMessage(sender, text) {
  const box = document.getElementById("chat-box");
  box.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
}

