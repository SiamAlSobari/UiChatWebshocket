import { browser } from '$app/environment';
import { useStore } from '@tanstack/svelte-store';
import { authSessionStore } from '../stores/authSession';
import { markReadMessages, setMessageStore } from '../stores/message';
import { setAllUserOnline } from '../stores/userOnline';

export function createSocket() {
	let socket: WebSocket | null = null;
	let userId: string | null = null;

	function connect() {
		if (!browser) return;

		const user = useStore(authSessionStore);
		if (!user?.current?.id) {
			console.log('❌ No user ID found');
			return;
		}

		userId = user.current.id;
		const wsUrl = `http://localhost:3000/api/ws/connect?userId=${userId}`;

		socket = new WebSocket(wsUrl);

		socket.onopen = () => {
			console.log('✅ WebSocket connected');
		};

		socket.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				console.log('📨 WebSocket message:', data.type);

				switch (data.type) {
					case 'message':
						setMessageStore(data);
						break;

					case 'read_message':
						console.log('📖 REAL-TIME Read message event:', data);
						if (data.readerId && data.roomId) {
							// REAL-TIME: Update store dengan data dari backend
							markReadMessages(data.readerId, data.roomId, data.updatedMessages);
						}
						break;
					case 'user_status_online':
						console.log('📖 REAL-TIME User status event:', data);
						setAllUserOnline(data.users);
						break;

					case 'user_status_offline':
						console.log('📖 REAL-TIME User status event:', data);
						setAllUserOnline(data.users);
						break;

					default:
						console.log('Other event:', data.type);
				}
			} catch (error) {
				console.error('❌ Error parsing WebSocket message:', error);
			}
		};

		socket.onclose = () => {
			console.log('❌ WebSocket disconnected, reconnecting...');
			setTimeout(connect, 3000);
		};

		socket.onerror = (error) => {
			console.error('❌ WebSocket error:', error);
		};
	}
	function sendMessage(text: string, roomId: string, type = 'message') {
		if (!socket) {
			console.error('❌ WebSocket belum diinisialisasi');
			return;
		}

		if (socket.readyState !== WebSocket.OPEN) {
			console.error('❌ WebSocket belum open');
			return;
		}

		socket.send(JSON.stringify({ roomId, text, type }));
		console.log('📨 Pesan dikirim:', text);
	}

	// REAL-TIME: Ganti nama function untuk konsistensi
	function markAsRead(roomId: string, readerId: string) {
		if (socket && socket.readyState === WebSocket.OPEN) {
			const readMessage = { roomId, readerId, type: 'read_message' };
			socket.send(JSON.stringify(readMessage));
			console.log('📖 REAL-TIME: Mark as read triggered');
		} else {
			console.error('❌ WebSocket not connected for mark as read');
		}
	}

	// Auto connect
	
	connect()
	return {
		connect,
		sendMessage,
		markAsRead, // Ganti dari isReadMessage ke markAsRead
		disconnect: () => {
			if (socket) {
				socket.close();
			}
		},
	};
}
