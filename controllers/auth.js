const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const _google = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { email, name, picture } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                img: picture,
                fullname: name,
                email,
                password: "google",
                role: "USER_ROLE",
                google: true,
            };
            user = new User(data);
            user = await user.save();
        }

        if (!user.status) {
            return res.status(401).json({
                msg: `Error Google Sing-in | favor de hablar con el administrador (usuario eliminado)`,
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            msg: `Todo bien Google Sing-in`,
            user,
            token,
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).json({
            msg: `Error Google Sing-in | ${error}`,
        });
    }
};

const _renoveToken = async (req, res = response) => {
    const { userLogged } = req;

    const token = await generateJWT(userLogged.id);

    res.json({
        user: userLogged,
        token,
    });
};

module.exports = {
    _login,
    _google,
    _renoveToken,
};
