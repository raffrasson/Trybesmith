import { NextFunction, Request, Response } from 'express';
import { Login } from '../interfaces/loginInterface';

function usernameValidation(username:string) {
  if (!username) return ({ status: 400, message: '"username" is required' });
}

function passwordValidation(password:string) {
  if (!password) return ({ status: 400, message: '"password" is required' });
}

export default function loginValidation(req:Request, res:Response, next:NextFunction) {
  const { username, password } = req.body as Login;

  const usernameError = usernameValidation(username);
  const passwordError = passwordValidation(password);

  if (usernameError) {
    return res.status(usernameError.status).json({ message: usernameError.message });
  }
  if (passwordError) {
    return res.status(passwordError.status).json({ message: passwordError.message });
  }

  next();
}