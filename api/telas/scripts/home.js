const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// Obter o nome do usuário armazenado no localStorage
const userName = localStorage.getItem("userName");

// Exibir o nome do usuário na interface
document.getElementById("userName").textContent = userName;

// Buscando os posts
fetch("http://localhost:4000/posts", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => {
    if (!res.ok) {
      throw new Error("Token inválido ou expirado.");
    }
    return res.json();
  })
  .then(posts => {
    const ul = document.getElementById("posts");
    posts.forEach(post => {
      const li = document.createElement("li");
      li.classList.add("post");
      li.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.summary}</p>
        <small>Publicado em: ${new Date(post.date).toLocaleDateString()}</small>
      `;
      ul.appendChild(li);
    });
  })
  .catch(err => {
    document.getElementById("message").textContent = err.message;
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); // Limpar o nome do usuário
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
