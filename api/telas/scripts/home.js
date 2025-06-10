const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

fetch("http://localhost:3000/posts", {
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
      li.innerHTML = `<strong>${post.title}</strong><br>${post.summary}<br><small>${post.date}</small><hr>`;
      ul.appendChild(li);
    });
  })
  .catch(err => {
    document.getElementById("message").textContent = err.message;
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
