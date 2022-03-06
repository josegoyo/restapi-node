const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
    const { userLogged } = req;

    if (!userLogged) {
        return res.status(500).json({
            msg: "Se esta tratando de validar el rol sin checar el token",
        });
    }

    if (userLogged.role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: "El usuario no cuenta con los permisos suficientes de ADMIN ",
        });
    }

    next();
};

const isValidRole = (...roles) => {
    return (req = request, res = response, next) => {
        const { userLogged } = req;

        if (!userLogged) {
            return res.status(500).json({
                msg: "Se esta tratando de validar el rol sin checar el token",
            });
        }

        if (!roles.includes(userLogged.role)) {
            return res.status(401).json({
                msg: `El servicio requiere unos de estos roles ${roles}`,
            });
        }

        next();
    };
};

module.exports = {
    isAdminRole,
    isValidRole,
};
