document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = e.target.user.value;
  const psw = e.target.psw.value;

  console.log("Usuário enviado:", user); 
  console.log("Senha enviada:", psw); 

  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, psw }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Token recebido:', data.token);
    
    // Salvar token e nome do usuário no localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", "Fulano da Silva"); // Nome do usuário, pode vir do backend

    window.location.href = "home.html";
  } else {
    console.log('Erro no backend:', data.message);
    document.getElementById("message").textContent = data.message || "Erro no login.";
  }
});
