require("dotenv").config();
const express = require('express');
const path = require("path");

const app = express();
const port = 4000;

const loginRoutes = require('./src/routes/login');
const postsRoutes = require('./src/routes/posts');

const teste = (req, res) => {
    res.json({ titulo: 'API exemplo JWT com Node.js e Express' });
    console.log('Rota de teste acessada');
}

app.use(express.json());

// Servir arquivos HTML, CSS e JS
app.use(express.static(path.join(__dirname, 'telas')));

app.get('/', teste);
app.use(loginRoutes);
app.use(postsRoutes);

app.listen(port, () => {
    console.log('http://localhost:' + port);
});
