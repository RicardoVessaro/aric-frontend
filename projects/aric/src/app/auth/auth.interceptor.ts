import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    
    const member = JSON.parse(localStorage.getItem('member') as string);

    if(!member) {
        return next(req);
    }

    const authenticatedReq = req.clone({
        headers: new HttpHeaders({'Authorization': 'Bearer ' + member._token})
    });

    return next(authenticatedReq);
}