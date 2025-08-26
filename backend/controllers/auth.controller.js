const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/users.model");
const jwt = require("jsonwebtoken");

/**-------------------------------------------
 * @desc   Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 -------------------------------------------*/

const registerUserCtrl = asyncHandler(async (req, res) => {
  // validate register
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // check if user already exist
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "user already exist" });
  }

  // bcrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // save user in the database
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  // @TODO ---- sending email (verify account)

  res
    .status(201)
    .json({ message: "user registered successfully, please log in" });
});

/**-------------------------------------------
 * @desc   Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 -------------------------------------------*/

const loginUserCtrl = asyncHandler(async (req, res) => {
  // 1. validation
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2. is user exist
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  // 3. check the password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  // @TODO ---- sending email (verify account)

  // 4. generate token (JWT)
  const token = user.generateAuthToken();
  // 5. response to client
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token: token,
  });
});

module.exports = {
  registerUserCtrl,
  loginUserCtrl,
};
