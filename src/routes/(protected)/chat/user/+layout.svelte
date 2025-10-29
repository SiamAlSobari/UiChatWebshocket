<script lang="ts">
	import NavbarUser from '../../../../components/NavbarUser.svelte';

	let { children } = $props();
</script>

<div class="flex flex-col h-screen">
	<NavbarUser />
    {@render children()}
</div>
