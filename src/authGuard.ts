import authService from '@/services/authService';

export default async (to: any, from: any, next: any) => {
    try {
        const token = await authService.getToken(); // Get token asynchronously
        const isAuthenticated = !!token;

        if (isAuthenticated) {
            // Ensure auth header is set with the token
            await authService.setAuthHeader(token);
            return next();
        } else {
            return next('/login');
        }
    } catch (error) {
        console.error('Error in auth guard:', error);
        return next('/login');
    }
};
