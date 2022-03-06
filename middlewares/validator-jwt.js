const { request, response } = require("express");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "Es necesario enviar el token de autorizacion",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

        if (uid) {
            const user = await User.findById(uid);
            if (!user) {
                return res.status(401).json({
                    msg: "Usuario no encontrado",
                });
            }

            if (!user.status) {
                return res.status(401).json({
                    msg: "Usuario no valido",
                });
            }

            req.userLogged = user;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido",
        });
    }
};

module.exports = {
    validateJWT,
};
