<script lang="ts">
	import * as InputGroup from '$lib/components/ui/input-group/index';
	import { MessageCircleMore, SearchIcon, Users } from '@lucide/svelte';

	let { children } = $props();

	const navItems = [
		{ id: 1, title: 'Chat', icon: MessageCircleMore },
		{ id: 2, title: 'Group', icon: Users }
	];

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

	let currentNavId = $state(1);
	let currentUser = $state(0);
</script>

<aside class="flex min-h-screen bg-amber-50/30">
	<section
		class="flex flex-col items-center border-r border-gray-300/50 w-16 py-4 bg-white/60 backdrop-blur-md"
	>
		{#each navItems as item (item.id)}
			<div class="relative group mb-3">
				<button
					onclick={() => (currentNavId = item.id)}
					class={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
						${currentNavId === item.id ? 'bg-gray-200 text-black' : 'hover:bg-gray-100 text-gray-500'}`}
				>
					<item.icon class="w-5 h-5 transition-colors duration-200" />
				</button>

				<div
					class="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-md text-sm text-white bg-gray-900 shadow-lg
						scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-left
						whitespace-nowrap"
				>
					{item.title}
					<div
						class="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0
							border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-gray-900"
					></div>
				</div>
			</div>
		{/each}
	</section>

	<section
		class="w-96 border-r border-gray-200/70 bg-white/70 backdrop-blur-md p-4 flex flex-col gap-4"
	>
		<div>
			<InputGroup.Root>
				<InputGroup.Input placeholder="Search" />
				<InputGroup.Addon>
					<SearchIcon class="w-5 h-5 text-gray-500" />
				</InputGroup.Addon>
			</InputGroup.Root>
		</div>

		<div class="flex flex-col gap-1 overflow-y-auto">
			{#each userList as user}
				<button
					onclick={() => (currentUser = user.id)}
					class={`flex items-center gap-3 px-3 py-2 ${currentUser === user.id ? 'bg-gray-200' : ''} rounded-lg hover:bg-gray-100 cursor-pointer transition`}
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
		</div>
	</section>

	<main class="flex-1 bg-white/50 p-6">
		{@render children()}
	</main>
</aside>
