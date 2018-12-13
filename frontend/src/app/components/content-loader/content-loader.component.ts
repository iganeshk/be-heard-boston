import { Component } from '@angular/core';
/**
 * Overlay Component
 *
 * How to use?
 *
 * <global-shared-content-loader *ngIf="!loaded"> </global-shared-content-loader>
 */
@Component({
  selector: 'app-content-loader',
  templateUrl: './content-loader.component.html',
  styleUrls: ['./content-loader.component.css']
})
export class ContentLoaderComponent {
  constructor() { }
}
