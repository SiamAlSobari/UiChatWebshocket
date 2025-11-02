// Helper functions
type MessageStatus = 'SENT' | 'DELIVERED' | 'READ' | 'UNKNOWN';

export function getDisplayStatus(chat: { statuses?: { status: MessageStatus; user_id: string }[] }, currentUserId?: string): MessageStatus {
    if (!chat.statuses || chat.statuses.length === 0) return 'UNKNOWN';
    
    // Cari status untuk current user
    if (currentUserId) {
        const userStatus = chat.statuses.find(s => s.user_id === currentUserId);
        if (userStatus) return userStatus.status;
    }
    
    // Fallback: ambil status terbaik dari semua users
    const statusArray = chat.statuses.map(s => s.status);
    if (statusArray.includes('READ')) return 'READ';
    if (statusArray.includes('DELIVERED')) return 'DELIVERED';
    if (statusArray.includes('SENT')) return 'SENT';
    
    return 'UNKNOWN';
}

export function getStatusIcon(status: MessageStatus): string {
    switch (status) {
        case 'READ':
            return '✅✅🙏';
        case 'DELIVERED':
            return '✅✅';
        case 'SENT':
            return '✅';
        case 'UNKNOWN':
        default:
            return '⏳';
    }
}