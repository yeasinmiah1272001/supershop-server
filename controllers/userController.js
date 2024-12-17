// import userModel from
import validator from "validator";
import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
};

// ==============================userRegister===============================
// ==============================userRegister===============================
// ==============================userRegister===============================
const userRegister = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = await req.body;
    // console.log(req.body);
    const existingUser = await userModel.findOne({ email });
    // console.log("exis", existingUser);

    if (!name) {
      return res.json({ success: false, message: "pleace enter your name" });
    }
    if (!email) {
      return res.json({ success: false, message: "pleace enter your eamil" });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "pleace enter your password",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter your valid email" });
    }
    if (existingUser) {
      return res.json({ success: false, message: "user already exisit" });
    }
    if (password.length < 8) {
      return res.json({ success: true, message: "password must 8 chr" });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);
    // console.log(encryptPassword);

    const newUser = new userModel({
      name,
      email,
      password: encryptPassword,
      isAdmin: isAdmin || false,
    });
    // console.log("new", newUser);
    await newUser.save();

    return res.json({ success: true, message: "user register success" });
  } catch (error) {
    return res.json({ success: false, message: "user register error" });
  }
};
// ==============================userLogin===============================
// ==============================userLogin===============================
// ==============================userLogin===============================
const userLogin = async (req, res) => {
  try {
    const { email, password } = await req.body;
    // console.log(req.body);

    if (!email) {
      return res.json({ success: false, message: "pleace enter your eamil" });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "pleace enter your password",
      });
    }

    const user = await userModel.findOne({ email });
    // console.log("user", user);
    if (!user) {
      return res.json({ success: false, message: "user doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user);
      return res.json({ success: true, token, message: "user Login success" });
    } else {
      return res.json({
        success: false,
        message: "invalid credintial , pleace try again",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: "user Login error" });
  }
};

// ==============================admin Login===============================
// ==============================admin Login===============================
// ==============================admin Login===============================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email) {
      return res.json({ success: false, message: "pleace enter your eamil" });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "pleace enter your password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "you are not authorized, plece try again",
      });
    }

    if (isMatch && user.isAdmin) {
      const token = createToken(user);
      return res.json({ success: true, token, message: "admin login success" });
    }
  } catch (error) {
    return res.json({ success: false, message: "admin login error" });
  }
};

// ==============================userUpdated===============================
// ==============================userUpdated===============================
// ==============================userUpdated===============================
const userUpdate = (req, res) => {
  try {
    return res.json({ success: true, message: "user updated success" });
  } catch (error) {
    return res.json({ success: false, message: "user updated error" });
  }
};

// ==============================User delete===============================
// ==============================User delete===============================
// ==============================User delete===============================
const userDelete = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body._id);

    return res.json({ success: true, message: "user delete success" });
  } catch (error) {
    return res.json({ success: false, message: "user delete error" });
  }
};
// ==============================getAllUser===============================
// ==============================getAllUser===============================
// ==============================getAllUser===============================
const userList = async (req, res) => {
  try {
    const total = await userModel.countDocuments({});

    const user = await userModel.find({});

    return res.json({
      success: true,
      total,
      user,
      message: "user List success",
    });
  } catch (error) {
    return res.json({ success: false, message: "user List error" });
  }
};

export {
  userList,
  userLogin,
  userRegister,
  userUpdate,
  adminLogin,
  userDelete,
};
