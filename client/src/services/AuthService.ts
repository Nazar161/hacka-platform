import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { UserRegistration } from "../models/request/UserRegistration";

export default class AuthService {
  static async registration(user: UserRegistration): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", user);
  }
}