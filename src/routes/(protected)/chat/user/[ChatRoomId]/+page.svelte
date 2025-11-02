<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { useStore } from '@tanstack/svelte-store';
	import { createSocket } from '../../../../../common/helpers/socket';
	import { authSessionStore } from '../../../../../common/stores/authSession';
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';
	import { chatService } from '../../../../../services/chatService';
	import { clearMessageStore, messageStore } from '../../../../../common/stores/message';
	import type { MessageStore } from '../../../../../common/types';

	const { sendMessage,isReadMessage } = createSocket();
	let inputText = $state('');
	let user = useStore(authSessionStore);

	let ChatRoomId = $state('');

	// ✅ fungsi format waktu biar gampang dibaca
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleString('id-ID', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	const queryMessages = createQuery(() => ({
		queryKey: ['messages', ChatRoomId],
		queryFn: () => chatService.getChats(ChatRoomId!),
		refetchOnWindowFocus: false
	}));

	let messagesOnStore = useStore(messageStore);
	let messages = $state<MessageStore[]>([]);
	let chatContainer: HTMLDivElement;

	const scrollToBottom = () => {
		if (chatContainer) {
			setTimeout(() => {
				chatContainer.scrollTo({
					top: chatContainer.scrollHeight,
					behavior: 'smooth'
				});
			}, 50);
		}
	};

	function handleSend() {
		if (inputText.trim() !== '') {
			sendMessage(inputText, ChatRoomId!, 'message');
			inputText = '';
			scrollToBottom();
		}
	}
	$effect(() => {
		const newChatRoom = $page.params.ChatRoomId!;
		if (ChatRoomId !== newChatRoom) {
			ChatRoomId = newChatRoom;
			clearMessageStore();
			isReadMessage(ChatRoomId!);
			console.log('ChatRoomId:', ChatRoomId);
		}
		messages = messagesOnStore.current?.message || [];
		scrollToBottom();
		if (queryMessages.data) {
			scrollToBottom();
		}
	});

</script>

<!-- Pesan Chat -->
<div bind:this={chatContainer} class="overflow-auto flex-1 mb-2 p-3 space-y-2">
	<div class="flex flex-col gap-2">
		<!-- Pesan dari Query -->
		{#each queryMessages.data as chat (chat.id)}
			{#if chat.sender_id === user.current?.id && chat.chat_room_id === ChatRoomId}
				<div class="flex flex-col items-end">
					<p
						class="bg-blue-500 text-white px-3 py-2 rounded-br-none rounded-2xl shadow-md max-w-[70%]"
					>
						{chat.text}
					</p>
					<span class="text-[10px] text-gray-400 mt-1">
						{formatDate(chat.createdAt)}
					</span>
				</div>
			{:else if chat.sender_id !== user.current?.id && chat.chat_room_id === ChatRoomId}
				<div class="flex flex-col items-start">
					<p
						class="bg-gray-300 text-gray-800 px-3 py-2 rounded-tl-none rounded-2xl shadow-md max-w-[70%]"
					>
						{chat.text}
					</p>
					<span class="text-[10px] text-gray-400 mt-1">
						{formatDate(chat.createdAt)}
					</span>
				</div>
			{/if}
		{/each}

		<!-- Pesan dari Store (real-time dari WebSocket) -->
		{#each messages as message (message.id)}
			{#if message.sender_id === user.current?.id && message.chat_room_id === ChatRoomId}
				<div class="flex flex-col items-end">
					<p
						class="bg-blue-500 text-white px-3 py-2 rounded-br-none rounded-2xl shadow-md max-w-[70%]"
					>
						{message.text}
					</p>
					<span class="text-[10px] text-gray-400 mt-1">
						{formatDate(message.createdAt)}
					</span>
				</div>
			{:else if message.sender_id !== user.current?.id && message.chat_room_id === ChatRoomId}
				<div class="flex flex-col items-start">
					<p
						class="bg-gray-300 text-gray-800 px-3 py-2 rounded-tl-none rounded-2xl shadow-md max-w-[70%]"
					>
						{message.text}
					</p>
					<span class="text-[10px] text-gray-400 mt-1">
						{formatDate(message.createdAt)}
					</span>
				</div>
			{/if}
		{/each}
	</div>
</div>

<!-- Input Pesan -->
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
