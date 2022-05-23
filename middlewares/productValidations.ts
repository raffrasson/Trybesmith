import { NextFunction, Request, Response } from 'express';
import Product from '../interfaces/productInterface';

function nameValidation(name:string) {
  if (!name) return ({ status: 400, message: '"name" is required' });

  if (typeof name !== 'string') return ({ status: 422, message: '"name" must be a string' });

  if (name.length < 3) {
    return ({ status: 422, message: '"name" length must be at least 3 characters long' });
  }
}

function amountValidation(amount:string) {
  if (!amount) return ({ status: 400, message: '"amount" is required' });

  if (typeof amount !== 'string') return ({ status: 422, message: '"amount" must be a string' });

  if (amount.length < 3) {
    return ({ status: 422, message: '"amount" length must be at least 3 characters long' });
  }
}

export default function newProductValidation(req:Request, res:Response, next:NextFunction) {
  const { name, amount } = req.body as Product;

  const nameError = nameValidation(name);
  const amountError = amountValidation(amount);

  if (nameError) return res.status(nameError.status).json({ message: nameError.message });
  if (amountError) return res.status(amountError.status).json({ message: amountError.message });

  next();
}