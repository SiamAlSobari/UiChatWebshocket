<script lang="ts">
	import { MessageCircleMore} from '@lucide/svelte';
	import UserList from './ChatList.svelte';
	import Blank from './Blank.svelte';
	import { useStore } from '@tanstack/svelte-store';
	import { selectedUserStore } from '../common/stores/selectedUser';

	let { children } = $props();

	const navItems = [
		{ id: 1, title: 'Chat', icon: MessageCircleMore },
	];

	let currentNavId = $state(1);
	const currentUserId = useStore(selectedUserStore);

</script>

<aside class="flex min-h-screen">
	<!-- Sidebar -->
	<div class="flex sticky h-screen top-0">
		<section
			class="flex z-[9999] flex-col items-center border-r bg-amber-50/5 border-gray-300/50 w-16 py-4 backdrop-blur-md"
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
		{#if currentNavId === 1}
			<UserList />
		{:else if currentNavId === 2}
			<UserList />
		{/if}
	</div>
	<!-- end sidebar -->

	<main class="flex-1 bg-white/50 overflow-auto">
		{#if !currentUserId.current}
			<Blank />
		{:else}
			{@render children()}
		{/if}
	</main>
</aside>
