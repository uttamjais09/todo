import express from 'express';
import { register , login ,logout } from '../controller/user.js'
const router = express.Router();

router.route("/").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);


export default router ;

