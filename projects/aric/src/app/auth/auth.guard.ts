import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    // TODO refector member to use an util
    const member = JSON.parse(localStorage.getItem('member') as string);

    const isAuth = !!member && !!member._token;

    console.log('route', route);
    console.log('state', state);

    const isAuthRoute = state.url === '/signin' || state.url === '/signup';

    if(!isAuth && isAuthRoute) {
        return true;
    }

    if(isAuth) {
        if(isAuthRoute) {
            return redirectTo('/profile');
        }

        return true;
    }

    return redirectTo('/signin');
}

const redirectTo = (url: string) => {
    const router = inject(Router);

    return router.parseUrl(url);
}