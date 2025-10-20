<script lang="ts">
	import { MessageCircleMore, Settings, Users } from '@lucide/svelte';

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
</script>

<aside class="flex">
	<div class="flex">
		<section class="flex min-h-screen border-r flex-col gap-1">
			{#each navItems as item}
				<div>
					<item.icon class="w-6 opacity-60 h-6" />
					<span>{item.title}</span>
				</div>
			{/each}
		</section>
		<section></section>
	</div>
	<main class="w-full">
		<slot />
	</main>
</aside>
