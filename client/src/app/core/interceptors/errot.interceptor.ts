import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationMessage, NotificationType } from "@core/messages/notification.message";
import { NotificationService } from "@core/services/notification.service";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifications: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req)
      .pipe(catchError(_ => {
        const noti: NotificationMessage = {
          message: _.error.detail ?? 'Something went wrong. Please try again later.',
          type: NotificationType.error
        }
        this.notifications.sendMessage(noti);
        return of(_);
      }));
  }
}
