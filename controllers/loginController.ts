import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/loginService';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    const login = await this.loginService.login(username, password); 
    if (login === undefined) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }

    res.status(StatusCodes.OK).json({ token: login });
  };
}

export default LoginController;