import type { AxiosInstance } from "axios";
import axios from "axios";
import { BASE_URL } from "../common/helpers/baseUrl";
import type { AuthSession, LoginDto, ResponseSession } from "../common/types";
import { setAuthSessionStore } from "../common/stores/authSession";

class AuthService {
    private api : AxiosInstance;
    constructor(){
        this.api = axios.create({
            baseURL: BASE_URL,
            withCredentials: true,
        })
    }   

    public async startSession() : Promise<{data: ResponseSession}> {
        const response = await this.api.get<{data: ResponseSession}>("/auth/session");
        setAuthSessionStore(response.data.data.user);
        return response.data;
    }

    public async loginUser(data:LoginDto){
        return await this.api.post("/auth/login", data);
    }

    public async logoutUser(){
        
    }
}

export const authService = new AuthService();