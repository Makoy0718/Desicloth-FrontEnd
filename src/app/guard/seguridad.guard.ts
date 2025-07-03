import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const seguridadGuard= (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService=inject(LoginService)
  const router=inject(Router)

  const isLoggedIn = lService.verificar();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  // Validar rol si la ruta lo especifica

  //Aqui sacara el rol de lo que diga data: { roles: [''] } en las rutas de routes
  const requiredRoles = route.data['roles'] as string[] | undefined;

  //Aqui comparara si el rol requrido coincide con el rol del usuario
  if (requiredRoles) {
    const userRole = lService.showRole();
    if (!userRole || !requiredRoles.includes(userRole)) {
      router.navigate(['/rutadisenos']);
      return false;
    }
  }

  return true;
};
