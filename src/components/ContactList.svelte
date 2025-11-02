<script lang="ts">
	import { goto } from '$app/navigation';
	import { useStore } from '@tanstack/svelte-store';
	import { selectedUserStore, setSelectedUserStore } from '../common/stores/selectedUser';
	import type { Contact } from '../common/types';
	import { userOnlineStore } from '../common/stores/userOnline';

	interface Props {
		contact: Contact[];
		isSuccess: boolean;
		isLoading: boolean;
	}
	let { contact, isLoading, isSuccess }: Props = $props();
	let selectedUser = useStore(selectedUserStore);
	let userOnline = useStore(userOnlineStore);

	// 🔹 Fungsi untuk cek apakah user online
	const isUserOnline = (id: string) => userOnline.current.includes(id);
</script>

<div class="flex flex-col gap-1 overflow-y-auto">
	{#if isLoading}
		<p>Loading...</p>
	{:else if isSuccess}
		{#if contact.length === 0}
			<p class="text-sm text-gray-500 text-center py-3">No users found</p>
		{:else}
			{#each contact as contact (contact.id)}
				<button
					onclick={() => (
						setSelectedUserStore(contact.contact.id),
						goto(`/chat/user/${contact.contact.chatRooms[0].chat_room_id}`)
					)}
					class={`flex items-center gap-3 px-3 py-2 ${
						selectedUser.current === contact.contact.id ? 'bg-gray-200' : ''
					} rounded-lg hover:bg-gray-100 cursor-pointer transition`}
				>
					<!-- Avatar -->
					<div class="relative">
						<img
							src={contact.contact.profile.image_url}
							alt={contact.contact.profile.full_name}
							class="w-10 h-10 rounded-full object-cover border border-gray-200"
						/>
						<!-- Badge online/offline kecil di pojok bawah avatar -->
						<span
							class={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
								isUserOnline(contact.contact.id) ? 'bg-green-500' : 'bg-gray-400'
							}`}
						></span>
					</div>

					<!-- Info -->
					<div class="flex flex-col items-start">
						<p class="font-medium text-gray-800 text-sm">
							{contact.contact_name}
						</p>
						<p
							class={`text-xs ${
								isUserOnline(contact.contact.id) ? 'text-green-600 font-medium' : 'text-gray-500'
							}`}
						>
							{isUserOnline(contact.contact.id) ? 'Online' : 'Offline'}
						</p>
					</div>
				</button>
			{/each}
		{/if}
	{:else}
		<p class="text-sm text-gray-500 text-center py-3">No users found</p>
	{/if}
</div>
