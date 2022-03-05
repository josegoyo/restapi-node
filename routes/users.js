const { Router } = require("express");
const { _GET, _PUT, _POST, _DELETE, _PATCH } = require("../controllers/users");

const router = Router();

router.get("/", _GET);
router.put("/:id", _PUT);
router.post("/", _POST);
router.patch("/", _PATCH);
router.delete("/:id", _DELETE);

module.exports = router;
