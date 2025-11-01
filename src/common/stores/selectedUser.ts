import { Store } from "@tanstack/svelte-store";


export const selectedUserStore = new Store<string | null>(null)

/**
 * Set the current user id in the store.
 * @param {string} id - id dari user
 */
export const setSelectedUserStore = (id: string) => {
    selectedUserStore.setState(id)
}

