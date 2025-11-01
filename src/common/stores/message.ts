import { Store } from '@tanstack/svelte-store';
import type { MessageStore } from '../types';

export const messageStore = new Store<{ message: MessageStore[] } | null>(null);

export const addMessageStore = (newMessages: MessageStore) => {
	messageStore.setState((state) => ({
		message: [...(state?.message || []), newMessages]
	}));
};
