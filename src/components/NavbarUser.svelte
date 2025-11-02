<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { selectedUserStore } from '../common/stores/selectedUser';
	import { useStore } from '@tanstack/svelte-store';
	import { contactService } from '../services/contactService';
	import { userOnlineStore } from '../common/stores/userOnline';

	let selectedUser = useStore(selectedUserStore);

	let queryProfile = createQuery(() => ({
		queryKey: ['profile'],
		queryFn: () => contactService.getContact(selectedUser.current!)
	}));
	let userOnline = useStore(userOnlineStore);
	const isUserOnline = (id: string) => userOnline.current.includes(id);
</script>

<nav class=" bg-amber-100/45 border-b-2 border-gray-200 rounded-md">
	<div class="flex gap-1 p-3 flex-row">
		<img
			src={queryProfile.data?.contact.profile.image_url}
			alt={queryProfile.data?.contact_name}
			class="w-10 h-10 rounded-full object-cover"
		/>
		<div class="flex flex-col">
			<p class="font-medium text-gray-800 text-sm">{queryProfile.data?.contact_name}</p>
			{#if queryProfile.data}
				<p
					class={`text-xs ${
						isUserOnline(queryProfile.data!.contact_id)
							? 'text-green-600 font-medium'
							: 'text-gray-500'
					}`}
				>
					{isUserOnline(queryProfile.data!.contact_id) ? 'Online' : 'Offline'}
				</p>
			{/if}
		</div>
	</div>
</nav>
