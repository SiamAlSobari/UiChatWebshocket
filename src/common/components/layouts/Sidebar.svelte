<script lang="ts">
	import { MessageCircleMore, Users } from '@lucide/svelte';
	const navItems = [
		{
			id: 1,
			title: 'Chat',
			icon: MessageCircleMore
		},
		{
			id: 2,
			title: 'Group',
			icon: Users
		}
	];
	let currentNavId = $state(1);
</script>

<aside class="flex">
	<div class="flex">
		<section
			class="flex min-h-screen border-r border-gray-500/30 flex-col gap-2 p-3 bg-amber-50/40"
		>
			{#each navItems as item (item.id)}
				<div class="relative group flex justify-center">
					<button
						onclick={() => (currentNavId = item.id)}
						class={`flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-all duration-200 ${currentNavId === item.id ? 'bg-gray-200' : ''}`}
					>
						<item.icon
							class={`w-6 h-6 ${currentNavId === item.id ? 'text-black/80' : 'text-gray-500'} group-hover:text-black transition-colors duration-200`}
						/>
					</button>

					<div
						class="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg text-sm text-white bg-gray-900 shadow-lg
							scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-left
							whitespace-nowrap"
					>
						<span>{item.title}</span>

						<div
							class="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0
								border-t-[5px] border-t-transparent
								border-b-[5px] border-b-transparent
								border-r-[5px] border-r-gray-900"
						></div>
					</div>
				</div>
			{/each}
		</section>

		<section></section>
	</div>

	<main class="w-full">
		<slot />
	</main>
</aside>
