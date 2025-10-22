<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { createSocket } from '../../../common/helpers/socket';

	const { sendMessage } = createSocket();
	let inputText = '';

	function handleSend() {
		if (inputText.trim() !== '') {
			sendMessage(inputText);
			inputText = '';
		}
	}

	const dummyChats = [
		{
			id: 1,
			chat_id: 1,
			sender_id: 1,
			content: 'Halo, apa kabar?'
		},
		{
			id: 2,
			chat_id: 1,
			sender_id: 2,
			content: 'Halo, apa kabar?'
		},
		{
			id: 3,
			chat_id: 1,
			sender_id: 1,
			content: 'Halo, apa kabar?'
		},
		{
			id: 4,
			chat_id: 1,
			sender_id: 2,
			content: 'Halo, apa kabar?'
		}
	];
</script>

<div class="overflow-auto flex-1 mb-2 p-2">
	<div class="bg-amber-400 h-[900px] p-4 rounded">
		<h1 class="text-2xl font-bold mb-4">Aplikasi Chat</h1>
		<p class="text-gray-600">Selamat datang di aplikasi chat.</p>
	</div>
</div>

<div class="flex gap-2 p-1">
	<input
		bind:value={inputText}
		placeholder="Ketik pesan..."
		class="border w-full p-2 rounded flex-1"
	/>
	<Button
		class="bg-amber-500 hover:bg-amber-600"
		disabled={inputText.trim() === ''}
		onclick={handleSend}
	>
		Kirim
	</Button>
</div>
