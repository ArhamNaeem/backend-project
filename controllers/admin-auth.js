const Admin = require('../models/Admin')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes');


const registerAdmin = async (req, res) => {
  try {
    const admin = await Admin.create({ ...req.body })
    const token = Admin.createJWT()
    res.status(StatusCodes.CREATED).json({success:true,token})
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({sucess:false})
  }
}

const registerUser= async (req, res) => {
  try {
    const user = await User.create({ ...req.body })
    const data={
      data:{
          id:user.id
      }
  }
  const token = User.createJWT()

  // res.json({success: true, authToken:authToken });
    res.status(StatusCodes.CREATED).json({success:true, token })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({sucess:false})
  }
}


const loginAdmin = async (req, res) => {
  const { email, password } = req.body

  try{
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password')
    }
    const admin = await Admin.findOne({ email })
    if (!admin) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await admin.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = admin.createJWT()
    res.status(StatusCodes.OK).json({sucess:true,token})
  }
  catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({sucess:false})
}
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try{
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = User.createJWT()
    res.status(StatusCodes.OK).json({user,sucess:true,token})
  }
  catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({sucess:false})
}}



const updateUser = async (req, res) => {
  let { name, email,phone, password } = req.body;
  const userId = req.params.id;  
  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password, salt)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email, password } }, 
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
const token = User.createJWT()
    res.json({ message: 'User updated successfully', user: updatedUser,token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  loginUser,registerUser,
  updateUser
}
