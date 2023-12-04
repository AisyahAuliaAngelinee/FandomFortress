const router = require("express").Router();
const LodgingRouter = require("./lodging");
const TypeRouter = require("./type");
// const UserRouter = require("../routers/user");
const PublicRouter = require("./public");
const UserController = require("../controllers/user-controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// PUBLIC
router.use("/public", PublicRouter);

// LOGIN
router.post("/login", UserController.login);

// MIDDLEWARE
//? USER MUST LOGIN TO ACCESS ANYELSE
router.use(authentication);

//? ONLY ADMIN CAN ADD MORE STAFF
router.post("/add-user", authorization, UserController.addUser);

// MAIN ENTITY
router.use("/fortress", LodgingRouter);

// SUPPORT ENTITY
router.use("/type", TypeRouter);

module.exports = router;
