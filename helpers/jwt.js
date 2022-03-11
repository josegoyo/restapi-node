const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateJWT = async (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRET_PRIVATE_KEY,
            {
                expiresIn: "4h",
            },
            (err, token) => {
                if (err) {
                    reject("NO se pudo generar el token");
                }

                resolve(token);
            }
        );
    });
};

const _validateJWTBackend = async (token = "") => {
    try {
        if (token.length < 10) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

        if (uid) {
            const user = await User.findById(uid);

            if (!user.status) {
                return null;
            }

            return user;
        }
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateJWT,
    _validateJWTBackend,
};
