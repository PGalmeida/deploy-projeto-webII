import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandle.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.getJwtToken();

  res.status(201).json({
    token,
  });
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Por favor, insira email e senha", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Por favor, informe o usuario", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Senha incorreta", 401));
  }

  const token = user.getJwtToken();

  res.status(201).json({
    token,
  });
});
