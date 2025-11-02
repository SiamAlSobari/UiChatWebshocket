import type { AxiosInstance } from "axios";
import axios from "axios";
import { BASE_URL } from "../common/helpers/baseUrl";
import type { Contact } from "../common/types";

class ContactService {
    private api : AxiosInstance

    constructor(){
        this.api = axios.create({
            baseURL: BASE_URL,
            withCredentials: true,
        })
    }

    public async getContacts() : Promise<Contact[]> {
        const response = await this.api.get("/contact");
        return response.data.data;
    }

    public async getContact(userId: string) : Promise<Contact> {
        const response = await this.api.get(`/contact/${userId}`);
        return response.data.data;
    }
}

export const contactService = new ContactService();