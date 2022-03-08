const { Router } = require("express");
const { check } = require("express-validator");

const { _GET, _GET_BY_ID, _POST, _PUT, _DELETE } = require("../controllers/products");

const { existProduct, existCategory } = require("../helpers/db-validators");
const { validatorParams, validateJWT, isAdminRole, isValidRole } = require("../middlewares");

const router = Router();

router.get("/", [validateJWT], _GET);
router.get(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom((id) => existProduct(id)),
        validatorParams,
    ],
    _GET_BY_ID
);
router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre es requerido").not().isEmpty(),
        check("category").custom((category) => existCategory(category)),
        validatorParams,
    ],
    _POST
);
router.put(
    "/:id",
    [
        validateJWT,
        isValidRole("VENTAS_ROLE", "ADMIN_ROLE"),
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom((id) => existProduct(id)),
        check("name", "el nombre es querido").not().isEmpty(),
        check("category").custom((category) => existCategory(category)),

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
        check("id").custom((id) => existProduct(id)),
        validatorParams,
    ],
    _DELETE
);

module.exports = router;
