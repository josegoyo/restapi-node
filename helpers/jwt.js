const jwt = require("jsonwebtoken");

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

module.exports = {
    generateJWT,
};
