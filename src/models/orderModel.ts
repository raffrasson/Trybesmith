import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Order } from '../../interfaces/orderInterface';
import ProductModel from './productModel';

export default class OrderModel {
  public connection: Pool;

  public model: ProductModel;

  constructor(connection: Pool) {
    this.connection = connection;
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Orders');
    const [rows] = result;
    return rows as Order[];
  }

  public async create(userId: number, productsIds: number[]): Promise<Order> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (UserId) VALUES (?)',
      [userId],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted as { insertId: number };

    const orderMap = productsIds.map(async (prod) => {
      await this.connection.execute(
        'UPDATE Trybesmith.Products SET orderId= ? WHERE id IN (?)',
        [insertId, prod],
      );
    });

    await Promise.all(orderMap);

    return { userId, productsIds };
  }
}