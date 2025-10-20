<script lang="ts">
	import { onMount } from 'svelte';
	import { createSocket } from '../../common/helpers/socket';
	import Sidebar from '../../components/Sidebar.svelte';

	let { children } = $props();
	const { connect } = createSocket();

	onMount(() => {
		connect();
	});
</script>

<Sidebar >
	{@render children()}
</Sidebar>
