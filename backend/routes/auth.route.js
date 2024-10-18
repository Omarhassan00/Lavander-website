import express from "express";
import { login, logout, signup, refreshToken, getProfile, updateuser, deletuser, userhistory, UpdateAdminRole ,getAllusers, sendemail, forgetmypassword, checkverifyEmail, sendverifyEmail, updateuserpass} from "../controllers/auth.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);
router.put("/profile", protectRoute, updateuser);
router.delete("/profile/:id", protectRoute, deletuser);
router.get("/history", protectRoute, userhistory);
router.put("/admin/profile", protectRoute, adminRoute, UpdateAdminRole);
router.get("/users", protectRoute,adminRoute, getAllusers);
router.post("/email", sendemail)
router.post("/forgetpass", forgetmypassword)
router.post("/updatepass", updateuserpass)
router.get("/verifyemail/:token", checkverifyEmail)
router.post("/sendverifyemail" , sendverifyEmail)

export default router;