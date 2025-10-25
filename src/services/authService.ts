import type { AxiosInstance } from "axios";
import axios from "axios";
import { BASE_URL } from "../common/helpers/baseUrl";
import type { AuthSession, LoginDto } from "../common/types";
import { setAuthSession } from "../common/stores/authSession";

class AuthService {
    private api : AxiosInstance;
    constructor(){
        this.api = axios.create({
            baseURL: BASE_URL,
            withCredentials: true,
        })
    }

    public async startSession() : Promise<AuthSession>{
        const response = await this.api.get<AuthSession>("/auth/session");
        setAuthSession(response.data);
        return response.data;
    }

    public async loginUser(data:LoginDto){
        return await this.api.post("/auth/login", data);
    }

    public async logoutUser(){
        const nama= "siam"
    }
}

export const authService = new AuthService();