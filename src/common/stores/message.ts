import { Store } from '@tanstack/svelte-store';
import type { MessageStore } from '../types';

export const messageStore = new Store<{ message: MessageStore[] } | null>(null);

export const setMessageStore = (newMessage: MessageStore) => {
    messageStore.setState((state) => ({
        message: [...(state?.message || []), newMessage]
    }));
};

export const setAllMessageStore = (newMessages: MessageStore[]) => {
    messageStore.setState({ message: newMessages });
};

export const clearMessageStore = () => {
    messageStore.setState(null);
};

// REAL-TIME: Function untuk update read status
export const markReadMessages = (readerId: string, roomId: string, updatedMessages?: MessageStore[]) => {
    messageStore.setState((state) => {
        if (!state?.message) {
            // Jika ada updatedMessages dari backend, gunakan itu
            if (updatedMessages && updatedMessages.length > 0) {
                return { message: updatedMessages };
            }
            return state;
        }

        // REAL-TIME: Prioritaskan data dari backend
        if (updatedMessages && updatedMessages.length > 0) {
            console.log('🔄 REAL-TIME: Using backend updated messages');
            return { message: updatedMessages };
        }

        // Fallback: update manual
        const updatedMessagesManual = state.message.map((msg) => {
            if (msg.chat_room_id === roomId) {
                return {
                    ...msg, //buat object baru atau timpa object lama
                    statuses: msg.statuses.map((status) =>
                        status.user_id === readerId && status.status !== 'READ'
                            ? { ...status, status: 'READ' as const }
                            : status
                    )
                };
            }
            return msg;
        });

        console.log('🔄 Manual read status update for room:', roomId);
        return {
            message: updatedMessagesManual
        };
    });
};