import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn: boolean = false;
  private usuarioActualSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private afAuth: AngularFireAuth) { }

  // Login
  async loginWithEmail(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.isLoggedIn = true;
      const nombreUsuario = email;
      this.usuarioActualSubject.next(nombreUsuario);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Registro de un nuevo usuario
  async register(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      // El usuario se ha registrado con éxito
      this.isLoggedIn = false;
    } catch (error) {
      // Manejo de errores
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
    this.usuarioActualSubject.next("");  
  }

  // Cerrar sesión del usuario
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      // El usuario ha cerrado sesión con éxito
      this.isLoggedIn = false;
    } catch (error) {
      // Manejo de errores
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
    this.usuarioActualSubject.next("");
    }

  isLoggedInUser(): boolean {
    // Verificar si el usuario tiene una sesión activa
    return this.isLoggedIn;
  }

  getNombreUsuario(): Observable<string>  {
    return this.usuarioActualSubject.asObservable();
  }
  
}
