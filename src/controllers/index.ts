import { registerController } from "./auth/register.controller";
import { loginController } from "./auth/login.controller";
import { router } from "../index";
import { authenticate } from "../middlewares/authenticate.middleware";
import { userController } from "./user/user.controller";

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/user", authenticate, userController);

export default router;
