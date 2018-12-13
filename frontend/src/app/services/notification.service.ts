import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {

    private notificationSource = new Subject<any>();

    public notificationData$ = this.notificationSource.asObservable();

    displayNotification(notificationData: any) {
        this.notificationSource.next(notificationData);
    }
}