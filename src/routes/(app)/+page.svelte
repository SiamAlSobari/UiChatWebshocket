<script lang="ts">
	import { createSocket } from '../../common/helpers/socket';

	const { connect, sendMessage } = createSocket();

	let inputText = '';

	function handleSend() {
		if (inputText.trim() !== '') {
			sendMessage(inputText);
			inputText = '';
		}
	}
</script>

<div class="p-4 flex gap-2">
	<input
		bind:value={inputText}
		placeholder="Ketik pesan..."
		class="border p-2 rounded flex-1"
	/>
	<button on:click={handleSend} class="bg-blue-500 text-white px-4 py-2 rounded">
		Kirim
	</button>
</div>
