import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/userInterface';

function usernameValidation(username:string) {
  if (!username) return ({ status: 400, message: '"username" is required' });

  if (typeof username !== 'string') {
    return ({ status: 422, message: '"username" must be a string' });
  }

  if (username.length < 3) {
    return ({ status: 422, message: '"username" length must be at least 3 characters long' });
  }
}

function classeValidation(classe:string) {
  if (!classe) return ({ status: 400, message: '"classe" is required' });

  if (typeof classe !== 'string') return ({ status: 422, message: '"classe" must be a string' });

  if (classe.length < 3) {
    return ({ status: 422, message: '"classe" length must be at least 3 characters long' });
  }
}

function levelValidation(level:number) {
  if (level === undefined) return ({ status: 400, message: '"level" is required' }); // o '!level' acusa erro ao tentar cadastrar usuário com level 0, possivelmente por considerar que o número 0 é igual a inexistente. 

  if (typeof level !== 'number') return ({ status: 422, message: '"level" must be a number' });

  if (level === 0) {
    return ({ status: 422, message: '"level" must be greater than or equal to 1' });
  }
}

function passwordValidation(password:string) {
  if (!password) return ({ status: 400, message: '"password" is required' });

  if (typeof password !== 'string') {
    return ({ status: 422, message: '"password" must be a string' });
  }

  if (password.length < 9) {
    return ({ status: 422, message: '"password" length must be at least 8 characters long' });
  }
}

export default function newUserValidation(req:Request, res:Response, next:NextFunction) {
  const { username, classe, level, password } = req.body as User;

  const usernameError = usernameValidation(username);
  const classeError = classeValidation(classe);
  const levelError = levelValidation(level);
  const passwordError = passwordValidation(password);

  if (usernameError) {
    return res.status(usernameError.status).json({ message: usernameError.message });
  }
  if (classeError) return res.status(classeError.status).json({ message: classeError.message });
  if (levelError) return res.status(levelError.status).json({ message: levelError.message });
  if (passwordError) {
    return res.status(passwordError.status).json({ message: passwordError.message });
  }
  
  next();
}