document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = e.target.user.value;
  const psw = e.target.psw.value;

  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, psw }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "home.html";
  } else {
    document.getElementById("message").textContent = data.message || "Erro no login.";
  }
});
