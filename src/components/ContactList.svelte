<script lang="ts">
	import { setCurrentUser } from '../common/stores/currentUser';
	import type { Contact } from '../common/types';

	interface Props {
		contact: Contact[];
		isSuccess: boolean;
		isLoading: boolean;
		currentUsers: string;
	}
	let { contact, isLoading, isSuccess, currentUsers }: Props = $props();
</script>

<div class="flex flex-col gap-1 overflow-y-auto">
	{#if isLoading}
		<p>Loading</p>
	{:else if isSuccess}
		{#if contact.length === 0}
			<p class="text-sm text-gray-500 text-center py-3">No users found</p>
		{:else}
			{#each contact as contact (contact.id)}
				<button
					onclick={() => ((currentUsers = contact.user.id), setCurrentUser(contact.user.id))}
					class={`flex items-center gap-3 px-3 py-2 ${
						currentUsers === contact.user.id ? 'bg-gray-200' : ''
					} rounded-lg hover:bg-gray-100 cursor-pointer transition`}
				>
					<img
						src={contact.user.profile.image_url}
						alt={contact.user.profile.full_name}
						class="w-10 h-10 rounded-full object-cover border border-gray-200"
					/>
					<div>
						<p class="font-medium text-gray-800 text-sm">{contact.contact_name}</p>
						<p class="text-xs text-gray-500">Online</p>
					</div>
				</button>
			{/each}
		{/if}
	{:else}
		<p class="text-sm text-gray-500 text-center py-3">No users found</p>
	{/if}
</div>
