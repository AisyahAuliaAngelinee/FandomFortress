const router = require("express").Router();
const MainController = require("../controllers/main-controller");
const authorization = require("../middleware/authorization");
const uploadImage = require("../middleware/multer");

router.post("/add-fortress", MainController.addFortress);
router.get("/fortress", MainController.getFortress);
router.get("/fortress/:id", authorization, MainController.getFortressDetail);
router.put("/fortress/:id", authorization, MainController.editFortress);
router.delete("/fortress/:id", authorization, MainController.deleteFortress);
router.patch("/fortress/:id", authorization, uploadImage, MainController.uploadImage);

module.exports = router;
