import { authService } from '../services/authService';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	try {
		const authSession = await authService.startSession();
		console.log('Layout load auth session:', authSession);
		return {
			authSession
		};
	} catch (err) {
		console.error('❌ Gagal mengambil session:', err);
		return {
			authSession: null
		};
	}
};
