import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Order } from '../interfaces/orderInterface';

export default function tokenValidation(req: Request, res: Response, next: NextFunction) {
  try {  
    const token = req.headers.authorization; 

    if (!token) return res.status(401).json({ message: 'Token not found' });
    const decoded = verify(token, 'senha');
    const { id } = decoded as Order; 
    console.log(decoded);
    console.log(id);

    return next();
  } catch (error: unknown) {
    if (error instanceof Error && error.name.includes('Token')) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next(error);
  }
}