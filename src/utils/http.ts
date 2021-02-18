import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { create } from "domain";
import users from "../data/users";
import { IAuthenticatedUser } from "../models/auth";
import { IServiceResult } from "../models/service";
import { createGuid } from "../utils/random";

const instance = axios.create({ baseURL: "http://localhost:3000" });
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error.response;
  }
);

mockConfiguration(instance);
export const http = instance;

function mockConfiguration(instance: AxiosInstance) {
  const mock = new MockAdapter(instance);

  mock.onPost("/v1/login").reply((config) => {
    const data = JSON.parse(config.data);
    const findUser = users.find(
      (user) => user.username == data.username && user.password == data.password
    );

    if (findUser) {
      const response: IServiceResult<IAuthenticatedUser> = {
        success: true,
        message: "Başarıyla giriş yaptınız.",
        data: {
          name: findUser.name,
          username: findUser.username,
          token: createGuid(),
        },
      };

      return [200, response];
    }

    const response: IServiceResult<IAuthenticatedUser> = {
      success: false,
      message: "Girmiş olduğunuz kullanıcı adı veya şifre yanlış.",
      data: null,
    };

    return [404, response];
  });
}
