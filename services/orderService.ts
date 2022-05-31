import connection from '../src/models/connection';
import ProductModel from '../src/models/productModel';
import OrderModel from '../src/models/orderModel';
import Product from '../interfaces/productInterface';
import { Order } from '../interfaces/orderInterface';

class OrderService {
  public productModel: ProductModel;

  public orderModel: OrderModel;

  constructor() {
    this.productModel = new ProductModel(connection);
    this.orderModel = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const products = await this.productModel.getAll();
    const orders = await this.orderModel.getAll();
    
    const ordersArr = orders as Order[];
    const productsArr = products as Product[];

    const productsAndOrders = ordersArr.map((order) => {
      const productsIds = productsArr.filter((product) =>
        product.orderId === order.id).map((listOfProducts) => listOfProducts.id);
        
      return { ...order, productsIds };
    });

    return productsAndOrders;
  }

  public async create(productsId: number[], userId: number): Promise<Order> {
    const result = await this.orderModel.create(userId, productsId);
    return result as Order;
  }
}

export default OrderService;