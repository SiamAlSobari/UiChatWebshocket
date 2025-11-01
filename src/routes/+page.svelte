<script lang="ts">

	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { useStore } from '@tanstack/svelte-store';

	let show = $state(false);

	onMount(() => {
		show = true;
	});

</script>

<div
	class="flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-b from-amber-100 to-amber-200/55 px-6"
>
	{#if show}
		<div in:fly={{ y: 30, duration: 1000 }}>
			<h1 class="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
				Selamat Datang di <span class="text-amber-600">Aplikasi Chat</span>
			</h1>
			<p class="text-lg text-gray-700 max-w-2xl leading-relaxed mb-8">
				Aplikasi ini dirancang untuk memudahkan komunikasi antar pengguna secara
				<b>real-time</b>. Kirim pesan dengan cepat, bangun koneksi, dan nikmati pengalaman chat yang
				sederhana namun modern — semuanya langsung dari browsermu.
			</p>

			<button
			onclick={()=>{
				goto('/chat',{
					invalidateAll: true
				})
			}}
				class="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl shadow-md hover:bg-amber-600 hover:shadow-lg transition-all duration-300"
			>
				Mulai Chat Sekarang

			</button>
		</div>
	{/if}
</div>
