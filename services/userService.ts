import connection from '../src/models/connection';
import UserModel from '../src/models/userModel';
import { User } from '../interfaces/userInterface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public create(user: User): Promise<User> {
    return this.model.create(user);
  }
}

export default UserService;