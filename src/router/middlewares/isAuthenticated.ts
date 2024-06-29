import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/stores/useAuth';

export async function isAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  try {
    const { verifyToken } = useAuth();
    const isValid: boolean = await verifyToken();

    if (isValid) next();
    else next('/');
  } catch {
    next('/');
  }
}
