import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log('Request on its way');
        console.log(req.url);
        const modifiedreq = req.clone({headers:req.headers.append('Auth','xyz')});
        return next.handle(modifiedreq).pipe(
            tap(event=>{
                console.log(event);
                if(event.type === HttpEventType.Response)
                {
                    console.log('response arrived, body data is');
                    console.log(event.body);
                }
            })
        );
    }
}