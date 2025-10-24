<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'

	let { children } = $props();
	const queryClient = new QueryClient();
</script>



<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	{@render children?.()}
	<SvelteQueryDevtools initialIsOpen={false} position='bottom' />
</QueryClientProvider>
