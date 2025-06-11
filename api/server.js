require("dotenv").config(); 

const express = require('express');
const app = express();
const port = 4000;
const path = require("path");
const loginRoutes = require('./src/routes/login');
const postsRoutes = require('./src/routes/posts');
const cors = require('cors'); 

app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'telas')));

const teste = (req, res) => {
    res.json({ titulo: 'API exemplo JWT com Node.js e Express' });
    console.log('Rota de teste acessada');
};

app.use(loginRoutes);
app.use(postsRoutes);

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:' + port);
});
