import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { loggingInterceptor } from '@shared/intercerptors/logging.interceptor';
import { authInterceptor } from '@auth/interceptors/auth.intercerptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        //loggingInterceptor,
        authInterceptor,
      ])
    ),
  ],
};
