import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter (routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })), //al cambiar de página el scroll suba automáticamente arriba de todo
    provideHttpClient(), // Habilito httpclient para toda la app
  ]
};
