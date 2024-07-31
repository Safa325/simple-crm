import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALd4BMdiNtlN6vMfHdpStTay5C5hnUZmc",
  authDomain: "simplecrm-bb82b.firebaseapp.com",
  projectId: "simplecrm-bb82b",
  storageBucket: "simplecrm-bb82b.appspot.com",
  messagingSenderId: "172241030447",
  appId: "1:172241030447:web:4bc97967372939187ee5da",
  measurementId: "G-GTZPKDS8B3"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
      provideFirebaseApp(() => initializeApp(firebaseConfig)), 
      provideFirestore(() => getFirestore()), 
      provideDatabase(() => getDatabase()
      )]
};
