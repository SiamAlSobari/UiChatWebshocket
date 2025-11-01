import { Store } from '@tanstack/svelte-store';
import type { MessageStore } from '../types';

export const messageStore = new Store<{ message: MessageStore[] } | null>(null);

export const addMessageStore = (newmEssages: MessageStore) => {
	messageStore.setState((state) => ({
		message: [...(state?.message || []), newmEssages]
	}));
};
