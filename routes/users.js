const { Router } = require("express");
const { check } = require("express-validator");

const { _GET, _PUT, _POST, _DELETE, _PATCH } = require("../controllers/users");
const { validatorParams } = require("../middlewares/validator-params");
const { isRoleValid, isNotRepeatEmail, existUseById } = require("../helpers/db-validators");

const router = Router();

router.get("/", _GET);
router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom((id) => existUseById(id)),
        check("role").custom((role) => isRoleValid(role)),
        validatorParams,
    ],
    _PUT
);
router.post(
    "/",
    [
        check("fullname", "El nombre es valido").not().isEmpty(),
        check("password", "El password debe de ser de mas de 6 letras").isLength({ min: 6 }),
        check("email", "El correo no es valido").isEmail(),
        check("email").custom((email) => isNotRepeatEmail(email)),
        //check("role", "NO es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check("role").custom((role) => isRoleValid(role)),
        validatorParams,
    ],
    _POST
);
router.delete(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom((id) => existUseById(id)),
        validatorParams,
    ],
    _DELETE
);

module.exports = router;
