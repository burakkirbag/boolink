import { http } from "../utils/http";
import { IServiceResult } from "../models/service";
import { IAuthenticatedUser, ILogin, IRegister } from "../models/auth";

export interface IAuthService {
  login(request: ILogin): Promise<IServiceResult<IAuthenticatedUser>>;
  register(request: IRegister): Promise<IServiceResult<IAuthenticatedUser>>;
}

export default class AuthService implements IAuthService {
  async login(request: ILogin): Promise<IServiceResult<IAuthenticatedUser>> {
    const res = await http.post<IServiceResult<IAuthenticatedUser>>(
      "/v1/login",
      request
    );
    return res.data;
  }
  async register(
    request: IRegister
  ): Promise<IServiceResult<IAuthenticatedUser>> {
    const res = await http.post<IServiceResult<IAuthenticatedUser>>(
      "/v1/register",
      request
    );
    return res.data;
  }
}
