const { Router } = require("express");
const { check } = require("express-validator");

const { _POST, _PUT, _GET, _PUT_CLOUDINARY } = require("../controllers/uploads");
const { availableCollections } = require("../helpers/db-validators");
const { validatorParams, validateFile } = require("../middlewares");

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
    _PUT_CLOUDINARY
    //_PUT
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
