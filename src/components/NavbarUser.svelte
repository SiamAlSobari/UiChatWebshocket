<script lang="ts">
	const user = {
		id: 1,
		name: 'John Doe',
		avatar:
			'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
	};
</script>

<nav class=" bg-amber-100/45 rounded-md">
	<div class="flex gap-1 p-3 flex-row">
		<img src={user.avatar} alt={user.name} class="w-10 h-10 rounded-full object-cover" />
		<div class="flex flex-col">
			<p class="font-medium text-gray-800 text-sm">{user.name}</p>
			<p class="text-xs text-gray-500">Online</p>
		</div>
	</div>
</nav>
