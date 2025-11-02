// ... di dalam script tag
// Pastikan status ini sesuai dengan yang ada di database Anda
type MessageStatus = 'SENT' | 'DELIVERED' | 'READ' | 'UNKNOWN';

// Fungsi untuk mendapatkan status ikon dari array statuses
export function getDisplayStatus(chat: { statuses?: { status: MessageStatus }[] }): MessageStatus {
    if (chat.statuses && chat.statuses.length > 0) {
        const statusArray = chat.statuses.map(s => s.status);
        
        if (statusArray.includes('READ')) {
            return 'READ';
        }
        if (statusArray.includes('DELIVERED')) {
            return 'DELIVERED';
        }
        if (statusArray.includes('SENT')) {
            return 'SENT';
        }
    }
    return 'UNKNOWN'; 
}

export function getStatusIcon(status: MessageStatus): string {
    switch (status) {
        case 'READ':
            return '✅✅'; 
        case 'DELIVERED':
            return '✅✅'; 
        case 'SENT':
            return '✅'; 
        case 'UNKNOWN':
        default:
            return '⏳'; 
    }
}