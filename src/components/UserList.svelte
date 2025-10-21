<script lang="ts">
	import * as InputGroup from '$lib/components/ui/input-group/index';
	import { SearchIcon } from '@lucide/svelte';
	import { setCurrentUser } from '../common/stores/currentUser';
	const userList = [
		{
			id: 1,
			name: 'John Doe',
			avatar:
				'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
		},
		{
			id: 2,
			name: 'Jane Smith',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
		},
		{
			id: 3,
			name: 'Michael Lee',
			avatar:
				'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80'
		}
	];
	let currentUsers = $state(0);
	let searchUser = $state('');
	let filtered = $derived.by(() =>userList.filter((user) => user.name.toLowerCase().includes(searchUser.toLowerCase())));
</script>

<section
	class="w-96 border-r border-gray-200/70 bg-amber-50/5 backdrop-blur-md p-4 flex flex-col gap-4"
>
	<div>
		<InputGroup.Root>
			<InputGroup.Input bind:value={searchUser} placeholder="Search" />
			<InputGroup.Addon>
				<SearchIcon class="w-5 h-5 text-gray-500" />
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>

	<div class="flex flex-col gap-1 overflow-y-auto">
		{#if filtered.length > 0}
			{#each filtered as user}
				<button
					onclick={() => (currentUsers = user.id, setCurrentUser(user.id))}
					class={`flex items-center gap-3 px-3 py-2 ${
						currentUsers === user.id ? 'bg-gray-200' : ''
					} rounded-lg hover:bg-gray-100 cursor-pointer transition`}
				>
					<img
						src={user.avatar}
						alt={user.name}
						class="w-10 h-10 rounded-full object-cover border border-gray-200"
					/>
					<div>
						<p class="font-medium text-gray-800 text-sm">{user.name}</p>
						<p class="text-xs text-gray-500">Online</p>
					</div>
				</button>
			{/each}
		{:else}
			<p class="text-sm text-gray-500 text-center py-3">No users found</p>
		{/if}
	</div>
</section>
