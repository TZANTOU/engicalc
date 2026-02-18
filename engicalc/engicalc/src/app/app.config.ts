import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay()),
    importProvidersFrom(FormsModule)
  ]
};
