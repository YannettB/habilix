import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth) { }

  async loginWithEmail(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.isLoggedIn = true;
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Registro de un nuevo usuario
  async register(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.isLoggedIn = false;
      // El usuario se ha registrado con éxito
    } catch (error) {
      // Manejo de errores
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  // Cerrar sesión del usuario
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.isLoggedIn = false;
      // El usuario ha cerrado sesión con éxito
    } catch (error) {
      // Manejo de errores
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isLoggedInUser(): boolean {
    // Verificar si el usuario tiene una sesión activa
    return this.isLoggedIn;
  }
  
}
