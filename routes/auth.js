const { Router } = require("express");
const { check } = require("express-validator");

const { _login, _google, _renoveToken } = require("../controllers/auth");
const { validatorParams, validateJWT } = require("../middlewares");

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

router.get("/", validateJWT, _renoveToken);
module.exports = router;
