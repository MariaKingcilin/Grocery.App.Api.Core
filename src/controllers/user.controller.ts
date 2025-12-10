import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../models/roles.model";
import { User } from "../models/users.model";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, mobileNo, email, password, roleId } = req.body;

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(400).json({ message: "Invalid roleId" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      mobileNo,
      email,
      password: hashedPassword,
      roleId,
    });

    return res.status(200).json({
      data: "User created successfully",
    });
  } catch (error) {
    console.error("CreateUser Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const token = {
      accessToken,
      refreshToken,
    };

    return res.status(200).json({
      data: token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
