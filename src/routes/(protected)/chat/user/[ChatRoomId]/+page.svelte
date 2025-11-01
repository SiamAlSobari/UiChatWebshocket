<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { useStore } from '@tanstack/svelte-store';
	import { createSocket } from '../../../../../common/helpers/socket';
	import { authSessionStore } from '../../../../../common/stores/authSession';
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';
	import { chatService } from '../../../../../services/chatService';
	import { messageStore } from '../../../../../common/stores/message';
	import type { MessageStore } from '../../../../../common/types';

	const { sendMessage } = createSocket();
	let inputText = $state('');
	let user = useStore(authSessionStore);

	let ChatRoomId = $state('');
	$effect(() => {
		ChatRoomId = $page.params.ChatRoomId!;
	});
	function handleSend() {
		if (inputText.trim() !== '') {
			sendMessage(inputText, ChatRoomId!, 'message');
			inputText = '';
		}
	}

	const queryMessages = createQuery(() => ({
		queryKey: ['messages', ChatRoomId],
		queryFn: () => chatService.getChats(ChatRoomId!)
	}));
	let messagesOnStore = useStore(messageStore);
	let messages = $state<MessageStore[]>([]);
	$effect(() => {
		messages = messagesOnStore.current?.message || [];
	});
</script>

<div class="overflow-auto flex-1 mb-2 p-3 space-y-2">
	<div class="flex flex-col gap-2">
		{#each queryMessages.data as chat (chat.id)}
			{#if chat.sender_id === user.current?.id && chat.chat_room_id === ChatRoomId}
				<div class="flex justify-end">
					<p class="bg-blue-500 text-white px-3 py-2 rounded-br-none rounded-2xl shadow-md">
						{chat.text}
					</p>
				</div>
			{:else if chat.sender_id !== user.current?.id && chat.chat_room_id === ChatRoomId}
				<div class="flex justify-start">
					<p
						class="bg-gray-300 text-gray-800 px-3 py-2 max-w-[70%] rounded-2xl rounded-tl-none shadow-md"
					>
						{chat.text} dari query
					</p>
				</div>
			{/if}
		{/each}
		{#each messages as message (message.id)}
			{#if message.senderId === user.current?.id  && message.roomId === ChatRoomId}
				<div class="flex justify-end">
					<p class="bg-blue-500 text-white px-3 py-2 rounded-br-none rounded-2xl shadow-md">
						{message.text}
					</p>
				</div>
			{:else if message.senderId !== user.current?.id && message.roomId === ChatRoomId}
				<div class="flex justify-start">
					<p
						class="bg-gray-300 text-gray-800 px-3 py-2 max-w-[70%] rounded-2xl rounded-tl-none shadow-md"
					>
						{message.text} dari store
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
