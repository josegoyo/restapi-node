const { Router } = require("express");
const { check } = require("express-validator");

const { _GET, _GET_BY_ID, _POST, _PUT, _DELETE } = require("../controllers/categories");

const { existCategory } = require("../helpers/db-validators");
const { validatorParams, validateJWT, validatorRoles, isAdminRole, isValidRole } = require("../middlewares");

const router = Router();

router.get("/", [validateJWT], _GET);
router.get(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom((id) => existCategory(id)),
        validatorParams,
    ],
    _GET_BY_ID
);
router.post(
    "/",
    [validateJWT, check("name", "El nombre es requerido").not().isEmpty(), validatorParams],
    _POST
);
router.put(
    "/:id",
    [
        validateJWT,
        isValidRole("VENTAS_ROLE", "ADMIN_ROLE"),
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom((id) => existCategory(id)),
        check("name", "el nombre es querido").not().isEmpty(),
        validatorParams,
    ],
    _PUT
);
router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom((id) => existCategory(id)),
        validatorParams,
    ],
    _DELETE
);

module.exports = router;
