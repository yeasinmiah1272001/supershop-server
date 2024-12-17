import express from "express";
import {
  adminLogin,
  userDelete,
  userList,
  userLogin,
  userRegister,
  userUpdate,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);
userRouter.put("/update", userUpdate);
userRouter.post("/remove", userDelete);
userRouter.get("/list", userList);

export default userRouter;
