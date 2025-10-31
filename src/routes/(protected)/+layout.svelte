<script lang="ts">
	import { onMount } from 'svelte';
	import { createSocket } from '../../common/helpers/socket';
	import Sidebar from '../../components/Sidebar.svelte';

	let { children } = $props();
	const { connect, sendMessage } = createSocket();

	onMount(async () => {
		await connect(); // tunggu sampai benar-benar connected
		console.log('✅ WebSocket connected');
	});
</script>

<Sidebar>
	{@render children()}
</Sidebar>
