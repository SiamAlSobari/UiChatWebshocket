import { Store } from "@tanstack/svelte-store";


export const selectedUser = new Store<string | null>(null)

/**
 * Set the current user id in the store.
 * @param {string} id - id dari user
 */
export const setCurrentUser = (id: string) => {
    selectedUser.setState(id)
}

