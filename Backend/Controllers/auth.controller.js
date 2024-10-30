import bcryptjs from "bcryptjs";
import { User } from "../Models/user.models.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../MailTrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are Required!");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User exists already" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hrs
    });

    await user.save();

    // jwt token
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined, // Don't return the password in the response
      },
    });
  } catch (error) {
    console.log(error.message); // Log the actual error message
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req,res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message:"Email Verified Successfully",
      user:{
        ...user._doc,
        password:undefined
      }
    })
  } catch (error) {
    res.status(400).json({success:false,message:error.message})
  }
};

export const login = async (req, res) => {
  const {email,password} = req.body
  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password"})
    }
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, message: "Invalid email or password"})
    }
    generateTokenAndSetCookie(res,user._id)
    user.lastLogin= new Date()
    user.save()
    res.status(200).json({
      success: true,
      message:"Logged in Successfully",
      user:{
        ...user._doc,
        password:undefined
      }
    })
  } catch (error) {
    console.log(Error);
    res.status(400).json({success:false,message:error.message})
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({success:true, message:"Logged out"})
};
