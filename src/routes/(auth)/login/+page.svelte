<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { createForm } from '@tanstack/svelte-form';
	import z from 'zod';
	import FieldInfo from '../../../components/FieldInfo.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { authService } from '../../../services/authService';
	import type { LoginDto } from '../../../common/types';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	const schema = z.object({
		email: z
			.string({ message: 'Username harus diisi' })
			.min(3, { message: 'Username minimal 3 karakter' })
			.email({ message: 'Format email tidak valid' })
			.max(20, { message: 'Username maksimal 20 karakter' }),
		password: z
			.string({ message: 'Password harus diisi' })
			.min(3, { message: 'Password minimal 3 karakter' })
			.max(20, { message: 'Password maksimal 20 karakter' })
	});

	const loginUser = createMutation(() => ({
		mutationFn: (data: LoginDto) => authService.loginUser(data),
		mutationKey: ['loginUser'],
		onSuccess: () => {
			toast.success('Login berhasil!');
			goto('/chat', {
				invalidateAll: true
			});
		}
	}));

	const form = createForm(() => ({
		defaultValues: {
			email: '',
			password: ''
		},
		validators: {
			onChange: schema
		},
		onSubmit: async ({ value }) => {
			loginUser.mutate({
				email: value.email,
				password: value.password
			});
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
		class="flex flex-col gap-3"
	>
		<form.Field name="email">
			{#snippet children(field)}
				<div class="flex flex-col gap-2">
					<label for={field.name} class="text-sm font-semibold text-gray-700"> Email </label>
					<input
						id={field.name}
						value={field.state.value}
						oninput={(e: Event) => {
							const target = e.target as HTMLInputElement;
							field.handleChange(target.value);
						}}
						onblur={() => field.handleBlur()}
						class="w-full border border-gray-300 rounded-lg p-2 focus:border-transparent transition"
						placeholder="Masukkan email..."
						type="email"
					/>
					<FieldInfo {field} />
				</div>
			{/snippet}
		</form.Field>
		<form.Field name="password">
			{#snippet children(field)}
				<div class="flex flex-col gap-2">
					<label for={field.name} class="text-sm font-semibold text-gray-700"> Password </label>
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
