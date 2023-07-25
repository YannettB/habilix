import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Si usas Firestore
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}
// Inicializar Firebase
const app = initializeApp(environment.firebaseConfig);

// Obtener referencia a Firestore si lo estás utilizando
const firestore = getFirestore(app);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
