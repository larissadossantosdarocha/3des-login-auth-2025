const jsonwebtoken = require("jsonwebtoken");

const validate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Access Denied. No token provided." }).end();
    }

    try {
        const payload = jsonwebtoken.verify(token, process.env.SECRET_JWT);
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).send({ message: "Token inválido ou expirado." }).end();
    }
};

module.exports = validate;
