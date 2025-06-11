const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const Login = (req, res) => {
    const { user, psw } = req.body;
console.log("Variáveis de ambiente:");
console.log("USER:", process.env.USER); 
console.log("PASSWD:", process.env.PASSWD); 

    try {
      const correctPassword = ((user === process.env.USER) && (psw === process.env.PASSWD));

        console.log("Senha correta?", correctPassword); 

        if (!correctPassword) {
            return res.status(401).send({ message: 'E-mail or Password incorrect !' });
        }

        const token = jsonwebtoken.sign(
            {
                id: crypto.randomUUID(),
                name: "Fulano da Silva",
                avatar: "https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
            },
            process.env.SECRET_JWT,
            { expiresIn: "2min" }
        );

        console.log("Token gerado:", token);  
        return res.status(200).json({ token: token }).end();
    } catch (err) {
        console.error("Erro no login:", err); 
        res.status(500).send(err).end();
    }
};

module.exports = {
    Login
};
