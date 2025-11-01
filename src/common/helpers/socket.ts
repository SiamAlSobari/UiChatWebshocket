import { writable } from 'svelte/store';
import { useStore } from '@tanstack/svelte-store';
import { authSessionStore } from '../stores/authSession';
import type { ChatEnum } from '../enums/chat';
import { setMessageStore } from '../stores/message';

let ws: WebSocket | null = null;
export const socketStore = writable<WebSocket | null>(null);

export function createSocket() {
	const user = useStore(authSessionStore);

	async function connect() {
		if (ws && ws.readyState === WebSocket.OPEN) {
			console.log('♻️ WebSocket sudah aktif');
			return;
		}

		return new Promise<void>((resolve, reject) => {
			ws = new WebSocket(`ws://localhost:3000/api/ws/connect?userId=${user?.current?.id}`);
			socketStore.set(ws);

			ws.onopen = () => {
				console.log('✅ WebSocket connected');
				resolve();
			};

			ws.onerror = (err) => {
				console.error('⚠️ WebSocket error:', err);
				reject(err);
			};

			ws.onclose = (event) => {
				console.log('❌ Disconnected:', event.reason);
				socketStore.set(null);
				ws = null;
			};

			ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					console.log('📩 Data dari server:', data);

					switch (data.type) {
						case 'connected':
							console.log(`📨 User ${data.userId} connected dengan RoomId:`, data.roomIds);
							break;
						case 'message':
							console.log('💬 Pesan diterima:', data);
							setMessageStore({
								roomId: data.roomId,
								text: data.text,
								type: data.type as ChatEnum,
								senderId: data.senderId,
								createdAt: data.createdAt,
								id: data.id
							});
							break;
						default:
							console.log('📦 Event tidak dikenal:', data);
					}
				} catch (err) {
					console.error('❌ Gagal parse pesan:', event.data, err);
				}
			};
		});
	}

	function sendMessage(text: string, roomId: string, type = 'message') {
		if (!ws) {
			console.error('❌ WebSocket belum diinisialisasi');
			return;
		}

		if (ws.readyState !== WebSocket.OPEN) {
			console.error('❌ WebSocket belum open');
			return;
		}

		ws.send(JSON.stringify({ roomId, text, type }));
		console.log('📨 Pesan dikirim:', text);
	}

	return { connect, sendMessage };
}
