const router = require("express").Router();
const SupportController = require("../controllers/support-controller");
const authorization = require("../middleware/authorization");

router.post("/type-add", SupportController.createType);
router.get("/type", SupportController.getType);
router.put("/type/:id", authorization, SupportController.editType);
router.delete("/type/:id", authorization, SupportController.deleteType);

module.exports = router;
