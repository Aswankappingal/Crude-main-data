import { Router } from "express";
import * as controller from "./controller.js";
import Auth from "./auth.js"
const router=Router();

  //////Staff case //////
router.route("/addstaff").post(controller.addStaff);
router.route("/login").post(controller.login);
router.route("/home").get(Auth,controller.home);


// Addd case 

router.route("/addtask").post(controller.addTask);
router.route("/gettask").get(controller.getTask);
router.route("/deltask/:id").delete(controller.delTask);
router.route("/edittask/:id").patch(controller.editTask);
router.route("/fulldetails/:id").post(controller.GetAllTask);





export default router;