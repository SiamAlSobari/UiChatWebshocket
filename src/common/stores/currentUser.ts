import { Store } from "@tanstack/svelte-store";

export const selectedUser = new Store<number | null>(null)

/**
 * Set the current user id in the store.
 * @param {number} id - id dari user
 */
export const setCurrentUser = (id: number) => {
    selectedUser.setState(id)
}

