import { Request, Response, NextFunction } from "express";
import { User } from "../models/users.model";
import { isStrongPassword, isValidEmail } from "../utils/validator";

export const validateUserPayload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mobileNo, email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ data: { message: "Invalid email format" } });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      data: {
        message:
          "Password must contain at least 8 characters, uppercase, lowercase, number & special character",
      },
    });
  }

  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    return res.status(400).json({ data: { message: "Email already exists" } });
  }

  const mobileExists = await User.findOne({ where: { mobileNo } });
  if (mobileExists) {
    return res
      .status(400)
      .json({ data: { message: "Mobile number already exists" } });
  }

  next();
};
