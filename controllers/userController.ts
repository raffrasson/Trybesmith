import { sign, SignOptions } from 'jsonwebtoken'; // o token é requisito opcional, mas o teste 3 pede um ( "expect(result.body.token).toBeDefined();"). Utilizei como referência a seguinte página: https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/#How_to_Create_Authentication_Middleware_in_Nodejs_and_Expressjs_using_TypeScript
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userService';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const newUser = await this.userService.create(user);

    const jwtConfig: SignOptions = {
      expiresIn: '1d',
    };
    
    const SECRET = 'senha'; 
    
    const token = sign({ id: newUser.id }, SECRET, jwtConfig);
    res.status(StatusCodes.CREATED).json({ token });
  };
}

export default UserController;