<script lang="ts">
	import * as InputGroup from '$lib/components/ui/input-group/index';
	import { SearchIcon } from '@lucide/svelte';
	import { setCurrentUser } from '../common/stores/currentUser';
	import { Button } from '$lib/components/ui/button/index';
	import { createQuery } from '@tanstack/svelte-query';
	import { contactService } from '../services/contactService';
	import ContactList from './ContactList.svelte';
	let currentUsers = $state('');
	let searchUser = $state('');
	let queryContact = createQuery(() => ({
		queryKey: ['contact'],
		queryFn: () => contactService.getContacts()
	}));

	let filtered = $derived.by(() => {
		const contact = queryContact?.data ?? [];
		return contact.filter((c) => c.contact_name.toLowerCase().includes(searchUser.toLowerCase()));
	});
</script>

<section
	class="w-96 border-r border-gray-200/85 bg-amber-50/5 backdrop-blur-md p-4 flex flex-col gap-4"
>
	<div>
		<InputGroup.Root>
			<InputGroup.Input bind:value={searchUser} placeholder="Search" />
			<InputGroup.Addon>
				<SearchIcon class="w-5 h-5 text-gray-500" />
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
	<div class="flex gap-2">
		<Button variant="outline" class="text-[15px]">Poeple</Button>
		<Button variant="outline" class="text-[15px]">Groups</Button>
	</div>

	<ContactList
		contact={filtered}
		isLoading={queryContact.isLoading}
		isSuccess={queryContact.isSuccess}
		{currentUsers}
	/>
</section>
