<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ChatType } from '../../../../../common/enums/chatType';
	import { createSocket } from '../../../../../common/helpers/socket';

	const { sendMessage } = createSocket();
	let inputText = '';

	function handleSend() {
		if (inputText.trim() !== '') {
			sendMessage(inputText, "bcac1a51-3c35-4ced-88b2-422640fc4a4c",ChatType.PRIVATE, "message");
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
			content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus saepe vitae quod. Incidunt aliquid dicta atque autem beatae animi accusantium illo, voluptas quod pariatur vero laborum iusto corrupti, perferendis dolores."
		}
	];
</script>


<div class="overflow-auto flex-1 mb-2 p-3 space-y-2">
	<div class="flex flex-col gap-2">
		{#each dummyChats as chat (chat.id)}
			{#if chat.sender_id === 1}
				<div class="flex justify-end">
					<p class="bg-blue-500 text-white px-3 py-2 rounded-br-none rounded-2xl shadow-md">
						{chat.content}
					</p>
				</div>
			{:else}
				<div class="flex justify-start">
					<p class="bg-gray-300 text-gray-800 px-3 py-2 max-w-[70%] rounded-2xl rounded-tl-none shadow-md">
						{chat.content}
					</p>
				</div>
			{/if}
		{/each}
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
