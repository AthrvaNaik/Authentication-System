import express from "express";
import { forgotPassword, login, logout, signup, verifyEmail } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.post("/verify-email",verifyEmail)

router.post("/forgot-password",forgotPassword)

export default router;
