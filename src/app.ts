import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'; // bilbioteca no course, sessão 'express com typescript'
import userRouter from '../routes/userRouter';
import productRouter from '../routes/productRouter';
import orderRouter from '../routes/orderRouter';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send(`${StatusCodes.OK}`);
});

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);

export default app;
