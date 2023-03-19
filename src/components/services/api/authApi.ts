
import { TLoginData } from "../../login";
import { TRegistrationData } from "../../registration";
import { Endpoints } from "../endpoints";
import { http } from "../http";

export const AuthAPI = {
    signUpUser: (payload: TRegistrationData) => http.post(Endpoints.SIGN_UP_USER, payload).then((response) => response.data),
    signInUser: (payload: TLoginData) => http.post(Endpoints.SIGN_IN_USER, payload).then((response) => response.data),
}