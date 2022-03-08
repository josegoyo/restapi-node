const { Router } = require("express");

const { _SEARCH } = require("../controllers/search");

const router = Router();

router.get("/:collection/:term", _SEARCH);

module.exports = router;
