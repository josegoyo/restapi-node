const { Router } = require("express");
const { check } = require("express-validator");

const { _login, _google } = require("../controllers/auth");
const { validatorParams } = require("../middlewares");

const router = Router();

router.post(
    "/login",
    [
        check("email", "EL correo es requerido").isEmail(),
        check("password", "La contrasena es obligatoria").not().isEmpty(),
        validatorParams,
    ],
    _login
);

router.post(
    "/google",
    [check("id_token", "El id token es obligatorio").not().isEmpty(), validatorParams],
    _google
);

module.exports = router;
