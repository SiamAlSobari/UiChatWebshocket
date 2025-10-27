import { authService } from '../services/authService';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	try {
		const authSession = await authService.startSession();
		console.log('Loaded auth session in layout:', authSession);
		return {
			authSession
		};
	} catch (err) {
		return {
			authSession: null
		};
	}
};
