import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { NotificationService } from './../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-notification',
  templateUrl: './display-notification.component.html',
  styleUrls: ['./display-notification.component.css'],
  animations: [
    trigger('msgState', [
      state('inactive', style({ transform: 'translateX(100%)' })),
      state('active', style({ transform: 'translateX(-100%)' })),
      transition('* => active', animate(200)),
      transition('active => inactive', animate(300))
    ])
  ]
})
export class DisplayNotificationComponent {

  public fms = [];

  public fmSubscription: Subscription;

  constructor(notifSvc: NotificationService) {

    this.fmSubscription = notifSvc.notificationData$.subscribe(fmData => {
      this.pushFlashMsg(fmData);
    })
  }


  /**
   * Push Flash messages
   * 
   * @param fmData object
   */
  private pushFlashMsg(fmData) {

    let fm = {};

    Object.assign(fm, fmData);

    fm['msgType'] = (fm['msgType'] ? fm['msgType'] : 'success');
    fm['timeout'] = (fm['timeout'] ? fm['timeout'] : 5000);
    fm['state'] = 'active';

    // assign a timestap to make it unique so we can remove it when timeout meets.
    fm['timestamp'] = 1000;
    const timestamp = fm['timestamp'] = +(Number(fm['timeout']) + Number(new Date()));

    // Push fm item at 0 index.
    this.fms.unshift(fm);

    setTimeout(() => {
      for (let counter = 0; counter < this.fms.length; counter++) {
        if (this.fms[counter]['timestamp'] === timestamp) {
          this.closeMe(counter);
        }
      }

    }, fm['timeout']);
  }

  /**
   * Close flash message
   * 
   * @param index number
   */
  closeMe(index) {

    this.fms[index]['state'] = 'inactive';

    setTimeout(() => {
      this.fms.splice(index, 1);
    }, 350);

  }

  /** 
   * Destroy the world :D
   * 
  */
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.fmSubscription.unsubscribe();
  }

}
