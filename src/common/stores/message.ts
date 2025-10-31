import { Store } from '@tanstack/svelte-store';
import type { MessageStore } from '../types';

export const message = new Store<{ message: MessageStore } | null>(null);
