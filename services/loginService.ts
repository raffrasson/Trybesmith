import { sign, SignOptions } from 'jsonwebtoken';
import connection from '../src/models/connection';
import UserModel from '../src/models/userModel';

class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async login(username: string, password: string): Promise<string> {
    const login = await this.model.login(username, password);
    if (login === undefined) {
      return login;
    }
    const jwtConfig: SignOptions = {
      expiresIn: '1d',
    };
    
    const SECRET = 'senha'; 
    
    const token = sign({ id: login.username, password: login.password }, SECRET, jwtConfig);

    return token;
  }
}

export default LoginService;