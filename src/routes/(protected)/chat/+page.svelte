<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { createSocket } from '../../../common/helpers/socket';

	const { sendMessage } = createSocket();

	let inputText = '';

	function handleSend() {
		if (inputText.trim() !== '') {
			sendMessage(inputText);
			inputText = '';
		}
	}
</script>

<!-- <div class="flex flex-col h-screen p-4">
	<div class="flex-1  overflow-auto mb-2">
		<div class="bg-amber-400 h-[900px] p-4 rounded">
			<h1 class="text-2xl font-bold mb-4">Aplikasi Chat</h1>
			<p class="text-gray-600">
				Selamat datang di aplikasi chat. Klik tombol di bawah untuk memulai chat.
			</p>
		</div>
	</div>

	<div class="flex gap-2">
		<input
			bind:value={inputText}
			placeholder="Ketik pesan..."
			class="border w-full p-2 rounded flex-1"
		/>
		<Button
			class="bg-amber-500 hover:bg-amber-600"
			disabled={inputText.trim() === ''}
			onclick={handleSend}>Kirim</Button
		>
	</div>
</div> -->

<div class="flex flex-col h-screen p-4">
	<div class="overflow-auto mb-2 flex-1">
		<div class="bg-amber-400 h-[900px] p-4 rounded">
			<h1 class="text-2xl font-bold mb-4">Aplikasi Chat</h1>
			<p class="text-gray-600">
				Selamat datang di aplikasi chat. Klik tombol di bawah untuk memulai chat.
			</p>
		</div>
	</div>
	<div class="flex gap-2">
		<input
			bind:value={inputText}
			placeholder="Ketik pesan..."
			class="border w-full p-2 rounded flex-1"
		/>
		<Button
			class="bg-amber-500 hover:bg-amber-600"
			disabled={inputText.trim() === ''}
			onclick={handleSend}>Kirim</Button
		>
	</div>
</div>
