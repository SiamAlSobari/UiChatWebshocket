import { Store } from "@tanstack/svelte-store";
import type { AuthSession } from "../types";

export const authSessionStore = new Store<AuthSession | null>(null);

/**
 * Mengatur session otentikasi saat ini.
 * @param session - menerima session baru dari type AuthSession
 */
export const setAuthSessionStore = (session: AuthSession) => {
    authSessionStore.setState(session);
}