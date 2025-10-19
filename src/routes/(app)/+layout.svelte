<script lang="ts">
	import { onMount } from 'svelte';
	import { createSocket } from '../../common/helpers/socket';

    let {children} = $props()
    const { connect } = createSocket();

    onMount(() => {
        connect();
    });
</script>
{@render children()}