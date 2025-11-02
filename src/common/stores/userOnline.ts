import { Store } from '@tanstack/svelte-store';

export const userOnlineStore = new Store<string[]>([]);

export const setAllUserOnline = (users: string[]) => {
	userOnlineStore.setState(users);
};
