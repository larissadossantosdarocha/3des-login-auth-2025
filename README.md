# Login - Auth

Projeto feito em dupla com [EvelynFerna](https://github.com/EvelynFerna)

Projeto feito em dupla com [larissavitoria06](https://github.com/larissavitoria06)

---

## Sobre o projeto

Este projeto implementa uma autenticação simples usando JSON Web Tokens (JWT) em um servidor Node.js com Express.

---

## Funcionalidades

- Servidor Express configurado para usar variáveis de ambiente (`.env`)
- Rotas organizadas em arquivos separados (`login.js` e `posts.js`)
- Middleware para validar tokens JWT
- Dados simulados de posts em um array para testes

---

## Estrutura do projeto

├── controllers
│ ├── login.js # Função que simula login e gera token JWT
│ └── posts.js # Funções que manipulam dados de posts
├── data
│ └── posts.js # Array com dados simulados de posts
├── middlewares
│ └── auth.js # Middleware para validar token JWT
├── routes
│ ├── login.js # Rota para login
│ └── posts.js # Rota para posts protegida por autenticação
├── server.js # Inicializa o servidor Express
└── .env # Variáveis de ambiente, incluindo SECRET_JWT

---

## Detalhes dos arquivos

## Controllers
### login.js
-Simula o login com e-mail e senha fixos.
-Gera um token JWT com:
-ID aleatório (usando crypto.randomUUID())
-Nome do usuário
-Avatar
-O token tem validade de 2 minutos (expiresIn: "2min").
-Usa a chave secreta de process.env.SECRET_JWT.
-Retorna o token para o cliente.

### posts.js
-Trabalha com o array de posts importado da pasta data.
-Fornece funções para listar posts, buscar por ID, ordenar por data, visualizações ou curtidas.

### data/posts.js

- Exporta um array de objetos representando posts
- Cada objeto contém:
  - `id`: número identificador único
  - `title`: título do post
  - `summary`: resumo curto do conteúdo
  - `date`: data da publicação no formato `YYYY-MM-DD`
  - `views`: número de visualizações
  - `likes`: número de curtidas

### middlewares/auth.js - Middleware de autenticação JWT

- Middleware que verifica se o token JWT está presente e é válido
- Verifica se o cabeçalho `Authorization` contém um token válido.
- Se o token for válido, anexa os dados do usuário à requisição e permite acesso
- Se o token for inválido ou ausente, bloqueia o acesso com erro 401
- Usa a biblioteca `jsonwebtoken` para criar e verificar tokens.

### routes/login.js

- Define a rota POST `/login` para receber dados de autenticação
- Chama o controlador que gera o token JWT após validação
-Rota POST /login para autenticação do usuário.
-Chama a função do controlador de login para validar credenciais e gerar token.

### routes/posts.js

- Define a rota GET `/posts` protegida por middleware de autenticação JWT
- Somente usuários autenticados podem acessar essa rota e visualizar os posts

### server.js

- Inicializa o servidor Express
-Lê variáveis do arquivo `.env` usando o pacote `dotenv`.
- Configura o middleware para interpretar JSON
- Importa e usa as rotas e middlewares
-Separa as rotas em arquivos distintos (`login.js` e `posts.js`).
- Escuta requisições na porta 3000

---

### Importância das rotas

**-/login (POST)**
Permite que usuários façam login e obtenham um token JWT válido para acessar o sistema. Essencial para garantir que apenas usuários autorizados consigam prosseguir.
**-/posts (GET)**
Rota protegida que disponibiliza dados sensíveis (posts). Apenas usuários com token válido podem acessá-la, garantindo a segurança e privacidade das informações.

### Tecnologias utilizadas
-Node.js
-Express
-JSON Web Token (jsonwebtoken)
-dotenv
-crypto (módulo nativo do Node.js)