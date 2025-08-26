const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/users.model");

/**-------------------------------------------
 * @desc   Get All Users Profile
 * @route /api/users/profile
 * @method GET
 * @access private (admin only)
 -------------------------------------------*/

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({ users });
});

/**-------------------------------------------
 * @desc   Get Single User Profile
 * @route /api/users/profile/:id
 * @method GET
 * @access public 
 -------------------------------------------*/

const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "user not found" }); // 404 means not found
  }
  return res.status(200).json(user);
});

/**-------------------------------------------
 * @desc   Update User Profile
 * @route /api/users/profile/:id
 * @method PUT
 * @access private (only user himself) 
 -------------------------------------------*/

const updateUserProfile = asyncHandler(async (req, res) => {
  const {error} = validateUpdateUser(req.body)
  if(error){
    return res.status(400).json({message:error.details[0].message})
  }
  if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt)
  }
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, {
    $set:{
      username:req.body.username,
      password:req.body.password,
      bio:req.body.bio,
    }
  }, {
    new: true,
  }).select("-password");

  return res.status(200).json(updatedUser)
});

/**-------------------------------------------
 * @desc   Get Users Count
 * @route /api/users/count
 * @method GET
 * @access private (admin only)
 -------------------------------------------*/


 const getUsersCount = asyncHandler(async (req,res)=>{
  const userCount = await User.countDocuments();
  return res.status(200).json(userCount)
 })
module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getUsersCount
};
