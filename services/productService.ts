import connection from '../src/models/connection';
import ProductModel from '../src/models/productModel';
import Product from '../interfaces/productInterface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  public create(product: Product): Promise<Product> {
    return this.model.create(product);
  }
}

export default ProductService;