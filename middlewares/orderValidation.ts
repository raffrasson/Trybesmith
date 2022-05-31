import { NextFunction, Request, Response } from 'express';

export default function orderValidation(req:Request, res:Response, next:NextFunction) {
  const { productsIds } = req.body;

  if (!productsIds) return res.status(400).json({ message: '"productsIds" is required' });

  if (productsIds.length === 0) {
    return res.status(422).json({ message: '"productsIds" must include only numbers' });
  }

  if (!Array.isArray(productsIds)) {
    return res.status(422).json({ message: '"productsIds" must be an array' });
  } 

  next();
}