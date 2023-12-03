const router = require("express").Router();
const PublicController = require("../controllers/public-controller");

router.get("/", PublicController.fetchFortress);
router.get("/:id", PublicController.fetchFortressById);

module.exports = router;
