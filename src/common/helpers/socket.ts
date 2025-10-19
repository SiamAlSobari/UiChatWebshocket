import { onDestroy } from 'svelte';
import { writable } from 'svelte/store';

export function createSocket() {
	let socket = writable<WebSocket | null>(null);
	let ws: WebSocket | null = null;
	function connect() {
		ws = new WebSocket('ws://localhost:4000/api/ws/connect');
		socket.set(ws);
		ws.onopen = () => {
			console.log('✅ WebSocket connected');
			ws?.send(
				JSON.stringify({
					type: 'init',
					userId: 'user123' // nanti ganti dengan userId dinamis
				})
			);
		};

		ws.onmessage = (event) => {
			console.log('📩 Message from server:', event.data);
		};

		ws.onclose = () => {
			console.log('❌ Disconnected');
			socket.set(null);
		};

		ws.onerror = (err) => {
			console.error('⚠️ WebSocket error:', err);
		};
	}

	function sendMessage(message: string) {
		ws?.send(
			JSON.stringify({
				type: 'message',
				to: 'user321', // nanti ganti dengan userId dinamis
				from: 'user123',
				text: message
			})
		);
	}

	return { connect, sendMessage };
}
