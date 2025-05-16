import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    res.cookie("jwt", token, {
        // httpOnly: true, //xss attack for  save
        httpOnly: false, //xss attack for  save
        secure: true,
        // sameSite: "lax", // csrf attack for  save
        sameSite: "none", // csrf attack for  save
        path: "/",
    });
    await User.findByIdAndUpdate(userId, { token });
    return token;
};

export default createTokenAndSaveCookies;