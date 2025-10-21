<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { createForm } from '@tanstack/svelte-form';
	import z from 'zod';
	import FieldInfo from '../../../components/FieldInfo.svelte';

	const schema = z.object({
		user_name: z
			.string({ message: 'Username harus diisi' })
			.min(3, { message: 'Username minimal 3 karakter' })
			.max(20, { message: 'Username maksimal 20 karakter' }),
		password: z
			.string({ message: 'Password harus diisi' })
			.min(3, { message: 'Password minimal 3 karakter' })
			.max(20, { message: 'Password maksimal 20 karakter' })
	});
	const form = createForm(() => ({
		defaultValues: {
			user_name: '',
			password: ''
		},
		validators: {
			onChange: schema
		},
		onSubmit: async ({ value }) => {
			alert(JSON.stringify(value));
		}
	}));
</script>

<div class="p-4">
	<h1 class="text-2xl font-bold text-center">Login</h1>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			form.handleSubmit(e);
		}}
		id="from"
		class="flex flex-col gap-3"
	>
		<form.Field name="user_name">
			{#snippet children(field)}
				<div class="flex flex-col gap-2">
					<label for={field.name} class="text-sm font-semibold text-gray-700"> Username </label>
					<input
						id={field.name}
						value={field.state.value}
						oninput={(e: Event) => {
							const target = e.target as HTMLInputElement;
							field.handleChange(target.value);
						}}
						onblur={() => field.handleBlur()}
						class="w-full border border-gray-300 rounded-lg p-2 focus:border-transparent transition"
						placeholder="Masukkan username..."
					/>
					<FieldInfo {field} />
				</div>
			{/snippet}
		</form.Field>
		<form.Field name="password">
			{#snippet children(field)}
				<div class="flex flex-col gap-2">
					<label for="user_name" class="text-sm font-semibold text-gray-700"> Username </label>
					<input
						id={field.name}
						value={field.state.value}
						oninput={(e: Event) => {
							const target = e.target as HTMLInputElement;
							field.handleChange(target.value);
						}}
						onblur={() => field.handleBlur()}
						class="w-full border border-gray-300 rounded-lg p-2 focus:border-transparent transition"
						placeholder="Masukkan username..."
					/>
					<FieldInfo {field} />
				</div>
			{/snippet}
		</form.Field>
		<Button type="submit" class="bg-amber-500 hover:bg-amber-600">Login</Button>
	</form>
</div>
