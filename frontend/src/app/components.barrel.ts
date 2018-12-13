import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import { MainComponentComponent, DisplayNotificationComponent, ContentLoaderComponent } from './components';

import { NotificationService } from './services/notification.service';
import { MainService } from './services/main.service';

export const __IMPORTS = [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
];

export const __DECLARATIONS = [MainComponentComponent, DisplayNotificationComponent, ContentLoaderComponent];

export const __PROVIDERS = [NotificationService, MainService];