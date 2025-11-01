import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { BASE_URL } from '../common/helpers/baseUrl';
import type { Message } from '../common/types';

class ChatService {
	private api: AxiosInstance;
	constructor() {
		this.api = axios.create({
			baseURL: BASE_URL,
			withCredentials: true
		});
	}

	public async getChats(chatRoomId: string): Promise<Message[]> {
		const response = await this.api.get(`/chat/messages/${chatRoomId}`);
		return response.data.data;
	}
}

export const chatService = new ChatService();
