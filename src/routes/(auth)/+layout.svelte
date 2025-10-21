<script lang="ts">
	let { children } = $props();

</script>

<div class="flex justify-center items-center min-h-screen bg-amber-50">
    <div class="p-4 rounded-md w-2/7 shadow-2xl bg-white border">
        {@render children()}
    </div>
</div>
