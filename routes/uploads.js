const { Router } = require("express");
const { check } = require("express-validator");

const { _POST, _PUT, _GET } = require("../controllers/uploads");
const { availableCollections, existUseById } = require("../helpers/db-validators");
const { validatorParams, validateJWT, isAdminRole, isValidRole, validateFile } = require("../middlewares");

const router = Router();

router.post("/", validateFile, _POST);
router.put(
    "/:collection/:id",
    [
        validateFile,
        check("id", "Es id debe de ser de mongo").isMongoId(),
        check("collection").custom((collection) => availableCollections(collection, ["users", "products"])),
        validatorParams,
    ],
    _PUT
);
router.get(
    "/:collection/:id",
    [
        check("id", "Es id debe de ser de mongo").isMongoId(),
        check("collection").custom((collection) => availableCollections(collection, ["users", "products"])),
        validatorParams,
    ],
    _GET
);
module.exports = router;
