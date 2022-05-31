import { Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/orderService';
import { Order } from '../interfaces/orderInterface';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll(); 
    res.status(StatusCodes.OK).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    const token = req.headers.authorization;
    const decoded:string | JwtPayload | Order = await verify(token as string, 'senha');
    console.log(decoded);
    const { id } = decoded as JwtPayload;
    const neworder = await this.orderService.create(productsIds, id);
    return res.status(StatusCodes.CREATED).json(neworder);
  };
}

export default OrderController;