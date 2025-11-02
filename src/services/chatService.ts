import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { BASE_URL } from '../common/helpers/baseUrl';
import type { Message, MessageStore } from '../common/types';
import { setAllMessageStore } from '../common/stores/message';

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
		setAllMessageStore(response.data.data);
		return response.data.data;
	}

	public async getAllMessages(): Promise<MessageStore[]> {
		const response = await this.api.get('/chat/messages');
		setAllMessageStore(response.data.data);
		console.log('📦 Semua pesan saaaaaaaaaaaaaaaaaaa:', response.data.data);
		return response.data.data;
	}
}

export const chatService = new ChatService();
