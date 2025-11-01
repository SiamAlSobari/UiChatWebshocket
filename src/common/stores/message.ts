import { Store } from '@tanstack/svelte-store';
import type { MessageStore } from '../types';

export const messageStore = new Store<{ message: MessageStore[] } | null>(null);

export const setMessageStore = (newMessages: MessageStore) => {
	messageStore.setState((state) => ({
		message: [...(state?.message || []), newMessages]
	}));
};

export const clearMessageStore = () => {
	messageStore.setState(null);
};