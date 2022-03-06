const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const _login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos -* correo",
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos -* Status",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos -* Password",
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            msg: "AUTH - Login",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hablar con el administrador",
            error,
        });
    }
};

module.exports = {
    _login,
};
