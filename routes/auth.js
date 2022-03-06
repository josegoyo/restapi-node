const { Router } = require("express");
const { check } = require("express-validator");

const { _login } = require("../controllers/auth");
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

module.exports = router;
