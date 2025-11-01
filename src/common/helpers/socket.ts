import { writable } from 'svelte/store';
import { useStore } from '@tanstack/svelte-store';
import { authSessionStore } from '../stores/authSession';
import type { ChatEnum } from '../enums/chat';

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

			ws.onclose = () => {
				console.log('❌ Disconnected');
				socketStore.set(null);
				ws = null;
			};

			ws.onmessage = (event) => {
				const data = JSON.parse(event.data);
				switch (data.type) {
					case 'connected':
						console.log(`📨 User ${data.userId} connected`);
						console.log(`Dengan RoomId: ${JSON.stringify(data.roomIds)}`);
						break;
					case 'message':
						console.log('📨 Pesan diterima:', event.data);
						break;
					default:
						console.log('📨 Pesan tidak diketahui:', event.data);
				}
			};
		});
	}

	function sendMessage(text: string, roomId: string, type: string) {
		if (!ws) {
			console.error('❌ WebSocket belum diinisialisasi');
			return;
		}

		if (ws.readyState !== WebSocket.OPEN) {
			console.error('❌ WebSocket is not open');
			return;
		}

		ws.send(
			JSON.stringify({
				roomId: roomId,
				text,
				type
			})
		);
		console.log('📨 Pesan dikirim:', text);
	}

	return { connect, sendMessage };
}
